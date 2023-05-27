import crypto from 'crypto';
import bcrypt from 'bcrypt'
import { v4 } from 'uuid';
import Encrypt from '../Utils/bcrypt.encrypt';
import { RegisterInterface, UserId } from '../type';
import IUser, { ICreateTokenUser, ILoginRequest, ILoginResponse } from '../Interfaces/user.type';
import AuthRepository from '../Repositories/auth.repository';
import {
    BadRequestError, 
    NotFoundError, 
    UnAuthenticatedError
} from "../Utils/ErrorUtils";
import { createTokenUser } from '../Utils/Middleware/createToken.user';
import { TokenRepository } from '../Repositories/token.repository';
import sendResetPasswordEmail from '../Utils/Utilities/resetPasswordEmail';
import hashString from '../Utils/Utilities/createHash';
import { sendResetPasswordMail, sendVerificationMail } from '../Utils/Utilities/nodeEmaillogic';

export default class AuthService {
    private authRepository= new AuthRepository();
    private tokenRepository = new TokenRepository()
    private encrypt = new Encrypt()

  public async register(payload: RegisterInterface): Promise<IUser> {
    const existingUser = await this.authRepository.findByEmail(payload.email);
    if (existingUser && !existingUser.deleted) {
      throw new BadRequestError(`Email ${payload.email} already in use`);
    }
    if (existingUser && existingUser.deleted) {
      await this.authRepository.userExits(existingUser.id);
    }
    const verificationToken =  crypto.randomBytes(40).toString('hex');
    const hashedPassword = await this.encrypt.bcrypt(payload.password);
    const user = await this.authRepository.create({
      email: payload.email,
      password: hashedPassword,
      user_name: payload.user_name,
      phone_number: payload.phone_number,
      country: payload.country,
      verificationToken: verificationToken,
    });
    const origin = 'http://localhost:3000';
    await sendVerificationMail({
      name : user.user_name, 
      email : user.email, 
      verificationToken : user.verificationToken, 
      origin})
    return user;
  }

  public async verifyEmail(verificationToken: string, email: string) : Promise<void> {
    const user = await this.authRepository.findByEmail(email);
    if(!user){
      throw new UnAuthenticatedError(`Verification Failed for user with ${email}`);
    }
    if (user.verificationToken !== verificationToken){
      throw new UnAuthenticatedError("Verification Failed");
    }
    user.verified = new Date;
    user.isVerified = true;
    user.verificationToken = '';
    await this.authRepository.saveUser(user.isVerified, user.verified, user.email);
    
  }
  
   public async login(loginRequest : ILoginRequest ): Promise<ILoginResponse> {
        const {email, password, ip, userAgent} = loginRequest;
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
          throw new BadRequestError('Invalid email or password');
        }
        const checkPassword = await this.encrypt.compare(password, user.password);
        if (!checkPassword) {
          throw new BadRequestError(`Incorrect ${user.password} password`);
        }
        if(!user.isVerified){
          throw new UnAuthenticatedError('Please verify your email before logging in')
        }
        const tokenUser = createTokenUser(user);
        let refresh_token= '';
        const existingToken = await this.tokenRepository.findToken(user.id);

  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) {
      throw new UnAuthenticatedError('Invalid Credentials');
    }

    refresh_token = existingToken.refresh_token;

    return { id: user.id, tokenUser, refresh_token };
  }

  refresh_token = crypto.randomBytes(40).toString('hex');
  const userToken = {
    refresh_token,
    ip,
    userAgent,
    isValid: true,
    userId: user.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  await this.tokenRepository.create(userToken);

  return { id: user.id,  tokenUser, refresh_token };
      }

  public async forgotPassword(email: string): Promise<void>{
  if (!email) {
    throw new BadRequestError('Please provide valid email');
  }
    const user = await this.authRepository.findByEmail(email);
    if(user){
      const passwordToken = crypto.randomBytes(70).toString('hex');
    const origin = 'http://localhost:3000';
    await sendResetPasswordMail({
      name: user.user_name,
      email: user.email,
      token: passwordToken,
      origin,
    });
    const tenMInutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMInutes);
    user.passwordToken = hashString(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await this.authRepository.updateUser(user)
    }
  }
  public async resetPasswordService (email: string,
    token: string,
    password: string) : Promise<void> {
      const user = await this.authRepository.findByEmail(email);
    
      if (!user) {
        throw new BadRequestError('User not available');
      }
    
      const currentDate = new Date();
    
      if (
        user.passwordToken === hashString(token) &&
        user.passwordTokenExpirationDate != null &&
        user.passwordTokenExpirationDate > currentDate
      ) {
        user.password = await bcrypt.hash(password, 10);
        user.passwordToken = null;
        user.passwordTokenExpirationDate = null;
        await this.authRepository.updateUser(user);
      }
    }


  public async logout(userId: number): Promise<void> {
        await this.tokenRepository.invalidateTokens(userId);
      }
}

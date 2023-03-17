import bcrypt from 'bcrypt';

import bcryptEncrypt from '../Utils/bcrypt.encrypt';

import IUser from '../Interfaces/user.type';
import AuthRepository from '../Repositories/auth.repository';
import {
    BadRequestError, 
    NotFoundError, 
    UnAuthenticatedError
} from "../Utils/ErrorUtils";

export default class AuthService {
    private authRepository= new AuthRepository()

  public async register(email:string, password: string, user_name: string, phone_number:number, country:string): Promise<IUser> {

    const userExist= await this.authRepository.findByEmail(email)
    if (userExist){
        throw new BadRequestError('user alredy exist')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.authRepository.create({
            email,
            password : hashedPassword,
            user_name, 
            phone_number,
            country
        })

        return user;
    }

    async login(email: string, password: string): Promise<string> {
        const user = await this.authRepository.login(email, password);
        if (!user) {
          throw new BadRequestError('Invalid email or password');
        }
        const checkPassword = await bcryptEncrypt.compare(password, user.password);
        if (!checkPassword) {
          throw new Error('Incorrect password');
        }
        const token = await bcryptEncrypt.generateAccessToken([user]);
        return token;
      }
     
      

  


  public async getUser( id: number): Promise<IUser> {

        const user = await this.authRepository.getUserById(id) 
        if (!user) {
            throw new Error('User not found');
          }
          return user;
    }
}

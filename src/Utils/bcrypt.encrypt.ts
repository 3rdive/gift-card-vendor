// encrypt.ts
import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config';
import IUser from '../Interfaces/user.type';
import crypto from'crypto';

export default class Encrypt {
  private pepper = config.BCRYPT_PASSWORD;
  private saltRound = config.SALT_ROUNDS;
  private secret = config.SECRET;

  public bcrypt = async (str: string): Promise<string> => {
    return bcrypt.hash(str + this.pepper, this.saltRound);
  };

  public compare = async (
    compare: string,
    against: string
  ): Promise<boolean> => {
    return bcrypt.compare(compare + this.pepper, against);
  };


  public generateAccessToken = async (payload: IUser): Promise<string> => {
    const data = {
      user_id: payload.id,
      email: payload.email,
    };
    const token =  jwt.sign(data, this.secret, { expiresIn: '7d' });
    return token;
  };

  public generateRefreshToken = async (payload: IUser): Promise<string> => {
    const refreshToken = crypto.randomBytes(40).toString("hex");
    const data = {
      user_id: payload.id,
      email: payload.email,
      refreshToken
    };
    const token = jwt.sign(data, this.secret, { expiresIn: '1d' });
    return token;
  };

  public istokenValid = (token: string): { user: IUser[], refreshToken: string } => {
    const decoded = jwt.verify(token, this.secret) as { user: IUser[], refreshToken: string };
    return { user: Array.isArray(decoded.user) ? decoded.user : [decoded.user], refreshToken: decoded.refreshToken };
  };
  
  
  public attachCookiesResponse = ({res, user, refreshToken}: {res: Response, user: IUser[], refreshToken?: string}) =>{
    const token = this.generateAccessToken(user[0]);
    res.cookie('accessToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 2000),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
  })

  if (refreshToken) {
      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 24 * 60 * 1000), // 60 days
          secure: process.env.NODE_ENV === 'production',
          signed: true,
      });
  }
}

}

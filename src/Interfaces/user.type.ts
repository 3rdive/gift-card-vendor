import User from "../Models/user.model";
import { UserObject } from "./jwt.dao";


export default interface IUser{
    id: number;    //comment out the id
    user_name: string;
    email: string;
    password : string;
    phone_number: number;
    country: string;
    verificationToken : string;
    isVerified: boolean;
    verified: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserUpdate extends Partial<User> {
  refresh_token: string;
}

export interface ICreateTokenUser {
    user_name: string;
    userId: number;
  }
export interface ILoginResponse {
  id: number;
  // email: string;
  tokenUser: UserObject;
  refresh_token: string;
}

export interface ILoginRequest {
  email: string;
  password: string
  ip: string;
  userAgent: string;
}





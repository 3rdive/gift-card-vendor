import { Request} from "express";
import IUser from "./user.type";
import User from "../Models/user.model";
import Token from "../Models/token.model";
import { IToken } from "./token.interface";

// export interface AuthenticatedUser {
//   user: IUser;
//   id: number;
//   email: string;
//   token: string
// }

export interface AuthenticatedUser {
    req: IUser;
    user : {
      id:number,
      email: string
    };
    token : IToken;
    signedCookies: {
        [key: string]: string;
      };
}

declare global {
  namespace Express {
    interface Request extends AuthenticatedUser{}
  }
}
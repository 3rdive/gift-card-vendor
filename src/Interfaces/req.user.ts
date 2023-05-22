import IUser from "./user.type";
import { IToken } from "./token.interface";

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
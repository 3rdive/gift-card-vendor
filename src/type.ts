import { MaybeCompositeId } from "objection";
import IUser from "./Interfaces/user.type";

type PartialUser = Partial<Omit<IUser, 'id'>> ;
type UserId = number & MaybeCompositeId;
type  RegisterInterface = {
    email:string, 
    password: string,
     user_name: string,
     phone_number:number, 
    country:string,
    verificationToken : string,
    // isVerified: boolean,
    // verified: Date;
    }
export {PartialUser, UserId, RegisterInterface};
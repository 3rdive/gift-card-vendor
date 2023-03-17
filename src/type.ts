import { MaybeCompositeId } from "objection";
import IUser from "./Interfaces/user.type";

type PartialUser = Partial<Omit<IUser, 'id'>> ;
type UserId = number & MaybeCompositeId;
export {PartialUser, UserId};
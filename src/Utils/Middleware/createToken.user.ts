import { UserObject } from "../../Interfaces/jwt.dao";
const createTokenUser = (user: UserObject): UserObject => {
    return { user_name: user.user_name, id: user.id };
  };
  
  export {createTokenUser };
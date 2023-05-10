import IUser from '../Interfaces/user.type';
import User from '../Models/user.model';
import {PartialUser, UserId }from '../type';

export default class AuthRepository {

   async findByEmail(email: string): Promise<User | null | undefined> {
    return  User.query().findOne({ email });
   }

   async saveUser(isVerified : boolean, verified: Date, email : string) : Promise<void> {
    await User.query().patch({isVerified, verified, verificationToken: ""}).where({email});
  
   }
   async create(user: PartialUser): Promise<IUser>{
        return User.query().insert(user);
    }
    async updateUser(user: User): Promise<User> {
      if (user.id) {
        return await User.query().updateAndFetchById(user.id, user);
      } else {
        return await User.query().insert(user);
      }
    }
    async getUserById(id: UserId){
        return User.query().findById(id);
      }
      async userExits(id: UserId){
        return User.query().where({ id }).delete();
      }
    }
    
    
import IUser from '../Interfaces/user.type';
import User from '../Models/user.model';
import {PartialUser, UserId }from '../type';
import { Encrypt } from '../Utils/bcrypt.encrypt';
export default class AuthRepository {

   async findByEmail(email: string): Promise<User | null | undefined> {
    return  User.query().findOne({ email });
   }

    async create(user: PartialUser): Promise<IUser>{
        return User.query().insert(user);
    }

    async login(email: string, password: string): Promise<User | undefined> {
      const user: any = await User.query().where('email', email);
        const checkPassword = await new Encrypt().compare(
            password,
            user[0].password
        );

        
        if (!checkPassword) {
            return undefined;
        }
        return user;
    }
    
    async getUserById(id: UserId){
        return User.query().findById(id);
      }
    }
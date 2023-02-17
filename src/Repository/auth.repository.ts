import {User,  UserType} from '../Models/user.model';
import { Encrypt } from '../Utils/bcrypt.encrypt';




export default class AuthRepository {
    async createUser(user: UserType) {
        const newUser = await User.query().insert({
            userName: user.user_name,
            email: user.email,
            password : user.password,
            phoneNumber : user.phone_number,
            country: user.country
        })
        return newUser;
    }


    async login(email: string, password: string): Promise<UserType[] | undefined> {
        const user: any = await User.query().where('email', email);
        const checkPassword = await new Encrypt().compare(
            password,
            user[0].password_digest
        );

        
        if (!checkPassword) {
            return undefined;
        }
        return user;
    }
}
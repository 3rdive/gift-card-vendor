import User from "../../Models/user.model";
import IUser from "../../Interfaces/user.type";

export default class Validation {
    static where(arg0: string, email: any) {
        throw new Error("Method not implemented.");
    }
    where = async (column: string, value: string): Promise<IUser | undefined> => {
        const user: any = await User.query().where(column, value);
        if (user.length > 0) {
            return user[0];
        }
        return undefined;
    };
    whereAnd = async (column: string, value: string, column2: string, value2: string): Promise<IUser | undefined> => {
        const user: any = await User.query().where(
            column, value
        ).andWhere(column2, value2);
        if (user.length > 0) {
            return user[0];
        }
        return undefined;
    };

    isVerified = async (email: string): Promise<boolean | undefined> => {
        const user: any = await User.query().where('email', email);
        if (user.is_verified) {
            return true;
        }
        return false;
    };
}
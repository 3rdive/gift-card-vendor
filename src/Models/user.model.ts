import {Model} from 'objection';

export default class User extends Model {
    static tableName = 'users';
    id!: number;
    user_name!: string;
    email!: string;
    password! : string;
    phone_number!: number;
    country!: string;
    verificationToken! : string;
    isVerified!: boolean ;
    verified!: Date;
    token! : string;
    passwordToken?: string | null;
    passwordTokenExpirationDate?: Date | null;
    createdAt!: Date;
    updatedAt!: Date;
    deleted: User | null | undefined;
  }

  
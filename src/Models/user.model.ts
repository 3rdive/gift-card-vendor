import {Model} from 'objection';

export default class User extends Model {
    static tableName = 'users';
    id!: number;
    user_name!: string;
    email!: string;
    password! : string;
    phone_number!: string;
    country!: string;
  }
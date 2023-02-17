import {Model} from 'objection';
import { Country } from '../Types/country';


export interface UserType {
  id: number;
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
  country: Country;
}
export class User extends Model{
  static get tableName() {
    return 'users';
}  
  }
import {Model} from 'objection';
import User from './user.model';

export default class Token extends Model {
    static tableName = 'token';
    id!: number;
    refresh_token!: string;
    ip!: string;
    userAgent!: string;
    isValid!: boolean;
    userId!: number;
    created_at!: string;
    updated_at!: string;
  
    static get relationMappings() {
      const User = require('./user.model');
      return {
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'token.userId',
            to: 'users.id'
          }
        }
      }
    }
  }
  

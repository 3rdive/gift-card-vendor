import {Model} from 'objection';

export default class TransactionRef extends Model {
    static tableName = 'transactions';
    id!: number;
    user_id!: number;
    code!: number
    created_at!: string;
    updated_at!: string;
  
    static get relationMappings() {
      const User = require('./user.model');
      return {
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'transactions.user_id',
            to: 'users.id'
          }
        }
      }
    }
  }

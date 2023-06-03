import {Model} from 'objection';
import Giftcards from './giftcards';

export default class Purchase extends Model {
    static tableName = 'transactions';
    id!: number;
    user_id!: number;
    giftcard_id!: number;
    amount!: number;
    created_at!: string;
  
    static get relationMappings() {
      const User = require('./user.model');
      return {
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'purchases.user_id',
            to: 'users.id',
          },
        },
        giftcard: {
          relation: Model.BelongsToOneRelation,
          modelClass: Giftcards,
          join: {
            from: 'purchases.giftcard_id',
            to: 'giftcards.id',
          },
        },
    }
  }
}
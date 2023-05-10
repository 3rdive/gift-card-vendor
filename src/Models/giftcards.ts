import {Model} from 'objection';
import User from './user.model';
import TransactionRef from './transactionRef';



export default class Giftcards extends Model {
    static tableName = 'giftcards';
    id!: number;
    Transaction_code!: number;
    type! : string;
    code!: string;
    rate!: number;
    unit!: number;
    is_redeemed!: boolean;
    total_amount!: number;
    expiration_date!: Date
    image!: string;
    transaction_feedback!: string;
    created_at!: string;
    updated_at!: string;
  
    static get relationMappings() {
        return {
          code: {
            relation: Model.BelongsToOneRelation,
            modelClass: TransactionRef,
            join: {
              from: 'giftcards.Transaction_code',
              to: 'transactions.code'
            }
          },
          user: {
            relation: Model.BelongsToOneRelation,
            modelClass: TransactionRef,
            join: {
              from: 'giftcards.userId',
              to: 'users.id'
            }
          },
        };
      }
    }
  
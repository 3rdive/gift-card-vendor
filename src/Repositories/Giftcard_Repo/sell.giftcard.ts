import Giftcards from '../../Models/giftcards';
import { GiftcardsInterface } from '../../Interfaces/gift.card';

export default class GiftCardRepository {

   async create(giftcards: GiftcardsInterface): Promise<Giftcards>{
        return Giftcards.query().insert(giftcards);
    }
    async findByCode (code : string): Promise<Giftcards | undefined>{
        return Giftcards.query().where({code}).first()
    }
    async update(giftcard: Giftcards):Promise<Giftcards>{
        return Giftcards.query().updateAndFetchById(giftcard.id,giftcard )
    }
    async sell (giftcard: Giftcards, amount: number): Promise<Giftcards>{
        giftcard.is_redeemed = true;
        giftcard.total_amount = amount;
        return this.update(giftcard)
    }
    async findByUserId(userId: number): Promise<Giftcards| undefined> {
        return Giftcards.query().where("user_id", userId).first();
    } 
}
    
    
    
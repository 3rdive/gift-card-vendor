import { giftcardType } from "../../Interfaces/gift.card";
import Giftcards from "../../Models/giftcards";
import { BadRequestError } from "../ErrorUtils";

const generateTransactionCode = async (type: keyof giftcardType): Promise<string> => {
    let length: number;
    if(type === 'walmart'){
      length = 10;
    }else if(type === 'itunes'){
      length = 8;
    }else if(type === 'google_play'){
      length = 11
    }else{
      throw new BadRequestError('Invalid gift card type')
    }
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    let isUnique = false;
    while (!isUnique) {
      for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      const transaction = await Giftcards.query().where({ code }).first();
      isUnique = !transaction || transaction.expiration_date < new Date();
    }
    return code;
  };


  export default generateTransactionCode;
  
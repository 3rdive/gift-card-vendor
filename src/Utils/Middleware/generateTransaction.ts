import Giftcards from "../../Models/giftcards";
import { BadRequestError } from "../ErrorUtils";

const generateTransactionCode = async (giftcardType: string): Promise<string> => {
    let length: number;
    if(giftcardType === 'Walmart'){
      length = 10;
    }else if(giftcardType === 'Itunes'){
      length = 8;
    }else if(giftcardType === 'Google Play'){
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
  
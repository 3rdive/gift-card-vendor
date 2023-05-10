import { GiftcardsInterface } from "../Interfaces/gift.card";
import { giftcardType } from "../Interfaces/gift.card";
import { giftCardDataType } from "../Utils/Middleware/giftCard.data";
import GiftCardRepository from "../Repositories/Giftcard_Repo/sell.giftcard";
import { BadRequestError } from "../Utils/ErrorUtils";
import generateTransactionCode from "../Utils/Middleware/generateTransaction";
import Giftcards from "../Models/giftcards";
import { TransactionCodeRepository } from "../Repositories/transaction.repository";
import { sendGiftcardMail } from "../Utils/Utilities/nodeEmaillogic";
import AuthRepository from "../Repositories/auth.repository";
import PurchaseRepository from "../Repositories/Giftcard_Repo/purchase.repo";

export default class giftcardService {
    private giftcardRepository = new GiftCardRepository();
    private transactionRepository = new TransactionCodeRepository();
    private authRepository= new AuthRepository();
    private purchaseRepository = new PurchaseRepository

    public async create(type:giftcardType, trasaction_ref:number,image:string,transaction_feedback: string, email: string): Promise<GiftcardsInterface>{
      if(!email){
        throw new BadRequestError('Please provide a valid email')
    }
    const user = await this.authRepository.findByEmail(email);
    if(!user){
        throw new BadRequestError('User does not exist')
    }
       const {rate, unit}= giftCardDataType(type);
       const expirationDate = new Date(Date.now() + 86400000);
       expirationDate.setMonth(expirationDate.getMonth() + 1);
       if (expirationDate.getMonth() === 0) { 
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }
       const code = await generateTransactionCode(type);
       const transactionRef = await this.transactionRepository.findByUserId(trasaction_ref)
       if (!transactionRef) {
        throw new BadRequestError("Invalid transaction reference");
      }
       const giftcard: GiftcardsInterface = {
         Transaction_code: transactionRef.code,
         type,
         code,
         rate,
         unit,
         is_redeemed: false,
         total_amount: unit * rate,
         expiration_date: expirationDate,
         image: image,
         transaction_feedback: transaction_feedback,
       };
       await sendGiftcardMail({
        name : user.user_name, 
        email : user.email, 
        code: giftcard.code, 
        expirationDate: giftcard.expiration_date
        })
       const createdGiftcard = await this.giftcardRepository.create(giftcard);
       return createdGiftcard;
}

public async redeemCode(code: string, email: string, type:giftcardType ): Promise<boolean>{
  if (!code || !email) {
      throw new BadRequestError("Please provide a valid email and code");
    }

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("User does not exist");
    }

    const giftCard = await this.giftcardRepository.findByUserId(user.id);

    if (!giftCard || giftCard.code !== code) {
      return false;
    }
    if (giftCard.expiration_date < new Date()) {
      throw new BadRequestError("Gift card has already expired");
    }
  
    if (giftCard.is_redeemed) {
      return false;
    }
  
    giftCard.is_redeemed = true;
    await this.giftcardRepository.update(giftCard);

    // Check if user has purchased a certain amount with the gift card
    const totalPurchased = await this.purchaseRepository.getTotalPurchasedByUser(user.id);
    if (totalPurchased >= 1000) {
      // Generate a new gift card code and create a new gift card for the user
      const {rate, unit}= giftCardDataType(type);
      const expirationDate = new Date(Date.now() + 86400000);
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      if (expirationDate.getMonth() === 0) { 
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }
      const newCode = await generateTransactionCode(giftCard.type);
      const newGiftcard: GiftcardsInterface = {
        Transaction_code: giftCard.Transaction_code,
        type: giftCard.type,
        code: newCode,
        rate,
        unit,
        is_redeemed: false,
        total_amount: 0, // Set initial balance to 0
        expiration_date: expirationDate,
        image: giftCard.image,
        transaction_feedback: giftCard.transaction_feedback,
      };
      await this.giftcardRepository.create(newGiftcard);
    }

    return true;
}

public async buyGiftcard(code: string): Promise<Giftcards> {
  const giftcard = await this.giftcardRepository.findByCode(code);
  if (!giftcard) {
    throw new BadRequestError("Gift card not found or expired");
  }
  if (giftcard.is_redeemed === true) {
    throw new BadRequestError("Gift card has already been redeemed");
  }

  const amount = Math.floor(Math.random() * (100 - 10 + 1) + 10);
  
  if (giftcard.total_amount < amount) {
    throw new BadRequestError("Insufficient balance on the gift card");
  }
  giftcard.total_amount -= amount;
  
  // Set is_redeemed flag to true
  giftcard.is_redeemed = true;
  
  return this.giftcardRepository.update(giftcard);
}


public async sellGiftcard(code: string): Promise<Giftcards> {
  const giftcard = await this.giftcardRepository.findByCode(code);
  if (!giftcard) {
    throw new BadRequestError("Gift card not found or expired");
  }
  if (giftcard.is_redeemed === true) {
    throw new BadRequestError("Gift card has already been redeemed");
  }
  const amount = Math.floor(Math.random() * (100 - 5 + 1) + 30);
  giftcard.total_amount += amount;
  giftcard.is_redeemed = true;
  return this.giftcardRepository.update(giftcard);
}
public async calculateGiftcardValue(code: string): Promise<number> {
  const giftcard = await this.giftcardRepository.findByCode(code);
  if (!giftcard  || giftcard.expiration_date < new Date()) {
    throw new BadRequestError("Gift card not found or expired");
  }
  if (giftcard.is_redeemed) {
    throw new BadRequestError("Gift card has already been redeemed");
  }
  return giftcard.total_amount;
}
}
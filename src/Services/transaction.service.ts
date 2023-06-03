import TransactionRef from "../Models/transactionRef";
import AuthRepository from "../Repositories/auth.repository";
import { TransactionCodeRepository } from "../Repositories/transaction.repository";
import { BadRequestError } from "../Utils/ErrorUtils";
import { sendTransactionMail } from "../Utils/Utilities/nodeEmaillogic";

export default class TransactionService {
  private transactionCodeRepository = new TransactionCodeRepository();
  private authRepository= new AuthRepository();

  public async create( email : string): Promise<TransactionRef> {
    if(!email){
        throw new BadRequestError('Please provide a valid email')
    }
    const validUser = await this.authRepository.findByEmail(email);
    if(!validUser){
        throw new BadRequestError('User does not exist')
    }
    const code = Math.floor(1000 + Math.random() * 9000);
    const transaction = await this.transactionCodeRepository.create({
        code,
    user_id: validUser.id});
    await sendTransactionMail({
        name : validUser.user_name, 
        email : validUser.email, 
        code: transaction.code, 
        })
    return transaction;
  }
  public async verifyCode(code: number, email: string ): Promise<boolean>{
    if (!code || !email) {
        throw new BadRequestError("Please provide a valid email and code");
      }
  
      const user = await this.authRepository.findByEmail(email);
  
      if (!user) {
        throw new BadRequestError("User does not exist");
      }
  
      const transaction = await this.transactionCodeRepository.findByUserId(user.id);
  
      if (!transaction || transaction.code !== code) {
        return false;
      }
  
      return true;
    }
}

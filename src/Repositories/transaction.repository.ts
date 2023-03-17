import Transaction from '../Models/transactionCode.model';
import generateTransactionCode from '../Utils/Middleware/generateTransaction';

export default class TransactionRepository {
  public async create(userId: number): Promise<Transaction> {
    const transaction = await Transaction.query().insert({
      code: generateTransactionCode,
      user_id: userId,
    });
    return transaction;
  }

}

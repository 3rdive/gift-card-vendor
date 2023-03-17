import TransactionRepository from '../Repositories/transaction.repository';
import Transaction from '../Models/transactionCode.model';

export default class TransactionService {
  private transactionRepository = new TransactionRepository();

  public async create(giftCardId: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.create(giftCardId);
    return transaction;
  }
}

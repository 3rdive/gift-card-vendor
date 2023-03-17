import { Request, Response } from 'express';
import TransactionService from '../Services/transaction.service';
import { StatusCodes } from 'http-status-codes';

export default class TransactionController {
  private transactionService = new TransactionService();

  public async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { giftCardId } = req.body;
      const transaction = await this.transactionService.create(giftCardId);
      res.status(StatusCodes.CREATED).json(transaction);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Unable to create transactionCode.' });
    }
  }
}

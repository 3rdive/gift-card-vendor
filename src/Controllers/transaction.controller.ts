import { Request, Response } from 'express';
import TransactionService from '../Services/transaction.service';
import logger from '../Utils/logger';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../Utils/ErrorUtils';

export default class TransactionController {
  private transactionService = new TransactionService();

  public async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const email  = req.body;
      const transaction = await this.transactionService.create(email);
      logger.info(transaction)
      res.status(StatusCodes.CREATED).json({ message: 'Transaction code sent', transaction});
    } catch (error) {
      logger.error(error)
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Transaction code not sent'})
}
  }
  public async verifyTransactionCOntroller(req: Request, res: Response){
    try {
        const{email, code} = req.body;
  
        if (!code && !email) {
          throw new BadRequestError("Please provide a valid email and code");
        }
  
        const isCodeValid = await this.transactionService.verifyCode(code, email);
  
        if (isCodeValid) {
          res.status(200).send({ message: "Transaction PIN is accepted" });
        } else {
          res.status(400).send({ message: "Transaction code is invalid" });
        }
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "An error occurred. Please try again later."});
      }
    }
}

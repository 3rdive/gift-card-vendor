import { Router } from 'express';
import TransactionController from '../../Controllers/transaction.controller';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post('/giftCardCode', transactionController.createTransaction.bind(transactionController));

export default transactionRouter;

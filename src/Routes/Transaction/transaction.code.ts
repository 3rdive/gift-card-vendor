import { Router } from 'express';
import TransactionController from '../../Controllers/transaction.controller';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post('/transactionCode', transactionController.createTransaction.bind(transactionController));
transactionRouter.post('/inputPin', transactionController.verifyTransactionCOntroller.bind(transactionController));

export default transactionRouter;
// /
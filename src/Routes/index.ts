import { Router } from "express";
import authRouter from "./Auth/auth.route";
import transactionRouter from "./Transaction/transaction.code";
import giftcardRouter from "./Giftcard/Gift_card"

const router = Router();

router.use('/auth', authRouter);
router.use('/transaction', transactionRouter);
router.use('/dashboard', giftcardRouter);



export default router;
import { Router } from "express";
import authRouter from "./Auth/auth.route";
import transactionRouter from "./Transaction/transaction.code";

const router = Router();

router.use('/auth', authRouter)
router.use('/giftcard', transactionRouter)


export default router;
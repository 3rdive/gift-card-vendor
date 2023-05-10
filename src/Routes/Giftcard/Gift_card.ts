import { Router } from "express";
import GiftCardController from "../../Controllers/giftcard.controller";
const giftcardController = new GiftCardController();
const authRouter = Router();

authRouter.post('/create_giftcard', giftcardController.createGiftcard.bind(giftcardController));
authRouter.post('/verify_giftcard', giftcardController.verifyGiftcardController.bind(giftcardController));
authRouter.post('/buy_giftcard',  giftcardController.buyGiftcardControl.bind(giftcardController));
authRouter.post('/sell_giftcard', giftcardController.sellGiftcardControl.bind(giftcardController));
authRouter.post('/calculate', giftcardController.calculateControl.bind(giftcardController));



export default authRouter;
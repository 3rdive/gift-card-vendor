import { Router } from "express";
import { codeValidationRules, verifyGIftcardValidation } from "../../Utils/ValidationUtil/user.validation";
import GiftCardController from "../../Controllers/giftcard.controller";
const giftcardController = new GiftCardController();
const authRouter = Router();

authRouter.post('/create_giftcard', giftcardController.createGiftcard.bind(giftcardController));
authRouter.post('/verify_giftcard',verifyGIftcardValidation(), giftcardController.verifyGiftcard.bind(giftcardController));
authRouter.post('/buy_giftcard', codeValidationRules(), giftcardController.buyGiftcardControl.bind(giftcardController));
authRouter.post('/sell_giftcard', codeValidationRules(), giftcardController.sellGiftcardControl.bind(giftcardController));
authRouter.post('/calculate', giftcardController.calculateControl.bind(giftcardController));



export default authRouter;
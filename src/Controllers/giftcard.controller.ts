import {Request, Response} from 'express';
import GiftcardService from '../Services/giftcard.service';
import log from '../Utils/logger';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../Utils/ErrorUtils';

export default class GiftCardController {
    private giftcardService = new GiftcardService();
  
    public async createGiftcard(req: Request, res: Response): Promise<void> {
      try {
        const { type, transaction_code, image, transaction_feedback,email} = req.body;
        const giftcard = await this.giftcardService.create(type, transaction_code, image, transaction_feedback, email)
        log.info(giftcard)
        res.status(StatusCodes.CREATED).json({ message: 'Giftcard created', giftcard});
      } catch (error) {
        log.error(error)
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Giftcard not sent'})
  }
    }
    public async verifyGiftcard(req: Request, res: Response){
      try {
        const {email, code, type} = req.body
    
          if (!code && !email && !type) {
            throw new BadRequestError("Please provide a valid email and code");
          }
    
          const isCodeValid = await this.giftcardService.redeemCode(code, email, type);
    
          if (isCodeValid) {
            res.status(200).send({ message: "Giftcard is valid" });
          } else {
            res.status(400).send({ message: "Giftcard code is invalid" });
          }
        } catch (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "user not available"});
        }
      }
      
    public async buyGiftcardControl(req: Request, res: Response){
      try {
          const code = req.body.code;
          const giftcardBoughtValid = await this.giftcardService.buyGiftcard(code);
    
          if (giftcardBoughtValid) {
            res.status(200).send({ message: "Giftcard purcahase sucessful" });
          } 
        } catch (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error validating code, try again later"});
        }
      }

    public async sellGiftcardControl(req: Request, res: Response){
      try {
          const code = req.body.code;
    
          const giftcardSoldValid= await this.giftcardService.sellGiftcard(code);
    
          if (giftcardSoldValid) {
            res.status(200).send({ message: "Giftcard is valid and sold" });
          } else {
            res.status(400).send({ message: "Giftcard code is invalid and is not on sale" });
          }
        } catch (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "user not available"});
        }
      }
    public async calculateControl(req: Request, res: Response){
      try {
          const code = req.body.code;
    
          if (!code) {
            throw new BadRequestError("Please provide a valid email and code");
          }
    
          const calculate = await this.giftcardService.sellGiftcard(code);
    
          if (calculate) {
            res.status(200).send({ message: "Giftcard calculated" });
          } else {
            res.status(400).send({ message: "Giftcard code is invalid " });
          }
        } catch (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Try again later"});
        }
      }
  }
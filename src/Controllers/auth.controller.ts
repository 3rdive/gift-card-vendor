
import AuthService from "../Services/auth.service";
import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes";
import logger from '../Utils/logger'



export default class UserController {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService(); // initialize authService
  }
    public async createUser(req: Request, res: Response){
        const {email, password, user_name, phone_number, country} = req.body;
       
        try {
            const user = await this.authService.register(email, password, user_name, phone_number, country);
            res.status(StatusCodes.CREATED).json(user)
        } catch (error) {
            logger.error(error)
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'User already exist', error})
        }
    }

    public async logUser(req: Request, res: Response){
        try {
          const { email, password } = req.body;
          const token = await this.authService.login(email, password);
          res.setHeader('Set-Cookie', token);
          res.cookie('token', token, {
            expires: new Date(Date.now() + 2000),
          });
          return res.status(StatusCodes.ACCEPTED).json({
            message: 'Login Successful',
          });
        } catch (error) {
          return res.status(StatusCodes.BAD_REQUEST).json({message: 'Wrong login credentials', error});
          logger.error(error)
      }
      
       
      
    }

    public async getUser(req: Request, res: Response, next: NextFunction) {
      try {
        const id = Number(req.params.id); // convert string to number
        const user = await this.authService.getUser(id);
        res.status(StatusCodes.ACCEPTED).json(user);
      } catch (err) {
        logger.error(err);
        res.status(StatusCodes.BAD_REQUEST).json(err);
      }
    }
    
}





import AuthService from "../Services/auth.service";
import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes";
import logger from '../Utils/logger';
import { RegisterInterface } from "../type";
import { BadRequestError, UnAuthenticatedError } from "../Utils/ErrorUtils";
import log from "../Utils/logger";
import { attachCookiesToResponse } from "../Utils/Middleware/jwt.file";
const ACCESS_TOKEN = 'accessToken';
const LOGOUT = 'logout';


export default class AuthController {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService(); // initialize authService
  }
    public async createUser(req: Request, res: Response){
        const registerData : RegisterInterface = {
          email: req.body.email,
          password: req.body.password,
          user_name: req.body.user_name,
          phone_number: req.body.phone_number,
          country: req.body.country,
          verificationToken: "",
        }
        try {
            const user = await this.authService.register(registerData);
            logger.info({user})
            res.status(StatusCodes.ACCEPTED).json({message : "Sucess: Kindly verify your email"})
        } catch (error: any) {
            logger.error(error)
            return res.status(StatusCodes.BAD_REQUEST).json({message: error.message, error})
        }
    }

    public async verifyEmail(req: Request, res: Response){
      const {verificationToken, email} = req.body;
      try {
        const user = await this.authService.verifyEmail(verificationToken, email);
        res.status(StatusCodes.CREATED).json({email, message: 'email verified'})
      } catch (error) {
        logger.error(error)
        if(error instanceof UnAuthenticatedError){
          return res.status(StatusCodes.UNAUTHORIZED).json({message: error.message, error})
        }
      }
    }

    public async authenticate(req: Request, res: Response){
      const { email, password } = req.body;
    
      try {
        const { tokenUser, refresh_token } = await this.authService.login({
          email,
          password,
          ip: req.ip,
          userAgent: req.headers["user-agent"] ?? "",
        });
    
        attachCookiesToResponse({ res, user: tokenUser, refresh_token });
    
        res.status(StatusCodes.OK).json({ message: 'Login Sucessful!' });
      } catch (error : any) {
        log.error(error)
        if (error instanceof BadRequestError){
          return res.status(StatusCodes.BAD_REQUEST).json({message: error.message, error})
        }
        else if(error instanceof UnAuthenticatedError) {
          return res.status(StatusCodes.UNAUTHORIZED).json({message: error.message, error})
        }
    }  
    }
    public async forgotPassword(req: Request, res: Response){
    
      try {
        const { email } = req.body;
        const resetToken= await this.authService.forgotPassword(email);
        logger.info(resetToken)
        res.status(200).json({ msg: 'Please check your email for reset password link', resetToken });
      }
      catch (error : any) {
        log.error(error)
        if (error instanceof BadRequestError){
          return res.status(StatusCodes.BAD_REQUEST).json({message: error.message, error})
        }
        else if(error instanceof UnAuthenticatedError) {
          return res.status(StatusCodes.UNAUTHORIZED).json({message: error.message, error})
        }
    }  
    }

    public async resetPasswordController (req: Request, res: Response,){
      const {token, email, password} = req.body;
      try {
     const code= await this.authService.resetPasswordService(email, token, password);
        logger.info(code)
     res.status(200).json({message: 'password reset successfull', code});
      } 
      catch (error : any) {
        log.error(error)
        if (error instanceof BadRequestError){
          return res.status(StatusCodes.BAD_REQUEST).json({message: error.message, error})
        }
        else if(error instanceof UnAuthenticatedError) {
          return res.status(StatusCodes.UNAUTHORIZED).json({message: error.message, error})
        }
    }  
    }
    
    
    public async logOut(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const userId = req.body;
        await this.authService.logout(userId);
    
        res.cookie(ACCESS_TOKEN, LOGOUT, {
          httpOnly: true,
          expires: new Date(Date.now()),
        });
        res.cookie('refreshToken', LOGOUT, {
          httpOnly: true,
          expires: new Date(Date.now()),
        });
        res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
      } catch (error) {
        log.error(error);
        next(error);
      }
    }
    
    
}




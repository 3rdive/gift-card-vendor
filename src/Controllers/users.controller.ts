
import UserService from "../Services/users.service";
import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes";
import logger from '../Utils/logger';

export default class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService(); // initialize authService
  }


    public async getUser(req: Request, res: Response, next: NextFunction) {
      try {
        const id = Number(req.params.id); // convert string to number
        const user = await this.userService.getUser(id);
        res.status(StatusCodes.ACCEPTED).json(user);
      } catch (err) {
        logger.error(err);
        res.status(StatusCodes.BAD_REQUEST).json(err);
      }
    }
    
    //For Admin Users
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
      try {
        const id = Number(req.params.id); // convert string to number
        const user = await this.userService.deleteUser(id);
        res.status(StatusCodes.ACCEPTED).json({user, message: "user deleted from database", });
      } catch (err) {
        logger.error(err);
        res.status(StatusCodes.BAD_REQUEST).json(err);
      }
    }
    
}
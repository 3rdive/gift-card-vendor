import { Router } from "express";
const authRouter = Router();
import UserController from "../../Controllers/auth.controller";
const userController = new UserController();
import {registerValidationTerms, loginValidationTerms } from "../../Utils/ValidationUtil/user.validation";

authRouter.post('/register', registerValidationTerms(), userController.createUser.bind(userController))
authRouter.get('/users/:id', userController.getUser.bind(userController));
authRouter.post('/login', userController.logUser.bind(userController));


export default authRouter;
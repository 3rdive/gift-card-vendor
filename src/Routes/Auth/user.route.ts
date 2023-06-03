import { Router } from "express";
import UserController from "../../Controllers/users.controller";
const userController = new UserController();
const authRouter = Router();

authRouter.get('/users/:id', userController.getUser.bind(userController));
authRouter.delete('/delete/:id', userController.deleteUser.bind(userController));

export default authRouter;
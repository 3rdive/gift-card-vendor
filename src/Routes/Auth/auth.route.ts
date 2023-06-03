import { Router } from "express";
import AuthController from "../../Controllers/auth.controller";
import { authenticateUser } from "../../Utils/Middleware/authentication";
import { authenticateLogout } from "../../Utils/Middleware/authMiddleware";
import {registerValidationTerms, loginValidationTerms } from "../../Utils/ValidationUtil/user.validation";
const authController = new AuthController();
const authRouter = Router();

authRouter.post('/register', registerValidationTerms(), authController.createUser.bind(authController));
authRouter.post('/verifyEmail', authController.verifyEmail.bind(authController));
authRouter.post('/login', loginValidationTerms(), authController.authenticate.bind(authController));
authRouter.post('/forgotPassword', authController.forgotPassword.bind(authController));
authRouter.post('/resetPassword', authController.resetPasswordController.bind(authController));
authRouter.delete('/logout', authController.logOut.bind(authController));


export default authRouter;
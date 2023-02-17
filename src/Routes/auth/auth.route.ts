import { Router } from 'express';
import {
    create,
    login,
} from '../../Controller/Auth/auth.controller';
import {
    registerValidationTerms,
    loginValidationTerms
} from '../../Utils/ValidationUtil/user.validation';

const authRouter = Router();

authRouter.post('/register', registerValidationTerms(),  create);

authRouter.post('/login', loginValidationTerms(),  login);

export default authRouter;
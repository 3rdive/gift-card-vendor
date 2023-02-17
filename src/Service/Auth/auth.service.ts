import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserType } from "../../Models/user.model";
import AuthRepository from "../../Repository/auth.repository";
import validation from "../../Utils/ValidationUtil/validation"
import {
    BadRequestError, 
    NotFoundError, 
    UnAuthenticatedError
} from "../../Utils/ErrorUtil"
import bcrypt from "../../Utils/bcrypt.encrypt"


// instances
const authRepository = new AuthRepository;
const validations = new validation;


export default class AuthService {
    public async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userName, password, country, phoneNumber, email } = req.body;

            const user = {
                user_name: userName,
                password_digest: password,
                phone_number: phoneNumber,
                email,
                country: country,
            };

            const userEmail = await validations.where('email', user.email);

            if (userEmail) {
                return res.status(400).json({
                    success: false,
                    error: ' Email is already taken',
                    message: 'Registration failed!',
                });
            }

            const userPhone = await validations.where('phone_number', user.phone_number);
            
            if (userPhone) {
                return res.status(400).json({
                    success: false,
                    error: 'Phone number is already taken',
                    message: 'Registration failed!',
                });
            }
            if (userEmail === undefined && userPhone === undefined) {
                const registerUser: UserType = await authRepository.createUser(
                    user
                );
                if (!registerUser) {
                   throw new BadRequestError('Invalid Credentials')
                }
                if (registerUser) {
                    return res.status(201).json({
                        success: true,
                        message:
                            'Account successfully created.',
                    });
                }
            }

            
         } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({error});
         }
        }

//Login

        public async login(req: Request, res: Response, next: NextFunction) {
            try {
                const { email, password } = req.body;
    
                const usercheck = await validations.where('email', email);
                if (!usercheck) {
                    return res.status(404).json({
                        success: false,
                        error: 'Incorrect Email or password',
                        message: 'Login failed!',
                    });
                }
                if (!usercheck) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message:
                            'User account is not available, Kindly sign up to a user account',
                    });
                }
                const user = await authRepository.login(email, password);
                if (user) {
                    const token = await bcrypt.generateAccessToken(user);
                    
                    res.setHeader('Set-Cookie', token);
                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 2000),
                    });
                    return res.status(StatusCodes.ACCEPTED).json(
                        ({ message: 'Login Successful'})
                    );
                } else {
                    return res.status(403).json(
                        ({
                            message: 'Failed login attempt',
                            error: 'Incorrect password',
                            success: false,
                        })
                    );
                }
            } catch (error) {
                throw new BadRequestError('something went wrong here is the error ')
                
            }
        }

}
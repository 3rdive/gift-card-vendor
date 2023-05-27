import { body, check } from 'express-validator';

export const registerValidationTerms = () => {
    return [
        check('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .matches(/^\w+([.-]?\w+)*@gmail.com$/)
            .withMessage('please enter a valid email'),
        check('user_name')
            .trim()
            .notEmpty()
            .withMessage('user name can not be empty')
            .isLength({ min: 1, max: 20 })
            .withMessage('user name  must be between 1 and 30 characters'),

        check('password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
        check('phone_number')
            .trim()
            .notEmpty()
            .withMessage('Phone number can not be empty')
            .isLength({ min: 11, max: 11 })
            .withMessage('Phone number must be 11 digit long'),
    ];
};

export const loginValidationTerms = () => {
    return [
        check('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .matches(/^\w+([.-]?\w+)*@gmail.com$/)
            .withMessage('please enter a valid email'),
        check('password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
    ];
};

export const emailValidationRules = () => {
    return [
        check('email')
            .trim()
            .isEmail()
            .matches(/^\w+([.-]?\w+)*@gmail.com$/)
            .normalizeEmail()
            .withMessage('please enter a valid email'),
    ];
};
export const restPasswordValidationRules = () => {
    return [
        check('password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
        check('confirm_password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
        check('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .matches(/^\w+([.-]?\w+)*@gmail.com$/)
            .withMessage('please enter a valid email'),
    ];
};
export const codeValidationRules = () => {
    return [
        body('code')
            .trim()
            .notEmpty()
            .withMessage('Please provide a valid email and code')
            .isLength({ min: 7, max: 20 })
            .withMessage('Code must be between 6 and 16 characters'),
    ];
};

export const verifyGIftcardValidation = () => {
    return [
        check('password')
            .trim()
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
        check('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .matches(/^\w+([.-]?\w+)*@gmail.com$/)
            .withMessage('please enter a valid email'),
        check('type')
            .trim()
            .isAlphanumeric()
            .isLength({ min: 6, max: 16 })
            .withMessage('please enter a valid giftcard type'),
    ];
};
import { error } from 'console';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({path: '../../.env'});

const {
    DB_HOST,
    POSTGRES_PORT,
    DB_POSTGRES,
    DB_USERNAME,
    DB_PASSWORD,
    DB_CLIENT,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    JWT_SECRET,

} = process.env;

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '1222');


export const env = {
    NODE_ENV,
    PORT,

    DB_HOST,
    POSTGRES_PORT,
    DB_POSTGRES,
    DB_USERNAME,
    DB_PASSWORD,
    DB_CLIENT,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    JWT_SECRET,
};



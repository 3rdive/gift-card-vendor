import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const {
    DB_HOST,
    POSTGRES_PORT,
    DB_POSTGRES,
    DB_USERNAME,
    DB_PASSWORD,
    DB_CLIENT,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    SECRET,

} = process.env;

if (
    !DB_HOST ||
    !POSTGRES_PORT ||
    !DB_POSTGRES ||
    !DB_USERNAME ||
    !DB_PASSWORD ||
    !DB_CLIENT ||
    !BCRYPT_PASSWORD ||
    !SALT_ROUNDS ||
    !SECRET
) {
    throw new Error('environment variables not defined');
}

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '1222');

const PUB_KEY = fs.readFileSync('./src/config/crypto/pub_key.pem', 'utf8');

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
    SECRET,
};

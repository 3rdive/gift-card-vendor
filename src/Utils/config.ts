// config.ts
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

export default {
  BCRYPT_PASSWORD: process.env.BCRYPT_PASSWORD || '',
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  SECRET: process.env.JWTSECRET || 'NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp2',
  SGM: process.env.SENDGRID_API_KEY
};

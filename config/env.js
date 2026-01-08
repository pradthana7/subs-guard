import {config} from 'dotenv';

config({
    path: `.env.development.local`
});

export const {
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_KEY,
    QSTASH_TOKEN,
    QSTASH_URL,
    SERVER_URL,
    NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD
} = process.env;
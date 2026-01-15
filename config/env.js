// config/env.js
import 'dotenv/config';

function must(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const PORT = process.env.PORT ?? 3000;

export const DB_URI = must('DB_URI');
export const JWT_SECRET = must('JWT_SECRET');
export const JWT_EXPIRES_IN = must('JWT_EXPIRES_IN');

export const ARCJET_KEY = must('ARCJET_KEY');
export const ARCJET_INTERNAL_SECRET = must('ARCJET_INTERNAL_SECRET');

export const QSTASH_TOKEN = must('QSTASH_TOKEN');
export const QSTASH_URL = process.env.QSTASH_URL;

export const SERVER_URL = process.env.SERVER_URL;

export const NODEMAILER_EMAIL = must('NODEMAILER_EMAIL');
export const NODEMAILER_PASSWORD = must('NODEMAILER_PASSWORD');

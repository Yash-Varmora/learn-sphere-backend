

// ============= Environment Variables =============

import rateLimit from "express-rate-limit";

const config = {
    PORT: process.env.PORT,
    RATE_LIMIT_TIME: process.env.RATE_LIMIT_TIME,
    RATE_LIMIT_REQUEST: process.env.RATE_LIMIT_REQUEST,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES,
    ACCESS_TOKEN_COOKIE_EXPIRE_TIME: process.env.ACCESS_TOKEN_COOKIE_EXPIRE_TIME,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES,
    REFRESH_TOKEN_COOKIE_EXPIRE_TIME: process.env.REFRESH_TOKEN_COOKIE_EXPIRE_TIME,
    FRONTEND_URL: process.env.FRONTEND_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
}

// ============= CORS options =============

export const corsOptions = {
    origin: config.FRONTEND_URL,
    credentials: true,
}

// ============= rate-limiter config =============

export const limiter = rateLimit({
    windowMs: 60 * 1000 * config.RATE_LIMIT_TIME,
    max: config.RATE_LIMIT_REQUEST,
})

export default config;
import rateLimit from "express-rate-limit";

/**
 * ip rate limited at 1req/sec
 */

export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // Limit each IP to 60 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: true, // `X-RateLimit-*` headers
});

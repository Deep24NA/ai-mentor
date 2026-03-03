import rateLimit from "express-rate-limit";

export const chatRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 15, // only 15 request
    message: {
        success: false,
        error: "Too many request. Please try again later.",
    },
});

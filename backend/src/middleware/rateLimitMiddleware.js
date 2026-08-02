import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 300, // Maximum 100 requests per IP

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    message:
      "Too many requests from this IP. Please try again later.",
  },
});


export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 20, // Maximum 10 requests per IP

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    message:
      "Too many authentication attempts. Please try again later.",
  },
});
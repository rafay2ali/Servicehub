import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import {
  authLimiter,
} from "../middleware/rateLimitMiddleware.js";

import {
  registerValidation,
  loginValidation,
  handleValidationErrors,
} from "../validators/authValidator.js";

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  registerValidation,
  handleValidationErrors,
  registerUser
);

router.post(
  "/login",
  authLimiter,
  loginValidation,
  handleValidationErrors,
  loginUser
);

export default router;
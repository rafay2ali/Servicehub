import express from "express";

import {
  createReview,
  getProviderReviews,
  getMyReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import protect from "../middleware/authMiddleware.js";

import {
  createReviewValidation,
  handleReviewValidationErrors,
} from "../validators/reviewValidator.js";

const router = express.Router();

router.get(
  "/provider/:providerId",
  getProviderReviews
);
router.post(
  "/",
  protect,
  createReviewValidation,
  handleReviewValidationErrors,
  createReview
);
router.get(
  "/my-reviews",
  protect,
  getMyReviews
);
router.put(
  "/:id",
  protect,
  updateReview
);
router.delete(
  "/:id",
  protect,
  deleteReview
);


export default router;
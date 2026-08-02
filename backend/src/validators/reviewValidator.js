import {
  body,
  validationResult,
} from "express-validator";
export const handleReviewValidationErrors = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Review validation failed",
      errors: errors.array(),
    });
  }

  next();
};
export const createReviewValidation = [
  body("booking")
    .notEmpty()
    .withMessage(
      "Booking ID is required"
    )
    .isMongoId()
    .withMessage(
      "Invalid booking ID"
    ),

  body("rating")
    .notEmpty()
    .withMessage(
      "Rating is required"
    )
    .isInt({
      min: 1,
      max: 5,
    })
    .withMessage(
      "Rating must be between 1 and 5"
    ),

  body("comment")
    .trim()
    .notEmpty()
    .withMessage(
      "Comment is required"
    )
    .isLength({
      min: 3,
      max: 500,
    })
    .withMessage(
      "Comment must be between 3 and 500 characters"
    ),
];
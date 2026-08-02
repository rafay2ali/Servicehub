import {
  body,
  validationResult,
} from "express-validator";
export const handleBookingValidationErrors = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Booking validation failed",
      errors: errors.array(),
    });
  }

  next();
};

export const createBookingValidation = [
  body("service")
    .notEmpty()
    .withMessage(
      "Service ID is required"
    )
    .isMongoId()
    .withMessage(
      "Invalid service ID"
    ),

  body("bookingDate")
    .notEmpty()
    .withMessage(
      "Booking date is required"
    )
    .isISO8601()
    .withMessage(
      "Booking date must be a valid date"
    ),

  body("notes")
    .optional()
    .trim()
    .isLength({
      max: 500,
    })
    .withMessage(
      "Notes cannot exceed 500 characters"
    ),
];
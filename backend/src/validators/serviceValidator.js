import {
  body,
  validationResult,
} from "express-validator";
export const handleServiceValidationErrors = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Service validation failed",
      errors: errors.array(),
    });
  }

  next();
};

export const createServiceValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Service title is required")
    .isLength({
      min: 3,
      max: 100,
    })
    .withMessage(
      "Service title must be between 3 and 100 characters"
    ),

  body("description")
    .trim()
    .notEmpty()
    .withMessage(
      "Service description is required"
    )
    .isLength({
      min: 10,
      max: 1000,
    })
    .withMessage(
      "Description must be between 10 and 1000 characters"
    ),

  body("category")
    .trim()
    .notEmpty()
    .withMessage(
      "Service category is required"
    )
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage(
      "Category must be between 2 and 50 characters"
    ),

  body("price")
    .notEmpty()
    .withMessage("Service price is required")
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Price must be a number greater than or equal to 0"
    ),

  body("location")
    .trim()
    .notEmpty()
    .withMessage(
      "Service location is required"
    )
    .isLength({
      min: 2,
      max: 100,
    })
    .withMessage(
      "Location must be between 2 and 100 characters"
    ),

  body("images")
    .optional()
    .isArray()
    .withMessage(
      "Images must be provided as an array"
    ),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage(
      "isAvailable must be true or false"
    ),
];

export const updateServiceValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({
      min: 3,
      max: 100,
    })
    .withMessage(
      "Service title must be between 3 and 100 characters"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({
      min: 10,
      max: 1000,
    })
    .withMessage(
      "Description must be between 10 and 1000 characters"
    ),

  body("category")
    .optional()
    .trim()
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage(
      "Category must be between 2 and 50 characters"
    ),

  body("price")
    .optional()
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Price must be a number greater than or equal to 0"
    ),

  body("location")
    .optional()
    .trim()
    .isLength({
      min: 2,
      max: 100,
    })
    .withMessage(
      "Location must be between 2 and 100 characters"
    ),

  body("images")
    .optional()
    .isArray()
    .withMessage(
      "Images must be provided as an array"
    ),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage(
      "isAvailable must be true or false"
    ),
];
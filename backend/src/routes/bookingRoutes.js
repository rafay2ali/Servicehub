import express from "express";

import {
  createBooking,
  getMyBookings,
  getProviderBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
  cancelBooking,
} from "../controllers/bookingController.js";

import protect from "../middleware/authMiddleware.js";

import {
  createBookingValidation,
  handleBookingValidationErrors,
} from "../validators/bookingValidator.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createBookingValidation,
  handleBookingValidationErrors,
  createBooking
);

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);
router.get(
  "/provider",
  protect,
  getProviderBookings
);

router.put(
  "/:id/accept",
  protect,
  acceptBooking
);

router.put(
  "/:id/reject",
  protect,
  rejectBooking
);
router.put(
  "/:id/complete",
  protect,
  completeBooking
);

router.put(
  "/:id/cancel",
  protect,
  cancelBooking
);

export default router;
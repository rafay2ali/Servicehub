import express from "express";

import {
  getAllUsers,
  deleteUser,
  getAllServices,
  deleteAnyService,
  getAllBookings,
  getAllReviews,
 deleteAnyReview,
 getDashboardStats,
 getDashboardAnalytics,
} from "../controllers/adminController.js";

import protect, {
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);


router.get(
  "/services",
  protect,
  authorizeRoles("admin"),
  getAllServices
);

router.delete(
  "/services/:id",
  protect,
  authorizeRoles("admin"),
  deleteAnyService
);

router.get(
  "/bookings",
  protect,
  authorizeRoles("admin"),
  getAllBookings
);
router.get(
  "/reviews",
  protect,
  authorizeRoles("admin"),
  getAllReviews
);
router.delete(
  "/reviews/:id",
  protect,
  authorizeRoles("admin"),
  deleteAnyReview
);
router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

router.get(
  "/dashboard/analytics",
  protect,
  authorizeRoles("admin"),
  getDashboardAnalytics
);

export default router;
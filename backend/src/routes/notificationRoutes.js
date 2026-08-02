import express from "express";

import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getMyNotifications
);

router.put(
  "/:id/read",
  protect,
  markNotificationAsRead
);

router.put(
  "/read-all",
  protect,
  markAllNotificationsAsRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;
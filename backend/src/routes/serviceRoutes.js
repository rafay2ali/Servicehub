import express from "express";

import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import protect, {
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import {
  createServiceValidation,
  updateServiceValidation,
  handleServiceValidationErrors,
} from "../validators/serviceValidator.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get(
  "/",
  getAllServices
);
router.get(
  "/:id",
  getServiceById
);

router.post(
  "/",
  protect,
  authorizeRoles("provider", "admin"),
  upload.single("image"),
  createServiceValidation,
  handleServiceValidationErrors,
  createService
);
router.put(
  "/:id",
  protect,
  authorizeRoles("provider", "admin"),
  updateServiceValidation,
  handleServiceValidationErrors,
  updateService
);
router.delete(
  "/:id",
  protect,
  authorizeRoles("provider", "admin"),
  deleteService
);


export default router;
import express from "express";

import {
  uploadPhoto,
  getTripPhotos,
  deletePhoto,
} from "../controllers/photoControllers.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  uploadPhoto
);

router.get(
  "/:tripId",
  protect,
  getTripPhotos
);

router.delete(
  "/:id",
  protect,
  deletePhoto
);

export default router;
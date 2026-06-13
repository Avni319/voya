import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  generateTripSummary,
} from "../controllers/aiControllers.js";

const router =
  express.Router();

router.get(
  "/summary/:tripId",
  protect,
  generateTripSummary
);

export default router;
import express from "express";

import {
  createTrip,
  getMyTrips,
  deleteTrip,
  getTripById,
  getPublicTrips,
} from "../controllers/tripControllers.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTrip);

router.get("/", protect, getMyTrips);

router.get( "/public/all",getPublicTrips);

router.delete("/:id", protect, deleteTrip);

router.get("/:id", protect, getTripById);

export default router;
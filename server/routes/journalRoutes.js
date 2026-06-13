import express from "express";

import {
  createJournalEntry,
  getTripJournalEntries,
  deleteJournalEntry,
} from "../controllers/journalControllers.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createJournalEntry
);

router.get(
  "/:tripId",
  protect,
  getTripJournalEntries
);

router.delete(
  "/:id",
  protect,
  deleteJournalEntry
);

export default router;
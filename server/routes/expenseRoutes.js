import express from "express";

import {
createExpense,
getTripExpenses,
deleteExpense,
} from "../controllers/expenseControllers.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createExpense
);

router.get(
  "/:tripId",
  protect,
  getTripExpenses
);

router.delete(
  "/:id",
  protect,
  deleteExpense
);

export default router;
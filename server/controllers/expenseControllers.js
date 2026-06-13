import Expense from "../models/Expense.js";


// CREATE EXPENSE

export const createExpense = async (
  req,
  res
) => {
  try {
    const { tripId, title, amount, category } =
      req.body;

    const expense = await Expense.create({
        tripId,
        title,
        amount,
        category,
    });

    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET EXPENSES OF TRIP

export const getTripExpenses = async (
  req,
  res
) => {
  try {
    const expenses = await Expense.find({
      tripId: req.params.tripId,
    });

    res.status(200).json(expenses);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE EXPENSE

export const deleteExpense = async (
  req,
  res
) => {
  try {
    const expense = await Expense.findById(
      req.params.id
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Expense deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
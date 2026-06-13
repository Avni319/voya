import Trip from "../models/Trip.js";
import Journal from "../models/Journal.js";
import Photo from "../models/Photo.js";
import Expense from "../models/Expense.js";

export const getDashboardStats =
  async (req, res) => {
    try {

      const trips = await Trip.find({
        userId: req.user.id,
      });

      const tripIds = trips.map(
        (trip) => trip._id
      );

      const journals =
        await Journal.countDocuments({
          tripId: { $in: tripIds },
        });

      const photos =
        await Photo.countDocuments({
          tripId: { $in: tripIds },
        });

      const expenses =
        await Expense.find({
          tripId: { $in: tripIds },
        });

      const totalExpenses =
        expenses.reduce(
          (sum, expense) =>
            sum + expense.amount,
          0
        );

      res.json({
        trips: trips.length,
        journals,
        photos,
        totalExpenses,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
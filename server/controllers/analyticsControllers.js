import Trip from "../models/Trip.js";
import Journal from "../models/Journal.js";
import Photo from "../models/Photo.js";
import Expense from "../models/Expense.js";

export const getAnalytics = async (
  req,
  res
) => {
  try {

    const trips = await Trip.find({
      userId: req.user.id,
    });

    const tripIds = trips.map(
      (trip) => trip._id
    );

    const photos = await Photo.find({
      tripId: { $in: tripIds },
    });

    const journals = await Journal.find({
      tripId: { $in: tripIds },
    });

    const expenses = await Expense.find({
      tripId: { $in: tripIds },
    });

    const totalExpenses =
      expenses.reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      );

    const expenseByTrip =
      trips.map((trip) => {

        const tripExpenses =
          expenses.filter(
            (expense) =>
              expense.tripId.toString() ===
              trip._id.toString()
          );

        const total =
          tripExpenses.reduce(
            (sum, expense) =>
              sum + expense.amount,
            0
          );

        return {
          name: trip.title,
          expenses: total,
        };
      });

    const photosByTrip =
      trips.map((trip) => {

        const count =
          photos.filter(
            (photo) =>
              photo.tripId.toString() ===
              trip._id.toString()
          ).length;

        return {
          name: trip.title,
          photos: count,
        };
      });

    res.json({
      totalTrips: trips.length,
      totalPhotos: photos.length,
      totalJournals:
        journals.length,
      totalExpenses,
      expenseByTrip,
      photosByTrip,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      startDate,
      endDate,
      visibility,
    } = req.body;

    const trip = await Trip.create({
      userId: req.user.id,
      title,
      description,
      location,
      startDate,
      endDate,
      visibility,
    });
    console.log("Trip created:", trip);
    res.status(201).json(trip);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyTrips = async (req, res) => {
  try {
    console.log("User ID:", req.user.id);
    const trips = await Trip.find({
      userId: req.user.id,
    });

    console.log("Trips found:", trips.length);

    res.status(200).json(trips);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Trip deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(
      req.params.id
    );

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json(trip);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getPublicTrips = async (
  req,
  res
) => {
  try {

    const trips = await Trip.find({
      visibility: "public",
    })
    .sort({
      createdAt: -1,
    });

    res.status(200).json(trips);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
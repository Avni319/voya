import Journal from "../models/Journal.js";


// CREATE JOURNAL ENTRY

export const createJournalEntry = async (req, res) => {
  try {
    const {
      tripId,
      title,
      location,
      content,
    } = req.body;

    const journalEntry = await Journal.create({
      tripId,
      title,
      location,
      content,
    });

    res.status(201).json(journalEntry);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL ENTRIES OF A TRIP

export const getTripJournalEntries = async (req, res) => {
  try {
    const entries = await Journal.find({
      tripId: req.params.tripId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(entries);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE ENTRY

export const deleteJournalEntry = async (req, res) => {
  try {
    const entry = await Journal.findById(
      req.params.id
    );

    if (!entry) {
      return res.status(404).json({
        message: "Journal entry not found",
      });
    }

    await Journal.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Journal entry deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
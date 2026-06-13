import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },

    title: String,

    location: String,

    content: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Journal",
  journalSchema
);
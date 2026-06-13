import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Photo",
  photoSchema
);
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
    location: {
  type: String,
  default: "",
},

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
import { GoogleGenerativeAI } from "@google/generative-ai";

import Trip from "../models/Trip.js";
import Journal from "../models/Journal.js";
import Photo from "../models/Photo.js";
import Expense from "../models/Expense.js";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

export const generateTripSummary =
  async (req, res) => {
    try {

      const { tripId } =
        req.params;

      const trip =
        await Trip.findById(
          tripId
        );

      if (!trip) {
        return res
          .status(404)
          .json({
            message:
              "Trip not found",
          });
      }

      const journals =
        await Journal.find({
          tripId,
        });

      const photos =
        await Photo.find({
          tripId,
        });

      const expenses =
        await Expense.find({
          tripId,
        });

      const totalExpenses =
        expenses.reduce(
          (sum, expense) =>
            sum +
            expense.amount,
          0
        );

      const prompt = `
You are a travel writer.

Create a beautiful travel story.

Trip Title:
${trip.title}

Description:
${trip.description}

Journal Entries:
${journals
  .map(
    (j) => j.content
  )
  .join("\n")}

Photo Captions:
${photos
  .map(
    (p) => p.caption
  )
  .join("\n")}

Total Expenses:
₹${totalExpenses}

Write a travel summary of around 150 words.
Make it emotional and engaging.
`;



      const model =
        genAI.getGenerativeModel({
          model:
            "gemini-2.5-flash",
        });
   
      const result =
        await model.generateContent(
          prompt
        );

      const summary =
        result.response.text();

      res.json({
        summary,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };
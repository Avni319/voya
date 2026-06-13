import axios from "axios";
import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/expenses`;

export const createExpense = async (
  expenseData
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    expenseData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getTripExpenses =
  async (tripId) => {
    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/${tripId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

export const deleteExpense =
  async (expenseId) => {
    const token =
      localStorage.getItem("token");

    const response = await axios.delete(
      `${API_URL}/${expenseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };
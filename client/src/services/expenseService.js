import axios from "axios";

const API_URL =
  "http://localhost:5000/api/expenses";

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
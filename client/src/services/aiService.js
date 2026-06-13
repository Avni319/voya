import axios from "axios";

const API_URL =
  "http://localhost:5000/api/ai";

export const generateSummary =
  async (tripId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_URL}/summary/${tripId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
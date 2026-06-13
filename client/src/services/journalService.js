import axios from "axios";
import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/journals`;

export const createJournalEntry = async (
  entryData
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    entryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getTripJournalEntries =
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

export const deleteJournalEntry =
  async (entryId) => {
    const token =
      localStorage.getItem("token");

    const response = await axios.delete(
      `${API_URL}/${entryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };
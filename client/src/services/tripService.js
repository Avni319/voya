import axios from "axios";
import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/trips`;

export const getMyTrips = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createTrip = async (tripData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    tripData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteTrip = async (tripId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/${tripId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getTripById = async (tripId) => {
  const token = localStorage.getItem("token");

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

export const getPublicTrips =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/public/all`
      );

    return response.data;
  };
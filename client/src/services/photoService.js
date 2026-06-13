import axios from "axios";

const API_URL =
  "http://localhost:5000/api/photos";

export const uploadPhoto = async (
  formData
) => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.post(
      API_URL,
      formData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};

export const getTripPhotos = async (
  tripId
) => {
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

export const deletePhoto = async (
  photoId
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/${photoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
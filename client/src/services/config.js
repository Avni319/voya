const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return import.meta.env.DEV ? "http://localhost:5000" : "https://voya-dj1t.onrender.com";
};

export const API_BASE_URL = `${getBaseUrl()}/api`;

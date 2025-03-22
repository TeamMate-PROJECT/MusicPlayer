import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change this if using a deployed backend

export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/songs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

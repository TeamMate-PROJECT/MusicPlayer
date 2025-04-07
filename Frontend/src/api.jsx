// api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Create an Axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Automatically attach JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------------ SONG APIs ------------------

export const fetchSong = async () => {
  try {
    const response = await api.get("/songs");
    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export const fetchSongs = async () => {
  try {
    const response = await api.get("/songs/all"); // ✅ corrected route
    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error.response?.data || error.message);
    return [];
  }
};

// ------------------ PLAYLIST APIs ------------------

export const fetchUserPlaylists = async () => {
  try {
    const res = await api.get("/playlists/my-playlists");
    return res.data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
};

export const createPlaylist = async (name) => {
  try {
    const res = await api.post("/playlists/create", { name });
    return res.data;
  } catch (error) {
    console.error("Error creating playlist:", error.response?.data || error.message);
    return null;
  }
};

export const addSongToPlaylist = async (playlistId, songId) => {
  try {
    const res = await api.post("/playlists/add-song", { playlistId, songId });
    return res.data;
  } catch (error) {
    console.error("Error adding song to playlist:", error.response?.data || error.message);
    return null;
  }
};

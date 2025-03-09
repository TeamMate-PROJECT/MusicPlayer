import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MoodSongs = () => {
  const { mood } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/songs?mood=${encodeURIComponent(mood)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError("Failed to load songs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [mood]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Songs for {mood}</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : songs.length > 0 ? (
        <ul className="space-y-3">
          {songs.map((song) => (
            <li key={song.id} className="p-4 bg-gray-800 rounded-lg">
              <h2 className="text-white text-lg font-medium">{song.title}</h2>
              <p className="text-gray-400">{song.artist}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No songs found for this mood.</p>
      )}
    </div>
  );
};

export default MoodSongs;

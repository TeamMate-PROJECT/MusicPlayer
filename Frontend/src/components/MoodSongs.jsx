import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AudioPlayerContext } from "../context/AudioPlayerContext";

const MoodSongs = () => {
  const { mood } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentSong, isPlaying, playSong } = useContext(AudioPlayerContext);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/songs?emotion=${encodeURIComponent(mood)}`);
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

  const handleSongSelect = (song) => {
    playSong(song, songs); // ✅ pass entire songs list as queue
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Songs for {mood}</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : songs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songs.map((song) => (
            <div
              key={song._id}
              onClick={() => handleSongSelect(song)}
              className={`bg-gray-800 rounded-lg p-4 shadow-lg cursor-pointer transform hover:scale-105
                border-2 transition-[border-color] duration-500 ease-in-out ${
                  currentSong?.audioUrl === song.audioUrl && isPlaying
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
            >
              <img src={song.imageUrl} alt={song.title} className="w-full h-40 object-cover rounded-md" />
              <h2 className="text-white text-lg font-medium mt-2">{song.title}</h2>
              <p className="text-gray-400">{song.artist}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No songs found for this mood.</p>
      )}
    </div>
  );
};

export default MoodSongs;

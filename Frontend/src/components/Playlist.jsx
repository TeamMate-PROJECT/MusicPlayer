import { useEffect, useState, useRef, useContext } from "react";
import { PlusCircle, Music, ChevronDown, ChevronUp } from "lucide-react";
import {
  fetchSongs,
  fetchUserPlaylists,
  createPlaylist,
  addSongToPlaylist,
} from "../api";
import { AudioPlayerContext } from "../context/AudioPlayerContext"; // 👈 Import context

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [openPlaylistId, setOpenPlaylistId] = useState(null);
  const playlistEndRef = useRef(null);

  const { playSong } = useContext(AudioPlayerContext); // 👈 Use context

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const userPlaylists = await fetchUserPlaylists();
        const allSongs = await fetchSongs();
        setPlaylists(userPlaylists || []);
        setSongs(allSongs || []);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    loadInitialData();
  }, []);

  const handleAddPlaylist = async () => {
    if (!newPlaylistName.trim()) return alert("Please enter a playlist name!");
    try {
      const created = await createPlaylist(newPlaylistName);
      if (created) {
        setPlaylists((prev) => [...prev, created]);
        setNewPlaylistName("");
        setShowInput(false);
        setOpenPlaylistId(created._id);
        setTimeout(() => playlistEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } catch (err) {
      console.error("Error creating playlist:", err);
      alert("Failed to create playlist.");
    }
  };

  const togglePlaylist = (id) => {
    setOpenPlaylistId((prevId) => (prevId === id ? null : id));
  };

  const handleAddSong = async (playlistId, songId) => {
    if (!songId) return;
    try {
      const updated = await addSongToPlaylist(playlistId, songId);
      if (updated) {
        const updatedPlaylists = playlists.map((playlist) =>
          playlist._id === playlistId ? { ...playlist, songs: updated.songs } : playlist
        );
        setPlaylists(updatedPlaylists);
        alert("Song added successfully!");
      }
    } catch (err) {
      console.error("Error adding song:", err);
      alert("Failed to add song.");
    }
  };

  const isSongInPlaylist = (playlist, songId) => {
    return playlist.songs?.some((song) =>
      typeof song === "object" ? song._id === songId : song === songId
    );
  };

  const resolveSongDetails = (song) => {
    return typeof song === "object"
      ? song
      : songs.find((s) => s._id === song) || {};
  };

  return (
    <div className="bg-black text-white p-6 min-h-screen w-full">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Playlists</h2>

      {showInput ? (
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="p-2 bg-gray-900 text-white rounded-l-md focus:outline-none w-1/2"
          />
          <button
            onClick={handleAddPlaylist}
            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
          >
            Add
          </button>
        </div>
      ) : (
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowInput(true)}
            className="px-5 py-2 bg-red-500 text-white rounded-lg flex items-center hover:bg-gray-600 shadow-md"
          >
            <PlusCircle className="mr-2" /> Create Playlist
          </button>
        </div>
      )}

      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {playlists.map((playlist, index) => {
            const fullSongs = playlist.songs.map(resolveSongDetails);

            return (
              <div
                key={playlist._id}
                className="bg-gray-900 p-4 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
                ref={index === playlists.length - 1 ? playlistEndRef : null}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => togglePlaylist(playlist._id)}
                >
                  <span className="text-lg font-semibold">{playlist.name}</span>
                  {openPlaylistId === playlist._id ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </div>

                {openPlaylistId === playlist._id && (
                  <>
                    <ul className="mt-3 space-y-2 text-sm text-gray-300 max-h-40 overflow-y-auto">
                      {fullSongs.length > 0 ? (
                        fullSongs.map((song, idx) => (
                          <li
                            key={song._id || idx}
                            className="p-2 bg-gray-800 rounded-md flex items-center cursor-pointer hover:bg-gray-700"
                            onClick={() => playSong(song, fullSongs)}
                          >
                            <Music className="text-gray-500 mr-2" />
                            {song.title} – {song.artist}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 italic">No songs yet</li>
                      )}
                    </ul>

                    <div className="mt-4">
                      <h4 className="text-sm text-gray-400 mb-2">Add Song to Playlist</h4>
                      <select
                        className="bg-gray-800 text-white px-4 py-2 rounded-md w-full"
                        onChange={(e) => {
                          handleAddSong(playlist._id, e.target.value);
                          e.target.value = "";
                        }}
                        value=""
                      >
                        <option value="" disabled>
                          Select a song
                        </option>
                        {songs.map((song) => (
                          <option
                            key={song._id}
                            value={song._id}
                            disabled={isSongInPlaylist(playlist, song._id)}
                          >
                            {song.title} – {song.artist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No playlists available</p>
      )}
    </div>
  );
};

export default Playlist;

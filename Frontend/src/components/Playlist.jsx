import { useState } from "react";
import { PlusCircle, Music, ChevronDown, ChevronUp } from "lucide-react";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [openPlaylistId, setOpenPlaylistId] = useState(null);

  const addPlaylist = () => {
    if (newPlaylistName.trim() === "") return;
    setPlaylists([
      ...playlists,
      { id: Date.now(), name: newPlaylistName, songs: ["Song One", "Song Two", "Song Three"] } // Dummy songs
    ]);
    setNewPlaylistName("");
    setShowInput(false); // Hide input after adding
  };

  const togglePlaylist = (id) => {
    setOpenPlaylistId(openPlaylistId === id ? null : id);
  };

  return (
    <div className="bg-black text-white p-6 min-h-screen w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Playlists</h2>

      {/* Playlist List */}
      {playlists.length > 0 ? (
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id} 
              className="bg-gray-900 p-4 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 cursor-pointer"
              onClick={() => togglePlaylist(playlist.id)}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{playlist.name}</span>
                {openPlaylistId === playlist.id ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </div>

              {/* Songs List - Expandable */}
              {openPlaylistId === playlist.id && (
                <ul className="mt-3 space-y-2 text-sm text-gray-300">
                  {playlist.songs.map((song, index) => (
                    <li key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                      <Music className="text-gray-500 mr-2" /> {song}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mb-6 text-center">No playlists available</p>
      )}

      {/* Show input when "Create Playlist" is clicked */}
      {showInput ? (
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="p-2 bg-gray-900 text-white rounded-l-md focus:outline-none w-1/2"
          />
          <button
            onClick={addPlaylist}
            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
          >
            Add
          </button>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowInput(true)}
            className="px-5 py-2 bg-red-500 text-white rounded-lg flex items-center hover:bg-gray-600 shadow-md"
          >
            <PlusCircle className="mr-2" /> Create Playlist
          </button>
        </div>
      )}
    </div>
  );
};

export default Playlist;

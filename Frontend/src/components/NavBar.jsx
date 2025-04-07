import React, { useState, useRef, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AudioPlayerContext } from '../context/AudioPlayerContext'; // ✅ Import context

const NavBar = ({ songs = [] }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  const searchRef = useRef(null);
  const { logout } = useAuth();
  const { playSong } = useContext(AudioPlayerContext); // ✅ Use context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const matches = songs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );

    setFilteredSongs(matches);
  };

  const handleSongClick = (song) => {
    playSong(song); // ✅ This actually plays the song
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className='w-full flex justify-between items-center font-semibold pb-5 relative text-white'>
      {/* Left Arrows */}
      <div className='flex items-center gap-2'>
        <img className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="Left Arrow" />
        <img className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="Right Arrow" />
      </div>

      {/* Right Side: Search + Logout */}
      <div className='flex items-center gap-4'>

        {/* Search Bar */}
        <div ref={searchRef} className='relative'>
          <div
            className='flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition-colors'
            onClick={() => setIsSearchOpen(true)}
          >
            {isSearchOpen ? (
              <div className="flex items-center gap-2 border-2 border-gray-600 rounded-lg px-3 py-1 w-80 bg-[#1e1e1e] shadow-lg">
                <input
                  type="text"
                  placeholder="Search songs..."
                  className="focus:outline-none w-full bg-transparent text-white placeholder-gray-400"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <img
                  className='w-6 cursor-pointer'
                  src={assets.search_icon}
                  alt="Search"
                />
              </div>
            ) : (
              <>
                <img className='w-6 cursor-pointer' src={assets.search_icon} alt="Search" />
                <p className='font-bold'>Search</p>
              </>
            )}
          </div>

          {/* 🔽 Dropdown */}
          {isSearchOpen && searchQuery && (
            <div className="absolute z-20 top-full left-0 w-80 mt-2 bg-[#1e1e1e] rounded-lg shadow-lg p-2 max-h-64 overflow-y-auto border border-gray-600">
              {filteredSongs.length > 0 ? (
                filteredSongs.map(song => (
                  <div
                    key={song._id}
                    onClick={() => handleSongClick(song)}
                    className="px-3 py-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer text-white"
                  >
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-gray-400">No songs found</p>
              )}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;

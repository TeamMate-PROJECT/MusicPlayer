import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';

const NavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold pb-5'>
        {/* Left Navigation Buttons */}
        <div className='flex items-center gap-2'>
          <img className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="Left Arrow" />
          <img className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="Right Arrow" />
        </div>

        {/* Search Bar and Logout Button */}
        <div className='flex items-center gap-4'>
          {/* Search Section */}
          <div 
            ref={searchRef}
            className='flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition-colors'
          >
            {isSearchOpen ? (
              <div className="flex items-center gap-2 border-4 border-gray-200 rounded-lg px-3 py-1 w-80">
                <input
                  type="text"
                  placeholder="Search songs..."
                  className="focus:outline-none w-full bg-transparent"
                  autoFocus
                />
                {/* Clickable Search Icon to Close */}
                <img 
                  className='w-6 cursor-pointer' 
                  src={assets.search_icon}  
                  alt="Search" 
                  onClick={() => setIsSearchOpen(false)}  
                />
              </div>
            ) : (
              <>
                {/* Search Icon to Open */}
                <img 
                  className='w-6 cursor-pointer' 
                  src={assets.search_icon}  
                  alt="Search" 
                  onClick={() => setIsSearchOpen(true)}  
                />
                <p className='font-bold' onClick={() => setIsSearchOpen(true)}>Search</p>
              </>
            )}
          </div>

          {/* Logout Button */}
          <button className='px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors'>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;

import React from 'react'
import { Home, PlaySquare, ListMusic, Heart, Music2, Smile, Cloud,Frown,Zap,Meh } from 'lucide-react';

const Sidebar = () => {
  return (
    <div>
      <div className="h-screen w-64 bg-black p-4 text-gray-300">
      {/* Logo Area */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">AuraMusic</h1>
      </div>

      {/* Main Navigation */}
      <div className="space-y-6">
        {/* Primary Navigation */}
        <div className="space-y-2">
          <button className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Home className="w-5 h-5 mr-3" />
            <span className="font-medium">Home</span>
          </button>
          <button className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <PlaySquare className="w-5 h-5 mr-3" />
            <span className="font-medium">Playlists</span>
          </button>
          <button className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <ListMusic className="w-5 h-5 mr-3" />
            <span className="font-medium">Library</span>
          </button>
        </div>

        {/* Mood Section */}
        <div>
          <h2 className="px-4 text-sm font-semibold text-gray-400 uppercase mb-2">Moods</h2>
          <div className="space-y-2">
            <button className="flex items-center w-full px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors">
              <Heart className="w-5 h-5 mr-3" />
              <span className="font-medium text-black">Romantic</span>
            </button>
            <button className="flex items-center w-full px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors">
              <Smile className="w-5 h-5 mr-3" />
              <span className="font-medium text-black">Happy</span>
            </button>
            <button className="flex items-center w-full px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors">
              <Music2 className="w-5 h-5 mr-3" />
              <span className="font-medium text-black">Party</span>
            </button>
            <button className="flex items-center w-full px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
              <Cloud className="w-5 h-5 mr-3" />
              <span className="font-medium text-black">Chill</span>
            </button>
            <button className="flex items-center w-full px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors">
  <Zap className="w-5 h-5 mr-3" />
  <span className="font-medium text-black">Energetic</span>
</button>

<button className="flex items-center w-full px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 transition-colors">
  <Frown className="w-5 h-5 mr-3" />
  <span className="font-medium text-white">Sad</span>
</button>
<button className="flex items-center w-full px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors">
  <Meh className="w-5 h-5 mr-3" />
  <span className="font-medium text-white">Emotional</span>
</button>



          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Sidebar

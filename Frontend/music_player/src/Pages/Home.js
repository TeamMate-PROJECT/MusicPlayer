import React from 'react';
import { Music, Search, User, PlayCircle, Heart, MoreHorizontal, Disc, Radio, Mic2 } from 'lucide-react';

const Home = () => {
  const featuredSongs = [
    { id: 1, title: "Electric Dreams", artist: "Neon Wave", genre: "Synthwave", plays: "1.2M" },
    { id: 2, title: "Midnight Rain", artist: "Luna Sky", genre: "Lo-fi", plays: "890K" },
    { id: 3, title: "Golden Hour", artist: "Solar Beats", genre: "Pop", plays: "2.1M" },
    { id: 4, title: "Ocean Mind", artist: "Deep Blue", genre: "Ambient", plays: "750K" }
  ];

  return (
    <div className="min-h-screen bg-indigo-950">
      {/* Side Header */}
      <header className="fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-blue-950 to-indigo-950 flex flex-col items-center py-6 border-r border-blue-900/50">
        <Music className="h-8 w-8 text-teal-400 mb-12" />
        
        <div className="flex flex-col items-center space-y-8 text-blue-300">
          <button className="p-3 rounded-xl bg-blue-900/50 text-teal-400">
            <Disc className="h-6 w-6" />
          </button>
          <button className="p-3 hover:text-teal-400 transition">
            <Radio className="h-6 w-6" />
          </button>
          <button className="p-3 hover:text-teal-400 transition">
            <Mic2 className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-auto">
          <button className="p-3 text-blue-300 hover:text-teal-400 transition">
            <User className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-20 p-8">
        {/* Top Search Bar */}
        <div className="flex items-center space-x-6 mb-12">
          <div className="flex items-center space-x-4 bg-blue-900/30 rounded-full px-4 py-2 flex-1 max-w-md">
            <Search className="h-5 w-5 text-blue-300" />
            <input 
              type="text" 
              placeholder="Search for songs, artists, or albums..."
              className="bg-transparent text-white placeholder-blue-300 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl p-8 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">Discover New Music</h1>
            <p className="text-blue-50 mb-6">Listen to the latest trending songs from your favorite artists</p>
            <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
              Start Listening
            </button>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Featured Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSongs.map((song) => (
              <div key={song.id} className="bg-blue-900/20 rounded-xl p-4 group hover:bg-blue-900/30 transition backdrop-blur-sm">
                <div className="aspect-square bg-blue-900/30 rounded-lg mb-4 relative group-hover:bg-blue-900/40 transition">
                  <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <PlayCircle className="h-12 w-12 text-teal-400" />
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium mb-1">{song.title}</h3>
                    <p className="text-blue-200">{song.artist}</p>
                    <span className="text-xs text-blue-300 mt-1 block">{song.genre}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-300 hover:text-teal-400 transition">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="text-blue-300 hover:text-teal-400 transition">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Pills */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">Browse Genres</h2>
          <div className="flex flex-wrap gap-3">
            {['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Indie'].map((genre) => (
              <button 
                key={genre}
                className="px-4 py-2 rounded-full bg-blue-900/20 text-blue-200 hover:bg-teal-500 hover:text-white transition backdrop-blur-sm"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
import React, { useContext, useEffect, useRef } from "react";
import { AudioPlayerContext } from "../context/AudioPlayerContext";
import { assets } from "../assets/assets";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    playSong,
    playNext,
    playPrevious,
    progress,
    duration,
    seekTo,
    volume,
    changeVolume,
  } = useContext(AudioPlayerContext);

  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current && duration) {
      progressRef.current.style.width = `${(progress / duration) * 100}%`;
    }
  }, [progress, duration]);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4 fixed bottom-0 w-full z-50">
      {/* Song Details */}
      <div className="hidden lg:flex items-center gap-4 w-[250px] overflow-hidden">
        {currentSong && (
          <>
            <img className="w-12 h-12 rounded-md object-cover" src={currentSong.imageUrl} alt="" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate w-[180px]">{currentSong.title}</p>
              <p className="text-gray-400 text-xs truncate w-[180px]">{currentSong.artist}</p>
            </div>
          </>
        )}
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4 items-center">
          
          <img className="w-4 cursor-pointer" src={assets.prev_icon} alt="Previous" onClick={playPrevious} />
          <img
            className="w-4 cursor-pointer"
            src={isPlaying ? assets.pause_icon : assets.play_icon}
            alt="Play/Pause"
            onClick={() => playSong(currentSong)}
          />
          <img className="w-4 cursor-pointer" src={assets.next_icon} alt="Next" onClick={playNext} />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-5 w-full px-4">
          <p className="text-xs">{formatTime(progress)}</p>
          <div
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer relative h-1"
            onClick={(e) => {
              const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
              seekTo(newTime);
            }}
          >
            <div ref={progressRef} className="absolute top-0 left-0 h-full bg-red-500 rounded-full"></div>
          </div>
          <p className="text-xs">{formatTime(duration)}</p>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => changeVolume(e.target.value)}
          className="w-20"
        />
      </div>
    </div>
  );
};

const formatTime = (time) =>
  time ? `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}` : "0:00";

export default Player;

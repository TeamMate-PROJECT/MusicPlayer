import { createContext, useState, useRef } from "react";

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio());

  // Function to Play Selected Song
  const playSong = (song) => {
    if (currentSong && currentSong.songUrl === song.songUrl) {
      // If the same song is clicked, toggle play/pause
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Play a new song
      if (audioRef.current) {
        audioRef.current.pause(); // Stop previous song
      }
      audioRef.current = new Audio(song.songUrl);
      audioRef.current.volume = volume;
      audioRef.current.play();
      setCurrentSong(song);
      setIsPlaying(true);

      // Get song duration
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      // Track progress
      audioRef.current.ontimeupdate = () => {
        setProgress(audioRef.current.currentTime);
      };

      // Handle when song ends
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setProgress(0);
      };
    }
  };

  // Seek function
  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  // Volume control
  const changeVolume = (vol) => {
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong, // ✅ Add this function
        progress,
        duration,
        seekTo,
        volume,
        changeVolume,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

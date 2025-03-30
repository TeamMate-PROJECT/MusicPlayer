import React, { createContext, useState, useRef, useEffect } from "react";

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  useEffect(() => {
    const updateProgress = () => setProgress(audioRef.current.currentTime);
    const setAudioDuration = () => setDuration(audioRef.current.duration);
    
    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  const playSong = (song) => {
    if (currentSong?._id === song._id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
    }
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const changeVolume = (value) => {
    setVolume(value);
    audioRef.current.volume = value;
  };

  return (
    <AudioPlayerContext.Provider value={{ currentSong, isPlaying, playSong, progress, duration, seekTo, volume, changeVolume }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

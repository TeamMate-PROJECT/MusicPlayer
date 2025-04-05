import React, { createContext, useState, useRef, useEffect } from "react";

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [songsList, setSongsList] = useState([]); // Store song list
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [loop, setLoop] = useState(false);
  const audioRef = useRef(new Audio());

  // Update audio source when song changes
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.songUrl;
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback error:", err));
    }
  }, [currentSong]);

  // Track progress and duration
  useEffect(() => {
    const updateProgress = () => setProgress(audioRef.current.currentTime);
    const setAudioDuration = () => setDuration(audioRef.current.duration);

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("loadedmetadata", setAudioDuration);
    audioRef.current.volume = volume;

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  // Play or pause song
  const playSong = (song, list = []) => {
    if (list.length) setSongsList(list); // Ensure song list is set

    if (currentSong?._id === song._id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setTimeout(() => audioRef.current.play(), 100);
    }
  };

  // Play next song
  const playNext = () => {
    if (songsList.length === 0 || !currentSong) return;

    const currentIndex = songsList.findIndex((s) => s._id === currentSong._id);
    const nextIndex = (currentIndex + 1) % songsList.length;
    playSong(songsList[nextIndex], songsList);
  };

  // Play previous song
  const playPrevious = () => {
    if (songsList.length === 0 || !currentSong) return;

    const currentIndex = songsList.findIndex((s) => s._id === currentSong._id);
    const prevIndex = (currentIndex - 1 + songsList.length) % songsList.length;
    playSong(songsList[prevIndex], songsList);
  };

  // Toggle loop
  const toggleLoop = () => {
    setLoop(!loop);
    audioRef.current.loop = !loop;
  };

  // Seek functionality
  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // Volume control
  const changeVolume = (value) => {
    setVolume(value);
    audioRef.current.volume = value;
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        playNext,
        playPrevious,
        toggleLoop,
        progress,
        duration,
        seekTo,
        volume,
        changeVolume,
        loop,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

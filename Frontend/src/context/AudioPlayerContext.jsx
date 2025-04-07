import React, { createContext, useState, useEffect, useRef } from "react";

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [songQueue, setSongQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const playSong = (song, queue = []) => {
    if (!song?.songUrl) {
      console.error("No audio URL found for the selected song:", song);
      return;
    }

    if (currentSong?._id === song._id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    if (queue.length > 0) {
      setSongQueue(queue);
      const index = queue.findIndex((s) => s._id === song._id);
      setCurrentIndex(index);
    }

    setCurrentSong(song);
    audioRef.current.src = song.songUrl;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.error("Playback error:", err);
    });
  };

  const playNext = () => {
    if (songQueue.length > 0 && currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % songQueue.length;
      const nextSong = songQueue[nextIndex];

      if (!nextSong?.songUrl) {
        console.error("Next song has no audio URL:", nextSong);
        return;
      }

      setCurrentIndex(nextIndex);
      setCurrentSong(nextSong);
      audioRef.current.src = nextSong.songUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (songQueue.length > 0 && currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + songQueue.length) % songQueue.length;
      const prevSong = songQueue[prevIndex];

      if (!prevSong?.songUrl) {
        console.error("Previous song has no audio URL:", prevSong);
        return;
      }

      setCurrentIndex(prevIndex);
      setCurrentSong(prevSong);
      audioRef.current.src = prevSong.songUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeVolume = (val) => {
    setVolume(val);
    audioRef.current.volume = val;
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      playNext();
    };

    const handleError = (e) => {
      console.error("Audio playback error:", e);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentIndex, songQueue]);

  return (
    <AudioPlayerContext.Provider
      value={{
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
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

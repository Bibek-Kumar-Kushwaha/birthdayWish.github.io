import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import birthdayMusic from "../assets/Birthday.mp3";

const MusicPlayer = ({ isPlaying, setIsPlaying, volume, setVolume, autoPlay = true }) => {
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set up event listeners
      const handleCanPlayThrough = () => {
        setIsLoaded(true);
        setError(false);
        
        // Auto-play after load if enabled and user has interacted
        if (autoPlay && hasInteracted) {
          setIsPlaying(true);
        }
      };
      const handleDurationChange = () => setDuration(audio.duration || 0);
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
      const handleEnded = () => {
        // Loop the music
        audio.currentTime = 0;
        if (isPlaying) {
          audio.play().catch(console.error);
        }
      };
      const handleError = () => {
        setError(true);
        setIsLoaded(false);
      };

      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('durationchange', handleDurationChange);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      // Set initial volume
      audio.volume = volume;

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('durationchange', handleDurationChange);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [volume, setIsPlaying, autoPlay, hasInteracted]);

  // Enable user interaction detection
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      // Try to start music if autoPlay is enabled
      if (autoPlay && isLoaded && !isPlaying) {
        setIsPlaying(true);
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [autoPlay, isLoaded, isPlaying, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isLoaded && !error) {
      if (isPlaying) {
        audio.play().catch((err) => {
          console.error("Error playing audio:", err);
          setError(true);
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, isLoaded, error]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (isLoaded && !error) {
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={birthdayMusic}
      />

      {/* Play/Pause Button */}
      <motion.button
        onClick={togglePlayPause}
        disabled={!isLoaded || error}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
          isLoaded && !error
            ? "bg-yellow-400 text-purple-800 hover:bg-yellow-300 shadow-lg" 
            : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
        whileHover={isLoaded && !error ? { scale: 1.1 } : {}}
        whileTap={isLoaded && !error ? { scale: 0.95 } : {}}
      >
        <motion.span
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          {error ? "❌" : isPlaying ? "⏸️" : "▶️"}
        </motion.span>
      </motion.button>

      {/* Music Info */}
      <div className="flex flex-col min-w-0">
        <div className="text-white text-sm font-semibold flex items-center gap-2">
          <motion.span
            animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          >
            🎵
          </motion.span>
          {error ? "Music Error" : "Birthday Song"}
        </div>
        {isLoaded && !error && duration > 0 && (
          <div className="text-white/70 text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        )}
        {!isLoaded && !error && (
          <div className="text-white/70 text-xs">Loading...</div>
        )}
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 ml-2">
        <span className="text-white text-lg">🔊</span>
        <motion.input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #FCD34D 0%, #FCD34D ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
          }}
          whileHover={{ scale: 1.05 }}
        />
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #FCD34D;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #FCD34D;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
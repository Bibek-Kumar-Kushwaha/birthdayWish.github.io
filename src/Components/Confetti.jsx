import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Confetti = ({ isActive, intensity = 'medium' }) => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  const intensitySettings = {
    low: { count: 40, interval: 200 },
    medium: { count: 80, interval: 100 },
    high: { count: 150, interval: 50 }
  };

  const currentSettings = intensitySettings[intensity] || intensitySettings.medium;

  useEffect(() => {
    if (!isActive) {
      setConfettiPieces([]);
      return;
    }

    const confettiEmojis = ['🎉', '🎊', '⭐', '✨', '🎂', '🎁', '💖', '🌟', '🎈', '🎵', '💕', '🌈'];
    const colors = ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF4500', '#9370DB', '#FF1493', '#00FF7F'];

    let confettiId = 0;
    const interval = setInterval(() => {
      const newConfetti = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, () => ({
        id: confettiId++,
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        initialX: Math.random() * 100,
        initialY: -10,
        rotation: Math.random() * 360,
        size: 0.8 + Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 100,
        duration: 3 + Math.random() * 2
      }));

      setConfettiPieces(prev => [...prev, ...newConfetti]);

      // Remove old confetti after animation
      setTimeout(() => {
        setConfettiPieces(prev => prev.filter(piece => 
          !newConfetti.some(newPiece => newPiece.id === piece.id)
        ));
      }, 6000);
    }, currentSettings.interval);

    return () => clearInterval(interval);
  }, [isActive, intensity]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.initialX}%`,
              top: `${piece.initialY}%`,
              fontSize: `${piece.size}rem`,
              color: piece.color,
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
            }}
            initial={{ 
              y: -100, 
              rotate: piece.rotation,
              scale: 0,
              opacity: 0 
            }}
            animate={{ 
              y: window.innerHeight + 100,
              rotate: piece.rotation + 720,
              x: piece.drift,
              scale: [0, 1, 1, 0.8],
              opacity: [0, 1, 1, 0]
            }}
            exit={{ 
              scale: 0,
              opacity: 0 
            }}
            transition={{
              duration: piece.duration,
              ease: "easeIn",
              times: [0, 0.1, 0.8, 1]
            }}
          >
            {piece.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Additional sparkle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '0.5rem'
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Confetti;
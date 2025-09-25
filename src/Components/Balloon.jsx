import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Balloon = ({ id, color, onPop, delay = 0 }) => {
  const [isPopped, setIsPopped] = useState(false);
  const [position] = useState({
    left: Math.random() * 85,
    startY: 100 + Math.random() * 20
  });

  const handlePop = () => {
    if (isPopped) return;
    setIsPopped(true);
    onPop(id, position);
  };

  const balloonEmojis = ['🎈', '🎪', '🎊', '🎁'];
  const balloonEmoji = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];

  return (
    <AnimatePresence>
      {!isPopped && (
        <motion.div
          className="text-5xl cursor-pointer absolute select-none z-10"
          style={{
            left: `${position.left}%`,
            color: color,
            filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.1))',
          }}
          initial={{ 
            y: position.startY,
            scale: 0,
            opacity: 0,
            rotate: -10 
          }}
          animate={{ 
            y: -250,
            scale: 1,
            opacity: 1,
            rotate: 0,
            x: [0, Math.sin(Date.now() * 0.001 + id) * 30, 0],
          }}
          exit={{
            scale: 0,
            opacity: 0,
            rotate: 180,
            transition: { duration: 0.3 }
          }}
          transition={{
            y: {
              duration: 12 + Math.random() * 6,
              ease: "linear",
              delay: delay
            },
            scale: {
              duration: 0.5,
              delay: delay,
              ease: "backOut"
            },
            opacity: {
              duration: 0.3,
              delay: delay
            },
            rotate: {
              duration: 0.5,
              delay: delay,
              ease: "backOut"
            },
            x: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{ 
            scale: 1.3,
            rotate: [0, -5, 5, -5, 0],
            transition: { 
              scale: { duration: 0.2 },
              rotate: { duration: 0.5, repeat: Infinity }
            }
          }}
          whileTap={{ 
            scale: 0.8,
            rotate: 0,
            transition: { duration: 0.1 }
          }}
          onClick={handlePop}
        >
          <motion.span
            animate={{
              textShadow: [
                `0 0 10px ${color}40`,
                `0 0 20px ${color}60`,
                `0 0 10px ${color}40`
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {balloonEmoji}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Particle explosion effect when balloon pops
const PopEffect = ({ position, color }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360,
    distance: 50 + Math.random() * 30,
    emoji: ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div 
      className="absolute pointer-events-none z-20"
      style={{ 
        left: `${position.left}%`, 
        top: `${position.top}px` 
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl"
          initial={{ 
            scale: 0,
            x: 0,
            y: 0,
            opacity: 1
          }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos(particle.angle * Math.PI / 180) * particle.distance,
            y: Math.sin(particle.angle * Math.PI / 180) * particle.distance,
            opacity: [1, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
          style={{ color: color }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default Balloon;
export { PopEffect };
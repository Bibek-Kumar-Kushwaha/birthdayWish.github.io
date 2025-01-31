import React, { useState } from "react";
import { motion } from "framer-motion";
import ParticleEffect from "./ParticleEffect";

const Balloons = ({ balloonColor }) => {
  const [balloons, setBalloons] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }))
  );

  const handleBalloonClick = (id) => {
    setBalloons(balloons.filter((balloon) => balloon.id !== id));
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="w-12 h-16 rounded-full cursor-pointer"
          style={{
            backgroundColor: balloonColor || `hsl(${Math.random() * 360}, 70%, 60%)`,
            position: "absolute",
            left: balloon.x,
            top: balloon.y,
          }}
          animate={{ y: [balloon.y, -100] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          onClick={() => handleBalloonClick(balloon.id)}
        >
          <ParticleEffect />
        </motion.div>
      ))}
    </div>
  );
};

export default Balloons;

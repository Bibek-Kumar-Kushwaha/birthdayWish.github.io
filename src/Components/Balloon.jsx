import React, { useState } from "react";
import { motion } from "framer-motion";

const Balloon = ({ color, onPop }) => {
  const [isPopped, setIsPopped] = useState(false);

  const handlePop = () => {
    setIsPopped(true);
    onPop();
  };

  return (
    <motion.div
      className="text-4xl cursor-pointer absolute"
      style={{
        opacity: isPopped ? 0 : 1,
        color: color,
        left: `${Math.random() * 100}vw`, // Random horizontal position
        bottom: `${Math.random() * 100}vh`, // Random vertical position
      }}
      whileHover={{ scale: 1.2 }}
      onClick={handlePop}
      animate={{
        y: [0, -1000],
        x: [0, Math.random() * 200 - 100], // Random horizontal movement
        rotate: [0, Math.random() * 360], // Random rotation
      }}
      transition={{
        y: {
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        },
        x: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      🎈
    </motion.div>
  );
};

export default Balloon;
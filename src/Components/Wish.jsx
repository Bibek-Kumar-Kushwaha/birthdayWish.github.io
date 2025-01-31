import React, { useEffect, useState } from "react";
import Balloon from "./Balloon";
import Confetti from "react-confetti";
import useSound from "use-sound";
import birthdaySong from "../assets/Birthday.mp3";
import { motion } from "framer-motion";

const Wish = ({ name, message }) => {
  const [play] = useSound(birthdaySong, { loop: true }); // Loop the song
  const [balloons, setBalloons] = useState([]);
  const [blastParticles, setBlastParticles] = useState([]);

  useEffect(() => {
    play(); // Play the birthday song
    const balloonColors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const newBalloons = Array(30)
      .fill()
      .map((_, i) => ({
        id: i,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      }));
    setBalloons(newBalloons);
  }, [play]);

  const handlePop = (id) => {
    setBalloons((prev) => prev.filter((balloon) => balloon.id !== id));
    const newParticles = Array(20).fill().map((_, i) => ({
      id: `${id}-${i}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: balloons.find((b) => b.id === id)?.color || "red",
    }));
    setBlastParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setBlastParticles((prev) => prev.filter((particle) => !particle.id.startsWith(`${id}-`)));
    }, 1000);
  };

  const handleDownloadHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Birthday Wish for ${name}</title>
        <style>
          body {
            margin: 0;
            overflow: hidden;
            background: linear-gradient(to right, #ec4899, #8b5cf6);
            font-family: Arial, sans-serif;
            color: white;
            text-align: center;
          }
          h1 {
            font-size: 3rem;
            margin-top: 20vh;
          }
          p {
            font-size: 1.5rem;
          }
          .balloon {
            font-size: 2rem;
            position: absolute;
            cursor: pointer;
            animation: float 5s infinite ease-in-out;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .particle {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: explode 1s ease-out;
          }
          @keyframes explode {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #ff0;
            animation: confetti-fall 5s linear infinite;
          }
          @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <h1>Happy Birthday, ${name}!</h1>
        <p>${message}</p>
        <div id="balloons-container"></div>
        <div id="confetti-container"></div>
        <audio id="birthday-song" autoplay loop>
          <source src="https://res.cloudinary.com/dvdpsq91h/video/upload/v1738333668/Birthday_rcwlqv.mp3" type="audio/mp3">
        </audio>
        <script>
          // Balloon data
          const balloonColors = ["red", "blue", "green", "yellow", "purple", "orange"];
          const balloons = Array(30).fill().map((_, i) => ({
            id: i,
            color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
            left: Math.random() * 100 + "vw",
            bottom: Math.random() * 100 + "vh",
          }));

          // Add balloons to the page
          const balloonsContainer = document.getElementById("balloons-container");
          balloons.forEach(balloon => {
            const balloonElement = document.createElement("div");
            balloonElement.className = "balloon";
            balloonElement.style.color = balloon.color;
            balloonElement.style.left = balloon.left;
            balloonElement.style.bottom = balloon.bottom;
            balloonElement.innerHTML = "🎈";
            balloonElement.addEventListener("click", () => {
              balloonElement.remove();
              createParticles(balloonElement.getBoundingClientRect());
            });
            balloonsContainer.appendChild(balloonElement);
          });

          // Create particles on balloon pop
          function createParticles(rect) {
            const particlesContainer = document.getElementById("confetti-container");
            for (let i = 0; i < 20; i++) {
              const particle = document.createElement("div");
              particle.className = "particle";
              particle.style.left = rect.left + "px";
              particle.style.top = rect.top + "px";
              particle.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
              particlesContainer.appendChild(particle);
              setTimeout(() => particle.remove(), 1000);
            }
          }

          // Add confetti
          setInterval(() => {
            const confettiContainer = document.getElementById("confetti-container");
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = Math.random() * 100 + "vw";
            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
          }, 100);
        </script>
      </body>
      </html>
    `;

    // Create a Blob containing the HTML content
    const blob = new Blob([htmlContent], { type: "text/html" });

    // Create a link to download the Blob
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `birthday-wish-${name}.html`;
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 wish-container">
      <Confetti />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Happy Birthday, {name}!</h1>
        <p className="text-xl md:text-2xl text-white mt-4 text-center">{message}</p>
        <div className="mt-8 space-x-4">
          <button
            onClick={handleDownloadHTML}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Download
          </button>
        </div>
      </div>
      {balloons.map((balloon) => (
        <Balloon key={balloon.id} color={balloon.color} onPop={() => handlePop(balloon.id)} />
      ))}
      {blastParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            scale: [1, 2, 0],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default Wish;
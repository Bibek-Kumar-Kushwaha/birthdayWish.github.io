import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DownloadButton = ({ userData, musicUrl = "/src/assets/Birthday.mp3" }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Convert audio file to base64 for embedding
  const convertAudioToBase64 = async (audioUrl) => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting audio to base64:', error);
      return null;
    }
  };

  const generateHTMLWithMusic = async () => {
    // Get base64 audio data
    const audioBase64 = await convertAudioToBase64(musicUrl);
    const audioData = audioBase64 || '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🎉 Happy Birthday ${userData?.name || 'Special Person'}! 🎉</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Poppins', sans-serif;
      overflow: hidden;
      background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
      color: white;
      text-align: center;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      cursor: pointer;
    }
    
    .wish-card {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(20px);
      border-radius: 30px;
      padding: 40px 30px;
      margin: 20px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      max-width: 90%;
      animation: cardFloat 8s ease-in-out infinite;
      z-index: 10;
    }
    
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-20px) scale(1.02); }
    }
    
    .birthday-title {
      font-size: clamp(2rem, 8vw, 4rem);
      font-weight: 800;
      margin-bottom: 20px;
      background: linear-gradient(45deg, #FFD700, #FF69B4, #00CED1, #32CD32);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 4s ease infinite;
      text-shadow: 0 0 20px rgba(0,0,0,0.3);
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
    }
    
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      25% { background-position: 100% 50%; }
      50% { background-position: 100% 100%; }
      75% { background-position: 0% 100%; }
    }
    
    .birthday-name {
      font-size: clamp(1.5rem, 6vw, 3rem);
      font-weight: 700;
      margin: 20px 0;
      color: #FFD700;
      text-shadow: 0 0 20px rgba(0,0,0,0.3);
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
    }
    
    .birthday-message {
      font-size: clamp(1rem, 4vw, 1.4rem);
      margin: 30px 0;
      opacity: 0.95;
      line-height: 1.6;
      text-shadow: 0 0 15px rgba(0,0,0,0.3);
      filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.3));
      max-width: 600px;
    }
    
    .age-display {
      font-size: clamp(2rem, 10vw, 6rem);
      font-weight: 800;
      margin: 30px 0;
      color: #FFD700;
      text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
      filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.3));
      animation: ageGlow 3s ease-in-out infinite;
    }
    
    @keyframes ageGlow {
      0%, 100% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4); }
      50% { text-shadow: 0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 215, 0, 0.6); }
    }
    
    .music-controls {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }
    
    .music-button {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50px;
      color: white;
      padding: 15px 20px;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
    
    .music-button:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    }
    
    .click-to-start {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(20px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 20px;
      padding: 30px 40px;
      font-size: 1.4rem;
      color: white;
      z-index: 1001;
      animation: pulseGlow 2s ease-in-out infinite;
    }
    
    @keyframes pulseGlow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%) scale(1);
      }
      50% { 
        box-shadow: 0 0 40px rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%) scale(1.02);
      }
    }
    
    .balloon {
      position: absolute;
      width: 60px;
      height: 80px;
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      animation: floatUp 15s linear infinite;
      z-index: 1;
    }
    
    @keyframes floatUp {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .balloon:nth-child(1) { left: 10%; background: #FF69B4; animation-delay: 0s; }
    .balloon:nth-child(2) { left: 20%; background: #FFD700; animation-delay: 2s; }
    .balloon:nth-child(3) { left: 30%; background: #00CED1; animation-delay: 4s; }
    .balloon:nth-child(4) { left: 40%; background: #32CD32; animation-delay: 6s; }
    .balloon:nth-child(5) { left: 50%; background: #FF4500; animation-delay: 8s; }
    .balloon:nth-child(6) { left: 60%; background: #DA70D6; animation-delay: 10s; }
    .balloon:nth-child(7) { left: 70%; background: #FFA500; animation-delay: 12s; }
    .balloon:nth-child(8) { left: 80%; background: #87CEEB; animation-delay: 14s; }
    .balloon:nth-child(9) { left: 90%; background: #FFB6C1; animation-delay: 16s; }
    
    .particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 2;
    }
    
    .particle {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #FFD700;
      border-radius: 50%;
      animation: sparkle 4s ease-in-out infinite;
    }
    
    @keyframes sparkle {
      0%, 100% {
        opacity: 0;
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        opacity: 1;
        transform: translateY(-50px) rotate(180deg);
      }
    }
    
    @media (max-width: 768px) {
      .wish-card {
        padding: 30px 20px;
        margin: 10px;
        border-radius: 20px;
      }
      
      .balloon {
        width: 40px;
        height: 60px;
      }
      
      .music-controls {
        top: 10px;
        right: 10px;
      }
      
      .music-button {
        padding: 10px 15px;
        font-size: 1rem;
      }
    }
  </style>
</head>
<body onclick="startExperience()">
  <!-- Click to Start Overlay -->
  <div id="clickOverlay" class="click-to-start">
    🎵 Click anywhere to start the birthday celebration! 🎉
  </div>

  <!-- Music Controls -->
  <div class="music-controls">
    <button id="musicToggle" class="music-button">🎵 Music</button>
  </div>

  <!-- Background Balloons -->
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>

  <!-- Particles -->
  <div class="particles" id="particles"></div>

  <!-- Main Content -->
  <div class="wish-card">
    <h1 class="birthday-title">🎉 HAPPY BIRTHDAY! 🎉</h1>
    <h2 class="birthday-name">${userData?.name || 'Special Person'}</h2>
    ${userData?.age ? `<div class="age-display">${userData.age}</div>` : ''}
    <p class="birthday-message">${userData?.message || 'Wishing you a day filled with happiness and a year filled with joy! 🎈🎂'}</p>
  </div>

  <!-- Audio Element -->
  ${audioData ? `<audio id="birthdayMusic" loop preload="auto">
    <source src="${audioData}" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>` : ''}

  <script>
    let musicPlaying = false;
    let hasStarted = false;
    const music = document.getElementById('birthdayMusic');
    const musicToggle = document.getElementById('musicToggle');
    const clickOverlay = document.getElementById('clickOverlay');

    // Create particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.background = ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF4500'][Math.floor(Math.random() * 5)];
        particlesContainer.appendChild(particle);
      }
    }

    // Start the experience
    function startExperience() {
      if (!hasStarted) {
        hasStarted = true;
        clickOverlay.style.display = 'none';
        
        // Start music if available
        if (music) {
          music.play().then(() => {
            musicPlaying = true;
            musicToggle.textContent = '🎵 Pause';
          }).catch(e => {
            console.log('Music autoplay blocked:', e);
          });
        }
        
        // Create particles
        createParticles();
        
        // Add more balloons periodically
        setInterval(() => {
          const balloon = document.createElement('div');
          balloon.className = 'balloon';
          balloon.style.left = Math.random() * 90 + '%';
          balloon.style.background = ['#FF69B4', '#FFD700', '#00CED1', '#32CD32', '#FF4500', '#DA70D6', '#FFA500', '#87CEEB', '#FFB6C1'][Math.floor(Math.random() * 9)];
          document.body.appendChild(balloon);
          
          // Remove balloon after animation
          setTimeout(() => {
            if (balloon.parentNode) {
              balloon.parentNode.removeChild(balloon);
            }
          }, 15000);
        }, 2000);
      }
    }

    // Music toggle functionality
    if (musicToggle && music) {
      musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (musicPlaying) {
          music.pause();
          musicToggle.textContent = '🎵 Play';
          musicPlaying = false;
        } else {
          music.play().then(() => {
            musicToggle.textContent = '🎵 Pause';
            musicPlaying = true;
          }).catch(e => {
            console.log('Could not play music:', e);
          });
        }
      });
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (!hasStarted) {
          startExperience();
        } else if (music) {
          if (musicPlaying) {
            music.pause();
            musicToggle.textContent = '🎵 Play';
            musicPlaying = false;
          } else {
            music.play().then(() => {
              musicToggle.textContent = '🎵 Pause';
              musicPlaying = true;
            }).catch(e => {
              console.log('Could not play music:', e);
            });
          }
        }
      }
    });

    // Auto-start after 3 seconds if no interaction
    setTimeout(() => {
      if (!hasStarted) {
        startExperience();
      }
    }, 3000);
  </script>
</body>
</html>`;
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      const htmlContent = await generateHTMLWithMusic();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `birthday-wish-${userData?.name || 'special-person'}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating download:', error);
      alert('Error generating download. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isGenerating}
      className="relative group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-3">
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Generating with Music...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download with Music</span>
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </>
        )}
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
      
      {/* Success Animation */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-green-400 opacity-0"
        animate={isGenerating ? {} : { opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
    </motion.button>
  );
};

export default DownloadButton;
import React, { useState } from "react";
import { motion } from "framer-motion";

const EnhancedDownloadButton = ({ userData, musicUrl }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEngagingHTML = () => {
    const name = userData?.name || "Special Person";
    const message = userData?.message || "Wishing you a day filled with happiness and joy!";
    const sender = userData?.sender || "";
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎉 Happy Birthday ${name}! 🎉</title>
    <meta property="og:title" content="🎉 Happy Birthday ${name}! 🎉">
    <meta property="og:description" content="${message}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="🎉 Happy Birthday ${name}! 🎉">
    <meta name="twitter:description" content="${message}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }
        
        .background-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .particle {
            position: absolute;
            font-size: 2rem;
            opacity: 0.7;
            animation: float 15s infinite linear;
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .confetti {
            position: absolute;
            font-size: 1.5rem;
            animation: confetti 3s infinite ease-out;
        }
        
        @keyframes confetti {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(300px) rotate(720deg) scale(0);
                opacity: 0;
            }
        }
        
        .container {
            position: relative;
            z-index: 10;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            text-align: center;
        }
        
        .birthday-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            padding: 3rem;
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 600px;
            width: 100%;
            animation: slideIn 1s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .title {
            font-size: 4rem;
            font-weight: bold;
            color: white;
            margin-bottom: 1rem;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
            animation: pulse 3s infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
            }
            50% {
                text-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
            }
        }
        
        .name {
            font-size: 2.5rem;
            font-weight: bold;
            color: #FFD700;
            margin-bottom: 2rem;
            animation: glow 2s infinite alternate;
        }
        
        @keyframes glow {
            from {
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }
            to {
                text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
            }
        }
        
        .message {
            font-size: 1.3rem;
            color: white;
            line-height: 1.6;
            margin-bottom: 2rem;
            font-style: italic;
        }
        
        .sender {
            font-size: 1.1rem;
            color: #FFD700;
            font-weight: 600;
        }
        
        .music-control {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 50;
        }
        
        .play-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255, 212, 77, 0.9);
            border: none;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .play-button:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .balloon {
            position: fixed;
            font-size: 3rem;
            cursor: pointer;
            z-index: 20;
            transition: transform 0.3s ease;
            animation: sway 6s infinite ease-in-out;
        }
        
        .balloon:hover {
            transform: scale(1.2) rotate(-10deg);
        }
        
        @keyframes sway {
            0%, 100% {
                transform: translateX(0) rotate(0deg);
            }
            50% {
                transform: translateX(20px) rotate(5deg);
            }
        }
        
        .sparkle {
            position: absolute;
            font-size: 1.5rem;
            animation: sparkle 2s infinite;
        }
        
        @keyframes sparkle {
            0%, 100% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
        }
        
        @media (max-width: 768px) {
            .title {
                font-size: 2.5rem;
            }
            .name {
                font-size: 2rem;
            }
            .message {
                font-size: 1.1rem;
            }
            .birthday-card {
                padding: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Background Animation -->
    <div class="background-animation" id="backgroundAnimation"></div>
    
    <!-- Main Content -->
    <div class="container">
        <div class="birthday-card">
            <h1 class="title">🎉 Happy Birthday! 🎉</h1>
            <h2 class="name">${name} 🎂</h2>
            <p class="message">"${message}"</p>
            ${sender ? `<p class="sender">- ${sender} 💝</p>` : ''}
        </div>
    </div>
    
    <!-- Music Control -->
    <div class="music-control">
        <button class="play-button" id="musicButton" onclick="toggleMusic()">
            🎵
        </button>
    </div>
    
    <!-- Floating Balloons -->
    <div class="balloon" style="top: 10%; left: 5%;" onclick="popBalloon(this)">🎈</div>
    <div class="balloon" style="top: 20%; right: 10%;" onclick="popBalloon(this)">🎈</div>
    <div class="balloon" style="bottom: 30%; left: 8%;" onclick="popBalloon(this)">🎈</div>
    <div class="balloon" style="bottom: 15%; right: 15%;" onclick="popBalloon(this)">🎈</div>
    
    <!-- Hidden Audio -->
    <audio id="birthdayMusic" loop>
        <source src="data:audio/mpeg;base64,SUQzAwAAAAAJVFNTRQAAAA8AAANMYXZmNTcuNzEuMTAwAP/7kGQOAAAGkAAAADygBMAAAJQAAAASvAABLoBiLwAABIAAAABGACAAAAAAAP/7kGQOgAABpAAAABVQAAaHAAAAJQQbAAAADwAAAJYQAAG8AAAITQAA=" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    
    <script>
        // Music Control
        let isPlaying = false;
        const audio = document.getElementById('birthdayMusic');
        const musicButton = document.getElementById('musicButton');
        
        function toggleMusic() {
            if (isPlaying) {
                audio.pause();
                musicButton.textContent = '🔇';
                musicButton.style.background = 'rgba(200, 200, 200, 0.9)';
            } else {
                audio.play().catch(e => console.log('Audio play failed:', e));
                musicButton.textContent = '🎵';
                musicButton.style.background = 'rgba(255, 212, 77, 0.9)';
            }
            isPlaying = !isPlaying;
        }
        
        // Auto-start music (with user interaction)
        document.addEventListener('click', function() {
            if (!isPlaying) {
                toggleMusic();
            }
        }, { once: true });
        
        // Balloon Pop Effect
        function popBalloon(balloon) {
            // Create explosion effect
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.textContent = '✨';
                    sparkle.style.left = balloon.offsetLeft + 'px';
                    sparkle.style.top = balloon.offsetTop + 'px';
                    document.body.appendChild(sparkle);
                    
                    // Remove sparkle after animation
                    setTimeout(() => {
                        if (sparkle.parentNode) {
                            sparkle.parentNode.removeChild(sparkle);
                        }
                    }, 2000);
                }, i * 100);
            }
            
            // Remove balloon
            balloon.style.animation = 'none';
            balloon.style.transform = 'scale(0)';
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
            }, 300);
        }
        
        // Create Background Particles
        function createBackgroundParticles() {
            const particles = ['🎂', '🎉', '🎊', '✨', '💖', '🎁', '🌟', '🎈'];
            const backgroundAnimation = document.getElementById('backgroundAnimation');
            
            setInterval(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (10 + Math.random() * 10) + 's';
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                backgroundAnimation.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 25000);
            }, 1000);
        }
        
        // Create Confetti Effect
        function createConfetti() {
            const confettiEmojis = ['🎊', '🎉', '✨', '🌟', '💫'];
            
            setInterval(() => {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const confetti = document.createElement('div');
                        confetti.className = 'confetti';
                        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
                        confetti.style.left = Math.random() * 100 + '%';
                        confetti.style.top = '0px';
                        confetti.style.animationDelay = Math.random() * 1 + 's';
                        
                        document.body.appendChild(confetti);
                        
                        // Remove confetti after animation
                        setTimeout(() => {
                            if (confetti.parentNode) {
                                confetti.parentNode.removeChild(confetti);
                            }
                        }, 3000);
                    }, i * 200);
                }
            }, 3000);
        }
        
        // Initialize animations
        window.addEventListener('load', () => {
            createBackgroundParticles();
            createConfetti();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                toggleMusic();
            }
        });
    </script>
</body>
</html>`;
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      const htmlContent = generateEngagingHTML();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `birthday-wish-${userData?.name || 'special-person'}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show success message
      setTimeout(() => {
        alert('🎉 Birthday wish downloaded successfully! Share this magical HTML file with anyone!');
      }, 500);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Sorry, there was an error generating the download. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`px-6 py-3 rounded-full font-bold text-white transition-all duration-300 shadow-lg border border-white/30 ${
        isGenerating
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
      }`}
      whileHover={!isGenerating ? { 
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(255,255,255,0.3)'
      } : {}}
      whileTap={!isGenerating ? { scale: 0.95 } : {}}
    >
      {isGenerating ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          ⏳
        </motion.span>
      ) : (
        "💾"
      )}
      <span className="ml-2">
        {isGenerating ? "Creating Magic..." : "Download Birthday Page"}
      </span>
    </motion.button>
  );
};

export default EnhancedDownloadButton;
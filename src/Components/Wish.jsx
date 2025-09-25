import React, { useState, useEffect, useRef } from "react";
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
    onPop(id);
  };

  if (isPopped) return null;

  return (
    <motion.div
      className="text-5xl cursor-pointer absolute select-none z-10"
      style={{
        left: `${position.left}%`,
        color: color,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
      }}
      initial={{ 
        y: position.startY,
        scale: 0.8,
        opacity: 0 
      }}
      animate={{ 
        y: -200,
        scale: 1,
        opacity: 1,
        x: [0, Math.sin(Date.now() * 0.001 + id) * 20],
        rotate: [0, Math.sin(Date.now() * 0.002 + id) * 10]
      }}
      transition={{
        y: {
          duration: 8 + Math.random() * 4,
          ease: "linear",
          delay: delay
        },
        scale: {
          duration: 0.3,
          delay: delay
        },
        opacity: {
          duration: 0.3,
          delay: delay
        },
        x: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        scale: 1.2,
        transition: { duration: 0.1 }
      }}
      whileTap={{ scale: 0.9 }}
      onClick={handlePop}
    >
      🎈
    </motion.div>
  );
};

const Confetti = ({ isActive }) => {
  if (!isActive) return null;

  const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    emoji: ['🎉', '🎊', '⭐', '✨', '🎂', '🎁', '💖', '🌟'][i % 8],
    initialX: Math.random() * 100,
    initialY: -10
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute text-2xl"
          style={{
            left: `${piece.initialX}%`,
            top: `${piece.initialY}%`
          }}
          initial={{ y: -100, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 100, 
            rotate: 360,
            x: Math.sin(piece.id) * 100
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: "easeIn"
          }}
        >
          {piece.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const MusicPlayer = ({ isPlaying, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-sm rounded-full p-4 text-3xl hover:bg-white/30 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isPlaying ? '🎵' : '🔇'}
    </motion.button>
  );
};

const ShareButtons = ({ name, message }) => {
  const shareText = `🎉 Happy Birthday ${name}! ${message} 🎂✨`;
  const shareUrl = window.location.href;

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex gap-4 justify-center mt-6">
      <motion.button
        onClick={shareToFacebook}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full text-xl transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Share on Facebook"
      >
        📘
      </motion.button>
      
      <motion.button
        onClick={shareToTwitter}
        className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full text-xl transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Share on Twitter"
      >
        🐦
      </motion.button>
      
      <motion.button
        onClick={shareToWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full text-xl transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Share on WhatsApp"
      >
        💬
      </motion.button>
      
      <motion.button
        onClick={copyLink}
        className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full text-xl transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Copy Link"
      >
        🔗
      </motion.button>
    </div>
  );
};

const Landing = ({ onStart }) => {
  const [name, setName] = useState("");
  const [fromName, setFromName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("gradient");

  const themes = {
    gradient: "from-pink-500 via-purple-500 to-blue-500",
    sunset: "from-orange-400 via-red-500 to-pink-500",
    ocean: "from-blue-400 via-teal-500 to-green-400",
    royal: "from-purple-800 via-pink-600 to-red-500",
    rainbow: "from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter the birthday person's name!");
      return;
    }
    onStart({
      name: name.trim(),
      fromName: fromName.trim() || "Someone Special",
      message: message.trim() || "Wishing you a day filled with happiness and a year filled with joy! 🎉",
      theme: selectedTheme
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[selectedTheme]} flex items-center justify-center p-4`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20"
      >
        <motion.h1 
          className="text-4xl font-bold text-white text-center mb-8"
          animate={{ 
            textShadow: [
              "0px 0px 10px rgba(255,255,255,0.8)",
              "0px 0px 20px rgba(255,192,203,0.8)",
              "0px 0px 10px rgba(255,255,255,0.8)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎂 Birthday Wishes 🎂
        </motion.h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Birthday person's name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Your special birthday message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-3">Choose Theme:</label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(themes).map(([key, gradient]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTheme(key)}
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} border-2 ${
                    selectedTheme === key ? 'border-white' : 'border-white/30'
                  } hover:border-white transition-colors`}
                />
              ))}
            </div>
          </div>
          
          <motion.button 
            type="submit"
            className="w-full bg-white/20 backdrop-blur-sm text-white p-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🎉 Create Birthday Magic! ✨
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

const BirthdayWish = ({ wishData, onBack }) => {
  const [balloons, setBalloons] = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [blastParticles, setBlastParticles] = useState([]);
  const audioRef = useRef(null);

  const themes = {
    gradient: "from-pink-500 via-purple-500 to-blue-500",
    sunset: "from-orange-400 via-red-500 to-pink-500",
    ocean: "from-blue-400 via-teal-500 to-green-400",
    royal: "from-purple-800 via-pink-600 to-red-500",
    rainbow: "from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400"
  };

  const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8A65', '#A8E6CF'];

  useEffect(() => {
    // Create initial balloons
    const newBalloons = Array(25).fill().map((_, i) => ({
      id: Date.now() + i,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)]
    }));
    setBalloons(newBalloons);

    // Auto-spawn balloons
    const spawnTimer = setInterval(() => {
      const newBalloon = {
        id: Date.now() + Math.random(),
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)]
      };
      setBalloons(prev => [...prev.slice(-20), newBalloon]);
    }, 1500);

    // Stop confetti after 5 seconds
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      clearInterval(spawnTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const handleBalloonPop = (balloonId) => {
    setBalloons(prev => prev.filter(balloon => balloon.id !== balloonId));
    
    // Create blast particles
    const newParticles = Array(15).fill().map((_, i) => ({
      id: `${balloonId}-${i}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)]
    }));
    setBlastParticles(prev => [...prev, ...newParticles]);
    
    // Temporary confetti burst
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
    
    // Remove blast particles
    setTimeout(() => {
      setBlastParticles(prev => prev.filter(particle => !particle.id.startsWith(`${balloonId}-`)));
    }, 1000);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleDownloadHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🎉 Happy Birthday ${wishData.name}! 🎂</title>
        <style>
          body {
            margin: 0;
            overflow: hidden;
            background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6);
            font-family: 'Arial', sans-serif;
            color: white;
            text-align: center;
            animation: backgroundShift 10s ease-in-out infinite;
          }
          @keyframes backgroundShift {
            0%, 100% { background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6); }
            50% { background: linear-gradient(135deg, #f59e0b, #ef4444, #ec4899); }
          }
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
            backdrop-filter: blur(10px);
            background: rgba(255,255,255,0.1);
            border-radius: 30px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          h1 {
            font-size: 4rem;
            margin-bottom: 20px;
            text-shadow: 0 0 20px rgba(255,255,255,0.8);
            animation: glow 2s ease-in-out infinite alternate;
          }
          @keyframes glow {
            from { text-shadow: 0 0 20px rgba(255,255,255,0.8); }
            to { text-shadow: 0 0 30px rgba(255,192,203,0.9), 0 0 40px rgba(255,192,203,0.7); }
          }
          .message {
            font-size: 1.8rem;
            max-width: 600px;
            line-height: 1.6;
            margin-bottom: 20px;
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
          }
          .from {
            font-size: 1.2rem;
            font-style: italic;
            opacity: 0.9;
            margin-bottom: 30px;
          }
          .balloon {
            font-size: 3rem;
            position: absolute;
            cursor: pointer;
            animation: float 6s infinite ease-in-out;
            z-index: 10;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-30px) rotate(5deg); }
            66% { transform: translateY(-15px) rotate(-5deg); }
          }
          .confetti {
            position: absolute;
            font-size: 2rem;
            animation: confetti-fall 4s linear infinite;
            z-index: 5;
          }
          @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
          .music-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            font-size: 2rem;
            background: rgba(255,255,255,0.2);
            border: none;
            border-radius: 50%;
            padding: 15px;
            cursor: pointer;
            backdrop-filter: blur(10px);
          }
          .decorations {
            position: absolute;
            font-size: 3rem;
            animation: bounce 3s infinite;
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            60% { transform: translateY(-15px); }
          }
        </style>
      </head>
      <body>
        <div class="decorations" style="top: 5%; left: 5%;">🎂</div>
        <div class="decorations" style="top: 10%; right: 5%; animation-delay: 0.5s;">🎉</div>
        <div class="decorations" style="top: 20%; left: 10%; animation-delay: 1s;">🎁</div>
        <div class="decorations" style="bottom: 10%; right: 10%; animation-delay: 1.5s;">⭐</div>
        <div class="decorations" style="bottom: 5%; left: 15%; animation-delay: 2s;">🌟</div>
        
        <div class="container">
          <h1>🎉 Happy Birthday, ${wishData.name}! 🎂</h1>
          <div class="message">${wishData.message}</div>
          <div class="from">— With love from ${wishData.fromName} 💖</div>
        </div>
        
        <button class="music-btn" onclick="toggleMusic()" id="musicBtn">🎵</button>
        <div id="balloons-container"></div>
        <div id="confetti-container"></div>
        
        <audio id="birthday-song" loop>
          <source src="data:audio/mpeg;base64,SUQzBAAAAAABEFRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAATNTYW1zdW5nIFNNLUc5MjBJIC8gU0FNRC1EZXYATElOSwAAABQAAAQKaHR0cDovL3d3dy5iaWdzb3VuZGJhbmsuY29tAA==" type="audio/mpeg">
        </audio>
        
        <script>
          let musicPlaying = true;
          const balloonEmojis = ['🎈'];
          const confettiEmojis = ['🎉', '🎊', '⭐', '✨', '🎂', '🎁', '💖', '🌟'];
          
          function toggleMusic() {
            const audio = document.getElementById('birthday-song');
            const btn = document.getElementById('musicBtn');
            if (musicPlaying) {
              audio.pause();
              btn.textContent = '🔇';
            } else {
              audio.play();
              btn.textContent = '🎵';
            }
            musicPlaying = !musicPlaying;
          }
          
          function createBalloon() {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.innerHTML = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.left = Math.random() * 90 + '%';
            balloon.style.bottom = '-5%';
            balloon.style.color = 'hsl(' + Math.random() * 360 + ', 70%, 60%)';
            balloon.addEventListener('click', () => {
              balloon.remove();
              createParticles(balloon);
            });
            document.getElementById('balloons-container').appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 12000);
          }
          
          function createParticles(element) {
            for (let i = 0; i < 15; i++) {
              const particle = document.createElement('div');
              particle.className = 'confetti';
              particle.innerHTML = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
              particle.style.left = element.style.left;
              particle.style.top = element.style.bottom;
              document.getElementById('confetti-container').appendChild(particle);
              setTimeout(() => particle.remove(), 4000);
            }
          }
          
          function createConfetti() {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.innerHTML = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10%';
            document.getElementById('confetti-container').appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
          }
          
          // Initialize
          document.getElementById('birthday-song').play();
          setInterval(createBalloon, 2000);
          setInterval(createConfetti, 300);
          
          // Create initial balloons
          for (let i = 0; i < 15; i++) {
            setTimeout(createBalloon, i * 200);
          }
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `birthday-wish-${wishData.name.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[wishData.theme]} relative overflow-hidden`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🎂</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse">🎉</div>
        <div className="absolute top-32 left-1/3 text-4xl animate-spin">⭐</div>
        <div className="absolute top-40 right-10 text-5xl animate-bounce delay-300">🎊</div>
        <div className="absolute top-60 left-20 text-4xl animate-pulse delay-500">🌟</div>
        <div className="absolute bottom-20 right-1/4 text-5xl animate-bounce delay-700">🎁</div>
      </div>

      {/* Music Player */}
      <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl shadow-2xl border border-white/20"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            animate={{ 
              textShadow: [
                "0px 0px 20px rgba(255,255,255,0.8)",
                "0px 0px 30px rgba(255,192,203,0.9)",
                "0px 0px 20px rgba(255,255,255,0.8)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉 Happy Birthday, {wishData.name}! 🎂
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white mb-6 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {wishData.message}
          </motion.p>
          
          <motion.p 
            className="text-lg text-white/90 italic mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            — With love from {wishData.fromName} 💖
          </motion.p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <motion.button
              onClick={handleDownloadHTML}
              className="bg-green-500/80 hover:bg-green-600/80 text-white px-6 py-3 rounded-full font-semibold backdrop-blur-sm border border-white/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📥 Download with Music
            </motion.button>
            
            <motion.button
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold backdrop-blur-sm border border-white/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Create Another
            </motion.button>
          </div>

          {/* Social Share */}
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/80 mb-4">Share the joy with friends!</p>
            <ShareButtons name={wishData.name} message={wishData.message} />
          </div>
        </motion.div>
      </div>

      {/* Interactive Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          <AnimatePresence>
            {balloons.map((balloon) => (
              <Balloon
                key={balloon.id}
                id={balloon.id}
                color={balloon.color}
                onPop={handleBalloonPop}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Blast Particles */}
      {blastParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full pointer-events-none z-30"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            scale: [1, 2, 0],
            opacity: [1, 0.8, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Confetti */}
      <Confetti isActive={showConfetti} />

      {/* Hidden audio for simulated music */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        style={{ display: 'none' }}
      >
      </audio>
    </div>
  );
};

const BirthdayWishesApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [wishData, setWishData] = useState(null);

  const handleStart = (data) => {
    setWishData(data);
    setCurrentView('wish');
  };

  const handleBack = () => {
    setCurrentView('landing');
    setWishData(null);
  };

  return (
    <AnimatePresence mode="wait">
      {currentView === 'landing' ? (
        <Landing key="landing" onStart={handleStart} />
      ) : (
        <BirthdayWish key="wish" wishData={wishData} onBack={handleBack} />
      )}
    </AnimatePresence>
  );
};

export default BirthdayWishesApp
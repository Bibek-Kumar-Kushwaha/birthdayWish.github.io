import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon, { PopEffect } from "./Balloon";
import MusicPlayer from "./MusicPlayer";
import SocialShare from "./SocialShare";
import EnhancedDownloadButton from "./EnhancedDownloadButton";
import Confetti from "./Confetti";
import CustomizationPanel from "./CustomizationPanel";

const Wish = ({ userData, onBack }) => {
  const [balloons, setBalloons] = useState([]);
  const [poppedEffects, setPoppedEffects] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [confettiActive, setConfettiActive] = useState(true);
  const [backgroundAnimation, setBackgroundAnimation] = useState(true);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  
  // Customization settings
  const [customizations, setCustomizations] = useState({
    theme: "gradient1",
    balloonStyle: "emoji", 
    balloonCount: 15,
    animationIntensity: "medium",
    confetti: true,
    particles: true,
    volume: 0.7,
    autoplay: false
  });

  // Update volume when customization changes
  useEffect(() => {
    setVolume(customizations.volume);
  }, [customizations.volume]);

  // Auto-start music if enabled
  useEffect(() => {
    if (customizations.autoplay) {
      setIsPlaying(true);
    }
  }, [customizations.autoplay]);

  // Initialize balloons based on customizations
  useEffect(() => {
    const initBalloons = Array.from({ length: customizations.balloonCount }, (_, i) => ({
      id: i,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      delay: i * 0.3,
      style: customizations.balloonStyle
    }));
    setBalloons(initBalloons);
  }, [customizations.balloonCount, customizations.balloonStyle]);

  const handleBalloonPop = (balloonId, position) => {
    // Remove balloon
    setBalloons(prev => prev.filter(b => b.id !== balloonId));
    
    // Add pop effect
    const popEffect = {
      id: Date.now(),
      position: { left: position.left, top: window.innerHeight - position.startY },
      color: balloons.find(b => b.id === balloonId)?.color || '#ff6b6b'
    };
    setPoppedEffects(prev => [...prev, popEffect]);

    // Remove pop effect after animation
    setTimeout(() => {
      setPoppedEffects(prev => prev.filter(e => e.id !== popEffect.id));
    }, 1000);
  };

  const resetBalloons = () => {
    const newBalloons = Array.from({ length: customizations.balloonCount }, (_, i) => ({
      id: Date.now() + i,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      delay: i * 0.2,
      style: customizations.balloonStyle
    }));
    setBalloons(newBalloons);
    setPoppedEffects([]);
  };

  // Dynamic background based on theme
  const getThemeGradient = () => {
    const themes = {
      gradient1: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      gradient2: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
      gradient3: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      gradient4: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      gradient5: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
    };
    return themes[customizations.theme] || themes.gradient1;
  };

  const backgroundParticles = Array.from({ length: customizations.particles ? 20 : 0 }, (_, i) => ({
    id: i,
    emoji: ['🎂', '🎉', '🎊', '✨', '💖', '🎁', '🌟'][Math.floor(Math.random() * 7)],
    delay: i * 0.5,
    duration: 20 + Math.random() * 10
  }));

  const getAnimationSpeed = () => {
    const speeds = {
      low: 0.5,
      medium: 1,
      high: 1.5
    };
    return speeds[customizations.animationIntensity] || 1;
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: getThemeGradient() }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-pink-200/20 to-purple-200/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255,182,193,0.2), rgba(221,160,221,0.2))",
              "linear-gradient(135deg, rgba(255,192,203,0.3), rgba(255,218,185,0.2))",
              "linear-gradient(225deg, rgba(255,228,225,0.2), rgba(255,182,193,0.3))",
              "linear-gradient(315deg, rgba(221,160,221,0.2), rgba(255,228,225,0.2))"
            ]
          }}
          transition={{
            duration: 10 / getAnimationSpeed(),
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Background Particles */}
        <AnimatePresence>
          {backgroundAnimation && customizations.particles && backgroundParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-2xl opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${20 + Math.random() * 20}px`
              }}
              initial={{ 
                y: "110vh", 
                x: 0,
                rotate: 0,
                opacity: 0 
              }}
              animate={{
                y: "-10vh",
                x: [0, Math.sin(Date.now() * 0.001) * 100, 0],
                rotate: [0, 360],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: particle.duration / getAnimationSpeed(),
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Controls */}
        <motion.div 
          className="p-6 flex justify-between items-center backdrop-blur-sm bg-white/10 border-b border-white/20"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>

          <div className="flex items-center gap-4">
            <MusicPlayer 
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              volume={volume}
              setVolume={setVolume}
            />
            
            <motion.button
              onClick={() => setCustomizationOpen(true)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎨
            </motion.button>
            
            <motion.button
              onClick={() => setConfettiActive(!confettiActive)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎊
            </motion.button>

            <motion.button
              onClick={() => setBackgroundAnimation(!backgroundAnimation)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨
            </motion.button>
          </div>
        </motion.div>

        {/* Birthday Message */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
              style={{
                textShadow: '0 0 30px rgba(255,255,255,0.5)',
                background: 'linear-gradient(45deg, #FFD700, #FF69B4, #87CEEB)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={{
                textShadow: [
                  '0 0 30px rgba(255,255,255,0.5)',
                  '0 0 50px rgba(255,215,0,0.8)',
                  '0 0 30px rgba(255,105,180,0.6)',
                  '0 0 30px rgba(255,255,255,0.5)'
                ]
              }}
              transition={{
                duration: 3 / getAnimationSpeed(),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎉 Happy Birthday! 🎉
            </motion.h1>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-yellow-200 mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {userData?.name || 'Special Person'} 🎂
            </motion.h2>

            {userData?.message && (
              <motion.div 
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/30"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                  "{userData.message}"
                </p>
                {userData?.sender && (
                  <p className="text-lg text-yellow-200 mt-4 font-semibold">
                    - {userData.sender} 💝
                  </p>
                )}
              </motion.div>
            )}

            <motion.div 
              className="flex justify-center items-center gap-4 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.button
                onClick={resetBalloons}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg border border-white/30"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(255,255,255,0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                🎈 Release More Balloons
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex justify-center items-center gap-4 flex-wrap"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <SocialShare 
                message={`🎉 Happy Birthday ${userData?.name || 'to someone special'}! 🎂 Check out this amazing birthday wish!`}
                url={window.location.href}
              />
              
              <EnhancedDownloadButton 
                userData={userData}
                musicUrl="/src/assets/Birthday.mp3"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Balloons */}
      <AnimatePresence>
        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            id={balloon.id}
            color={balloon.color}
            delay={balloon.delay}
            onPop={handleBalloonPop}
            style={balloon.style}
          />
        ))}
      </AnimatePresence>

      {/* Pop Effects */}
      <AnimatePresence>
        {poppedEffects.map((effect) => (
          <PopEffect
            key={effect.id}
            position={effect.position}
            color={effect.color}
          />
        ))}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {confettiActive && customizations.confetti && (
          <Confetti intensity={customizations.animationIntensity} />
        )}
      </AnimatePresence>

      {/* Customization Panel */}
      <CustomizationPanel
        customizations={customizations}
        setCustomizations={setCustomizations}
        isOpen={customizationOpen}
        setIsOpen={setCustomizationOpen}
      />

      {/* Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: customizations.animationIntensity === "high" ? 30 : customizations.animationIntensity === "medium" ? 20 : 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: (2 + Math.random() * 3) / getAnimationSpeed(),
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatDelay: (3 + Math.random() * 7) / getAnimationSpeed()
            }}
          >
            ✨
          </motion.div>
        ))}
 
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-pink-200/20 to-purple-200/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255,182,193,0.2), rgba(221,160,221,0.2))",
              "linear-gradient(135deg, rgba(255,192,203,0.3), rgba(255,218,185,0.2))",
              "linear-gradient(225deg, rgba(255,228,225,0.2), rgba(255,182,193,0.3))",
              "linear-gradient(315deg, rgba(221,160,221,0.2), rgba(255,228,225,0.2))"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Background Particles */}
        <AnimatePresence>
          {backgroundAnimation && backgroundParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-2xl opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${20 + Math.random() * 20}px`
              }}
              initial={{ 
                y: "110vh", 
                x: 0,
                rotate: 0,
                opacity: 0 
              }}
              animate={{
                y: "-10vh",
                x: [0, Math.sin(Date.now() * 0.001) * 100, 0],
                rotate: [0, 360],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Controls */}
        <motion.div 
          className="p-6 flex justify-between items-center backdrop-blur-sm bg-white/10 border-b border-white/20"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>

          <div className="flex items-center gap-4">
            <MusicPlayer 
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              volume={volume}
              setVolume={setVolume}
            />
            
            <motion.button
              onClick={() => setConfettiActive(!confettiActive)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎊
            </motion.button>

            <motion.button
              onClick={() => setBackgroundAnimation(!backgroundAnimation)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨
            </motion.button>
          </div>
        </motion.div>

        {/* Birthday Message */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
              style={{
                textShadow: '0 0 30px rgba(255,255,255,0.5)',
                background: 'linear-gradient(45deg, #FFD700, #FF69B4, #87CEEB)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={{
                textShadow: [
                  '0 0 30px rgba(255,255,255,0.5)',
                  '0 0 50px rgba(255,215,0,0.8)',
                  '0 0 30px rgba(255,105,180,0.6)',
                  '0 0 30px rgba(255,255,255,0.5)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎉 Happy Birthday! 🎉
            </motion.h1>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-yellow-200 mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {userData?.name || 'Special Person'} 🎂
            </motion.h2>

            {userData?.message && (
              <motion.div 
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/30"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                  "{userData.message}"
                </p>
                {userData?.sender && (
                  <p className="text-lg text-yellow-200 mt-4 font-semibold">
                    - {userData.sender} 💝
                  </p>
                )}
              </motion.div>
            )}

            <motion.div 
              className="flex justify-center items-center gap-4 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.button
                onClick={resetBalloons}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg border border-white/30"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(255,255,255,0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                🎈 Release More Balloons
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex justify-center items-center gap-4 flex-wrap"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <SocialShare 
                message={`🎉 Happy Birthday ${userData?.name || 'to someone special'}! 🎂 Check out this amazing birthday wish!`}
                url={window.location.href}
              />
              
              <DownloadButton 
                userData={userData}
                musicUrl="/src/assets/Birthday.mp3"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Balloons */}
      <AnimatePresence>
        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            id={balloon.id}
            color={balloon.color}
            delay={balloon.delay}
            onPop={handleBalloonPop}
          />
        ))}
      </AnimatePresence>

      {/* Pop Effects */}
      <AnimatePresence>
        {poppedEffects.map((effect) => (
          <PopEffect
            key={effect.id}
            position={effect.position}
            color={effect.color}
          />
        ))}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {confettiActive && <Confetti intensity="high" />}
      </AnimatePresence>

      {/* Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 7
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
};  

export default Wish;
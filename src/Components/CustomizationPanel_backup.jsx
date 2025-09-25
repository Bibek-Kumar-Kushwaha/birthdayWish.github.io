import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomizationPanel = ({ 
  customizations, 
  setCustomizations, 
  isOpen, 
  setIsOpen 
}) => {
  const [activeTab, setActiveTab] = useState("theme");

  const themes = [
    {
      id: "gradient1",
      name: "Sunset Dreams",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      preview: "from-pink-400 via-purple-500 to-indigo-600"
    },
    {
      id: "gradient2", 
      name: "Ocean Breeze",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      preview: "from-blue-400 via-purple-500 to-pink-600"
    },
    {
      id: "gradient3",
      name: "Rainbow Joy",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      preview: "from-yellow-400 via-orange-500 to-red-600"
    },
    {
      id: "gradient4",
      name: "Emerald Forest",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      preview: "from-green-400 via-teal-500 to-blue-600"
    },
    {
      id: "gradient5",
      name: "Purple Magic",
      gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      preview: "from-purple-400 via-pink-500 to-yellow-400"
    }
  ];

  const balloonStyles = [
    { id: "emoji", name: "Emoji Balloons", icon: "🎈" },
    { id: "hearts", name: "Heart Balloons", icon: "💖" },
    { id: "stars", name: "Star Balloons", icon: "⭐" },
    { id: "mixed", name: "Mixed Party", icon: "🎊" }
  ];

  const animationIntensities = [
    { id: "low", name: "Calm", description: "Gentle animations" },
    { id: "medium", name: "Medium", description: "Balanced motion" },
    { id: "high", name: "High", description: "Full excitement!" }
  ];

  const handleCustomizationChange = (key, value) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const tabs = [
    { id: "theme", name: "Theme", icon: "🎨" },
    { id: "balloons", name: "Balloons", icon: "🎈" },
    { id: "effects", name: "Effects", icon: "✨" },
    { id: "music", name: "Music", icon: "🎵" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 sm:p-6 max-w-xs sm:max-w-4xl w-full max-h-[85vh] overflow-y-auto border-2 border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3"
                  style={{
                    textShadow: '0 0 10px rgba(0,0,0,0.3)',
                    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
                  }}>
                🎨 <span className="hidden sm:inline">Customize Your</span> Birthday <span className="hidden lg:inline">Experience</span>
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-yellow-200 text-2xl sm:text-3xl transition-colors"
                style={{
                  textShadow: '0 0 10px rgba(0,0,0,0.3)'
                }}
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 bg-black/20 rounded-2xl p-1 sm:p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-lg border border-yellow-300"
                      : "text-white hover:text-yellow-200 hover:bg-white/10"
                  }`}
                  style={{
                    textShadow: activeTab === tab.id ? '0 0 5px rgba(0,0,0,0.1)' : '0 0 5px rgba(0,0,0,0.3)'
                  }}
                  title={`Configure ${tab.name.toLowerCase()} settings`}
                >
                  {tab.icon} <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px] sm:min-h-[300px]">
              {/* Theme Tab */}
              {activeTab === "theme" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2"
                        style={{
                          textShadow: '0 0 10px rgba(0,0,0,0.3)'
                        }}>
                      🌈 Choose Your Background Theme
                    </h3>
                    <p className="text-sm sm:text-base text-white/80"
                       style={{
                         textShadow: '0 0 5px rgba(0,0,0,0.3)'
                       }}>
                      Select a beautiful gradient background that matches your mood
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {themes.map((theme) => (
                      <motion.div
                        key={theme.id}
                        className={`relative rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-300 ${
                          customizations.theme === theme.id
                            ? "ring-2 sm:ring-4 ring-yellow-400 shadow-xl"
                            : "hover:shadow-lg hover:ring-2 ring-white/30"
                        }`}
                        style={{ background: theme.gradient }}
                        onClick={() => handleCustomizationChange("theme", theme.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={`Apply ${theme.name} theme`}
                      >
                        <div className="text-white text-center">
                          <h4 className="font-bold text-sm sm:text-lg mb-2"
                              style={{
                                textShadow: '0 0 10px rgba(0,0,0,0.3)',
                                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
                              }}>
                            {theme.name}
                          </h4>
                          <div className="w-full h-6 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm"></div>
                        </div>
                        {customizations.theme === theme.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm shadow-lg"
                          >
                            ✓
                          </motion.div>
                        )}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-purple-800 font-bold"
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Balloons Tab */}
              {activeTab === "balloons" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Balloon Style</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {balloonStyles.map((style) => (
                      <motion.button
                        key={style.id}
                        onClick={() => handleCustomizationChange("balloonStyle", style.id)}
                        className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                          customizations.balloonStyle === style.id
                            ? "bg-yellow-400 text-purple-800 shadow-lg"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-4xl mb-2">{style.icon}</div>
                        <div className="font-semibold">{style.name}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4">
                    <label className="block text-white font-bold mb-2">
                      Number of Balloons: {customizations.balloonCount}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={customizations.balloonCount}
                      onChange={(e) => handleCustomizationChange("balloonCount", parseInt(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </motion.div>
              )}

              {/* Effects Tab */}
              {activeTab === "effects" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Animation Effects</h3>
                  
                  <div className="space-y-4">
                    {animationIntensities.map((intensity) => (
                      <motion.button
                        key={intensity.id}
                        onClick={() => handleCustomizationChange("animationIntensity", intensity.id)}
                        className={`w-full p-4 rounded-2xl text-left transition-all duration-300 ${
                          customizations.animationIntensity === intensity.id
                            ? "bg-yellow-400 text-purple-800 shadow-lg"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-bold text-lg">{intensity.name}</div>
                        <div className="text-sm opacity-80">{intensity.description}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-2xl p-4">
                      <label className="flex items-center gap-3 text-white font-semibold">
                        <input
                          type="checkbox"
                          checked={customizations.confetti}
                          onChange={(e) => handleCustomizationChange("confetti", e.target.checked)}
                          className="w-5 h-5"
                        />
                        🎊 Confetti Effects
                      </label>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4">
                      <label className="flex items-center gap-3 text-white font-semibold">
                        <input
                          type="checkbox"
                          checked={customizations.particles}
                          onChange={(e) => handleCustomizationChange("particles", e.target.checked)}
                          className="w-5 h-5"
                        />
                        ✨ Floating Particles
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Music Tab */}
              {activeTab === "music" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Music Settings</h3>
                  
                  <div className="bg-white/10 rounded-2xl p-4">
                    <label className="block text-white font-bold mb-2">
                      Master Volume: {Math.round(customizations.volume * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={customizations.volume}
                      onChange={(e) => handleCustomizationChange("volume", parseFloat(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4">
                    <label className="flex items-center gap-3 text-white font-semibold">
                      <input
                        type="checkbox"
                        checked={customizations.autoplay}
                        onChange={(e) => handleCustomizationChange("autoplay", e.target.checked)}
                        className="w-5 h-5"
                      />
                      🎵 Auto-play music on start
                    </label>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
              <button
                onClick={() => {
                  setCustomizations({
                    theme: "gradient1",
                    balloonStyle: "emoji",
                    balloonCount: 15,
                    animationIntensity: "medium",
                    confetti: true,
                    particles: true,
                    volume: 0.7,
                    autoplay: false
                  });
                }}
                className="px-6 py-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                🔄 Reset to Default
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-2xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                ✅ Apply Changes
              </button>
            </div>
          </motion.div>

          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #FCD34D;
              cursor: pointer;
              border: 3px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #FCD34D;
              cursor: pointer;
              border: 3px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomizationPanel;
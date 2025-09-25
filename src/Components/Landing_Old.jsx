import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayWishes, wishCategories, getWishesByCategory } from "../data/birthdayWishes";

const Landing = ({ onStart }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [messageType, setMessageType] = useState("custom"); // "custom" or "select"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWish, setSelectedWish] = useState("");
  const [showWishSelector, setShowWishSelector] = useState(false);
  const [currentWishes, setCurrentWishes] = useState(birthdayWishes);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter the birthday person's name!");
      return;
    }
    
    let finalMessage = "";
    if (messageType === "select" && selectedWish) {
      finalMessage = selectedWish;
    } else {
      finalMessage = message.trim() || "Wishing you a day filled with happiness, joy, and all the wonderful things you deserve!";
    }
    
    const userData = {
      name: name.trim(),
      message: finalMessage,
      sender: senderName.trim()
    };
    
    onStart(userData);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const wishes = getWishesByCategory(categoryId);
    setCurrentWishes(wishes);
  };

  const handleWishSelect = (wish) => {
    setSelectedWish(wish.wish);
    setShowWishSelector(false);
  };

  const handleMessageTypeChange = (type) => {
    setMessageType(type);
    if (type === "select") {
      setShowWishSelector(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Birthday Elements */}
        <motion.div 
          className="absolute top-4 sm:top-10 left-4 sm:left-10 text-3xl sm:text-5xl lg:text-6xl opacity-20"
          animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🎈
        </motion.div>
        <motion.div 
          className="absolute top-8 sm:top-20 right-4 sm:right-20 text-2xl sm:text-4xl lg:text-5xl opacity-20"
          animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🎂
        </motion.div>
        <motion.div 
          className="absolute bottom-8 sm:bottom-20 left-4 sm:left-20 text-2xl sm:text-3xl lg:text-4xl opacity-20"
          animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎉
        </motion.div>
        <motion.div 
          className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 text-3xl sm:text-5xl lg:text-6xl opacity-20"
          animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          🎁
        </motion.div>
        
        {/* Floating Particles - Reduced on mobile */}
        {Array.from({ length: window.innerWidth < 640 ? 15 : 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl"
            style={{
              textShadow: '0 0 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.6)',
              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))'
            }}
            animate={{ 
              textShadow: [
                "0 0 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.6)",
                "0 0 30px rgba(0,0,0,0.3), 0 0 60px rgba(255,255,255,0.8)",
                "0 0 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.6)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎉 Birthday Wishes Creator 🎉
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white font-medium px-2"
            style={{
              textShadow: '0 0 15px rgba(0,0,0,0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Create magical birthday memories with music, animations, and love!
          </motion.p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg border-2 border-white/40"
        >
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="block text-white font-bold mb-2 text-base sm:text-lg"
                     style={{
                       textShadow: '0 0 10px rgba(0,0,0,0.3)',
                       filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
                     }}>
                🎂 Birthday Person's Name *
              </label>
              <input
                type="text"
                placeholder="Enter their wonderful name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 sm:p-4 border-2 border-white/30 rounded-xl text-sm sm:text-lg focus:border-yellow-300 focus:outline-none transition-all duration-300 bg-white/15 text-white placeholder-white/80 backdrop-blur-md shadow-lg"
                style={{
                  textShadow: '0 0 5px rgba(0,0,0,0.2)'
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label className="block text-white font-bold mb-3 text-base sm:text-lg"
                     style={{
                       textShadow: '0 0 10px rgba(0,0,0,0.3)',
                       filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
                     }}>
                💌 Birthday Message
              </label>
              
              {/* Message Type Selector */}
              <div className="flex mb-4 bg-black/20 rounded-xl p-1 backdrop-blur-md border border-white/30">
                <button
                  type="button"
                  onClick={() => handleMessageTypeChange("custom")}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm ${
                    messageType === "custom" 
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-lg border border-yellow-300" 
                      : "text-white hover:text-yellow-200 hover:bg-white/10"
                  }`}
                  style={{
                    textShadow: messageType === "custom" ? '0 0 5px rgba(0,0,0,0.1)' : '0 0 10px rgba(0,0,0,0.3)'
                  }}
                >
                  ✍️ <span className="hidden sm:inline">Write</span> Custom
                </button>
                <button
                  type="button"
                  onClick={() => handleMessageTypeChange("select")}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm ${
                    messageType === "select" 
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-lg border border-yellow-300" 
                      : "text-white hover:text-yellow-200 hover:bg-white/10"
                  }`}
                  style={{
                    textShadow: messageType === "select" ? '0 0 5px rgba(0,0,0,0.1)' : '0 0 10px rgba(0,0,0,0.3)'
                  }}
                >
                  📝 <span className="hidden sm:inline">Choose</span> Message
                </button>
              </div>

              {/* Custom Message Input */}
              <AnimatePresence>
                {messageType === "custom" && (
                  <motion.textarea
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    placeholder="Write a heartfelt birthday message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-white/30 rounded-xl text-sm sm:text-lg focus:border-yellow-300 focus:outline-none transition-all duration-300 resize-none bg-white/15 text-white placeholder-white/80 backdrop-blur-md shadow-lg"
                    style={{
                      textShadow: '0 0 5px rgba(0,0,0,0.2)'
                    }}
                    rows="4"
                  />
                )}
              </AnimatePresence>

              {/* Selected Message Display */}
              <AnimatePresence>
                {messageType === "select" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <motion.button
                      type="button"
                      onClick={() => setShowWishSelector(!showWishSelector)}
                      className="w-full p-3 sm:p-4 border-2 border-white/30 rounded-xl text-left bg-white/15 text-white backdrop-blur-md hover:border-yellow-300 transition-all duration-300 shadow-lg"
                      style={{
                        textShadow: '0 0 5px rgba(0,0,0,0.2)'
                      }}
                    >
                      {selectedWish ? (
                        <span className="text-sm sm:text-lg">{selectedWish}</span>
                      ) : (
                        <span className="text-white/80 text-sm sm:text-lg">Click to choose a birthday wish...</span>
                      )}
                      <span className="float-right text-lg sm:text-2xl">
                        {showWishSelector ? "▲" : "▼"}
                      </span>
                    </motion.button>

                    {/* Wish Selector Modal */}
                    <AnimatePresence>
                      {showWishSelector && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                          onClick={() => setShowWishSelector(false)}
                        >
                          <motion.div
                            className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 sm:p-6 max-w-xs sm:max-w-4xl w-full max-h-[80vh] overflow-y-auto border-2 border-white/40"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                              <h3 className="text-lg sm:text-2xl font-bold text-white"
                                  style={{
                                    textShadow: '0 0 10px rgba(0,0,0,0.3)',
                                    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
                                  }}>
                                🎉 Choose Your Perfect Birthday Message
                              </h3>
                              <button
                                onClick={() => setShowWishSelector(false)}
                                className="text-white hover:text-yellow-200 text-2xl sm:text-3xl transition-colors"
                                style={{
                                  textShadow: '0 0 10px rgba(0,0,0,0.3)'
                                }}
                              >
                                ×
                              </button>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-4 sm:mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                              {wishCategories.map((category) => (
                                <button
                                  key={category.id}
                                  type="button"
                                  onClick={() => handleCategoryChange(category.id)}
                                  className={`p-2 sm:p-3 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm ${
                                    selectedCategory === category.id
                                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-lg border border-yellow-300"
                                      : "bg-white/15 text-white hover:bg-white/25 border border-white/30"
                                  }`}
                                  style={{
                                    textShadow: selectedCategory === category.id ? '0 0 5px rgba(0,0,0,0.1)' : '0 0 5px rgba(0,0,0,0.3)'
                                  }}
                                >
                                  {category.emoji} <span className="hidden sm:inline">{category.name}</span>
                                </button>
                              ))}
                            </div>

                            {/* Wishes Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-60 sm:max-h-96 overflow-y-auto">
                              {currentWishes.map((wish, index) => (
                                <motion.div
                                  key={wish.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="bg-white/15 border-2 border-white/30 rounded-2xl p-3 sm:p-4 cursor-pointer hover:bg-white/25 hover:border-yellow-300 transition-all duration-300 group shadow-lg"
                                  onClick={() => handleWishSelect(wish)}
                                >
                                  <div className="flex items-start gap-2 sm:gap-3">
                                    <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                                      {wish.emoji}
                                    </span>
                                    <p className="text-white leading-relaxed flex-1 text-sm sm:text-base"
                                       style={{
                                         textShadow: '0 0 5px rgba(0,0,0,0.3)'
                                       }}>
                                      {wish.wish}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <label className="block text-white font-bold mb-2 text-base sm:text-lg"
                     style={{
                       textShadow: '0 0 10px rgba(0,0,0,0.3)',
                       filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
                     }}>
                ✍️ Your Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Your name..."
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full p-3 sm:p-4 border-2 border-white/30 rounded-xl text-sm sm:text-lg focus:border-yellow-300 focus:outline-none transition-all duration-300 bg-white/15 text-white placeholder-white/80 backdrop-blur-md shadow-lg"
                style={{
                  textShadow: '0 0 5px rgba(0,0,0,0.2)'
                }}
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                background: "linear-gradient(45deg, #FFD700, #FFA500)"
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl text-base sm:text-lg transition-all duration-300 shadow-xl border-2 border-yellow-300"
              style={{
                textShadow: '0 0 10px rgba(0,0,0,0.1)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              🎉 Create Amazing Birthday Experience! 🎉
            </motion.button>
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-2xl text-xl font-bold shadow-lg transition-all duration-300 border-2 border-yellow-300"
            >
              🎊 Create Birthday Magic! 🎊
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-6 text-white/80 text-center"
        >
          <p className="text-lg">
            ✨ Features: Music 🎵 • Animations 🎭 • Social Share 📱 • Download 💾
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
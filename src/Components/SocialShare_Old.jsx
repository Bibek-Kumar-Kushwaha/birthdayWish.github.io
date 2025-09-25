import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SocialShare = ({ name, message, userData }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `🎉 Happy Birthday ${name || userData?.name || 'Special Person'}! 🎂 
${message || userData?.message || 'Celebrating another amazing year!'}

� This interactive birthday wish includes music, animations, and celebration effects!
Created with ❤️ using Birthday Wishes Creator ✨`;

  const shareUrl = `${window.location.origin}/birthday-wish?name=${encodeURIComponent(name || userData?.name || '')}&message=${encodeURIComponent(message || userData?.message || '')}`;

  // Enhanced sharing functions with better content
  const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, '_blank', 'width=600,height=500,scrollbars=yes,resizable=yes');
  };

  const shareToTwitter = () => {
    const twitterText = `🎉 Happy Birthday ${name || userData?.name}! 🎂✨ Check out this amazing interactive birthday wish with music & animations! 🎵🎈`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}&hashtags=HappyBirthday,BirthdayWish,Celebration`;
    window.open(twitterUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const shareToWhatsApp = () => {
    const whatsappText = `${shareText}\n\n🔗 ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&mini=true&title=${encodeURIComponent('🎉 Birthday Celebration!')}&summary=${encodeURIComponent(shareText)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareToReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`🎉 Happy Birthday ${name || userData?.name}! 🎂 Interactive Birthday Wish`)}`;
    window.open(redditUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
  };

  const shareViaEmail = () => {
    const subject = `🎉 Happy Birthday ${name || userData?.name}! 🎂`;
    const body = `${shareText}\n\nClick here to view the interactive birthday wish: ${shareUrl}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const shareButtons = [
    { 
      name: 'WhatsApp', 
      icon: '💬', 
      action: shareToWhatsApp, 
      color: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      description: 'Share on WhatsApp'
    },
    { 
      name: 'Facebook', 
      icon: '�', 
      action: shareToFacebook, 
      color: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      description: 'Share on Facebook'
    },
    { 
      name: 'Twitter', 
      icon: '🐦', 
      action: shareToTwitter, 
      color: 'from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700',
      description: 'Share on Twitter'
    },
    { 
      name: 'LinkedIn', 
      icon: '💼', 
      action: shareToLinkedIn, 
      color: 'from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900',
      description: 'Share on LinkedIn'
    },
    { 
      name: 'Telegram', 
      icon: '✈️', 
      action: shareToTelegram, 
      color: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      description: 'Share on Telegram'
    },
    { 
      name: 'Email', 
      icon: '📧', 
      action: shareViaEmail, 
      color: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      description: 'Share via Email'
    },
    { 
      name: 'Reddit', 
      icon: '🤖', 
      action: shareToReddit, 
      color: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      description: 'Share on Reddit'
    },
    { 
      name: copied ? 'Copied!' : 'Copy Link', 
      icon: copied ? '✅' : '🔗', 
      action: copyLink, 
      color: copied 
        ? 'from-green-500 to-green-600' 
        : 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
      description: copied ? 'Link copied to clipboard!' : 'Copy link to clipboard'
    }
  ];

  return (
    <div className="relative">
      {/* Main Share Button */}
      <motion.button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-sm sm:text-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Share this birthday wish on social media"
      >
        <span className="text-lg">�</span>
        <span className="hidden sm:inline">Share Birthday</span>
        <span className="sm:hidden">Share</span>
      </motion.button>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-white/30 z-50"
            style={{ minWidth: '280px', maxWidth: '360px' }}
          >
            <div className="text-center mb-4">
              <h3 className="text-white font-bold text-lg mb-1"
                  style={{
                    textShadow: '0 0 10px rgba(0,0,0,0.3)'
                  }}>
                🚀 Share the Joy!
              </h3>
              <p className="text-white/80 text-sm"
                 style={{
                   textShadow: '0 0 5px rgba(0,0,0,0.3)'
                 }}>
                Spread birthday happiness across social media
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
              {shareButtons.map((button, index) => (
                <motion.button
                  key={button.name}
                  onClick={() => {
                    button.action();
                    if (button.name !== 'Copy Link' && !button.name.includes('Copied')) {
                      setTimeout(() => setShowShareMenu(false), 500);
                    }
                  }}
                  className={`bg-gradient-to-r ${button.color} text-white p-3 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center gap-2 text-sm shadow-lg hover:shadow-xl transform hover:scale-105`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={button.description}
                  style={{
                    textShadow: '0 0 5px rgba(0,0,0,0.2)'
                  }}
                >
                  <span className="text-xl">{button.icon}</span>
                  <span className="text-xs font-medium leading-tight text-center">
                    {button.name}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Close button */}
            <motion.button
              onClick={() => setShowShareMenu(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Close share menu"
            >
              ×
            </motion.button>

            {/* Native Share API fallback */}
            {navigator.share && (
              <motion.button
                onClick={async () => {
                  try {
                    await navigator.share({
                      title: `🎉 Happy Birthday ${name || userData?.name}!`,
                      text: shareText,
                      url: shareUrl
                    });
                    setShowShareMenu(false);
                  } catch (err) {
                    console.log('Native sharing cancelled or failed:', err);
                  }
                }}
                className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white p-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title="Use device's native share menu"
              >
                <span>📱</span>
                <span>More Options</span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
                  setShowShareMenu(false);
                }
              }}
              className={`bg-gradient-to-r ${button.color} text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-3`}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: showShareMenu ? 1 : 0, x: showShareMenu ? 0 : -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-lg">{button.icon}</span>
              <span>{button.name}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Close button */}
        <motion.button
          onClick={() => setShowShareMenu(false)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs font-bold hover:bg-red-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>

        {/* Arrow pointer */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20"></div>
      </motion.div>

      {/* Backdrop */}
      {showShareMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[-1]"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default SocialShare;
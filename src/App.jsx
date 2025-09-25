import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Landing from "./Components/Landing";
import FinalEnhancedWish from "./Components/FinalEnhancedWish";

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [userData, setUserData] = useState(null);

  const handleStartCelebration = (data) => {
    setUserData(data);
    setCurrentView('wish');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setUserData(null);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <Landing 
            key="landing" 
            onStart={handleStartCelebration} 
          />
        ) : (
          <FinalEnhancedWish 
            key="wish" 
            userData={userData} 
            onBack={handleBackToLanding} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
import React, { useState } from "react";
import Landing from "./Components/Landing";
import Wish from "./Components/Wish";

const App = () => {
  const [isCelebrationStarted, setIsCelebrationStarted] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleStartCelebration = (name, message) => {
    setName(name);
    setMessage(message);
    setIsCelebrationStarted(true);
  };

  return (
    <div>
      {isCelebrationStarted ? (
        <Wish name={name} message={message} />
      ) : (
        <Landing onStart={handleStartCelebration} />
      )}
    </div>
  );
};

export default App;
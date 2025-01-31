import React, { useState } from 'react';

const ExplosionComponent = () => {
  const [exploded, setExploded] = useState(false);

  const handleExplosion = () => {
    setExploded(true);
    setTimeout(() => setExploded(false), 1000);
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={handleExplosion}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Explode!
      </button>
      {exploded && (
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-yellow-500 animate-ping"></div>
      )}
    </div>
  );
};

export default ExplosionComponent;

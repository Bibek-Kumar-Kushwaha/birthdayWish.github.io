import React from 'react';

const BalloonComponent = () => {
  return (
    <div className="absolute top-1/2 left-1/4 animate-bounce">
      <img src="path_to_balloon_image.png" alt="Balloon" className="h-20 w-20" />
    </div>
  );
};

export default BalloonComponent;

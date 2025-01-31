import React, { useState } from 'react';
import ExplosionComponent from './ExplosionComponent';
import MessageComponent from './MesssageComponent';
import BalloonComponent from './BalloonComponent';

const BirthdayWishPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleNameSubmit = (name, message) => {
    setName(name);
    setMessage(message);
  };

  return (
    <div className="relative bg-gray-100 h-screen flex flex-col items-center justify-center">
      <BalloonComponent/>
      <h1 className="text-4xl font-semibold text-center text-blue-500">
        {name ? `Happy Birthday, ${name}!` : 'Enter your details!'}
      </h1>
      <p className="text-xl text-center mt-4 text-blue-700">{message}</p>
      <MessageComponent onNameSubmit={handleNameSubmit} />
      <ExplosionComponent/>
    </div>
  );
};

export default BirthdayWishPage;

import React, { useState } from 'react';

const MessageComponent = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Happy Birthday!');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameSubmit(name, message);
  };

  return (
    <form onSubmit={handleSubmit} className="text-center mt-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border-2 border-gray-300 rounded mb-2"
      />
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 border-2 border-gray-300 rounded mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default MessageComponent;

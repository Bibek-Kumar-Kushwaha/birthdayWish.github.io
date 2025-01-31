import React from "react";

const MessageForm = ({ name, setName, message, setMessage }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Customize Your Birthday Wish</h2>
      <form>
        <div className="mb-4">
          <label className="block font-medium mb-2">Recipient's Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter their name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Your Message:</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a heartfelt wish"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;

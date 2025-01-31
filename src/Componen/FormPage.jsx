import React, { useState } from "react";

function FormPage({ handleCreateWish }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("Wishing you a very Happy Birthday! 🎉🎂");
  const [success, setSuccess] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a name!");
      return;
    }
    if (!message.trim()) {
      alert("Please enter a message!");
      return;
    }
    handleCreateWish(name, message);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    setName("");
    setMessage("Wishing you a very Happy Birthday! 🎉🎂");
  };

  return (
    <div className="form-page bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-6">
        Create a Birthday Wish
      </h1>
      <form onSubmit={onSubmit}>
        <input
          id="name-input"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Name Input"
        />
        <textarea
          id="message-input"
          placeholder="Enter Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 mb-6 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Message Input"
        />
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300"
        >
          Create Wish
        </button>
      </form>
      {success && (
        <p className="text-green-600 text-center mt-4">🎉 Wish Created Successfully! 🎈</p>
      )}
    </div>
  );
}

export default FormPage;

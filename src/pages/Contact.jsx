import React from "react";

const Contact = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="space-y-4 max-w-md">
        <input className="w-full border p-2" placeholder="Your Name" />
        <input className="w-full border p-2" type="email" placeholder="Your Email" />
        <textarea className="w-full border p-2" rows="4" placeholder="Message"></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default Contact;

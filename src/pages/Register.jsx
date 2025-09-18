import React, { useState } from "react";
import { register } from "../api/authService";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch {
      alert("Failed to register");
    }
  };

  return (
    <div className="p-10 flex justify-center">
      <form onSubmit={handleSubmit} className="border p-6 rounded w-96 shadow">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <input
          className="w-full border p-2 mb-3"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

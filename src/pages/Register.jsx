import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { register } from "../api/authService";

const colors = ["#FFD700", "#FF69B4", "#7FFFD4", "#00BFFF", "#FF4500"];

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [explosion, setExplosion] = useState(false);

  // Generate a sparkle
  const generateSparkle = (x, y, relative = false) => {
    const id = Date.now() + Math.random();
    const size = Math.random() * 6 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    setSparkles((prev) => [...prev, { id, x, y, size, color, relative }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 700);
  };

  // Input field typing sparkles
  const handleTypingSparkle = (e) => {
    const rect = e.target.getBoundingClientRect();
    generateSparkle(rect.left + Math.random() * rect.width, rect.top + Math.random() * rect.height);
  };

  // Button hover sparkles
  const handleButtonHover = (e) => {
    const rect = e.target.getBoundingClientRect();
    const interval = setInterval(() => {
      generateSparkle(rect.left + Math.random() * rect.width, rect.top + Math.random() * rect.height);
    }, 150);
    e.target.addEventListener("mouseleave", () => clearInterval(interval), { once: true });
  };

  // Full-screen explosion on success
  useEffect(() => {
    if (!explosion) return;
    const explosionInterval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      generateSparkle(x, y);
    }, 50);
    setTimeout(() => clearInterval(explosionInterval), 1400);
    return () => clearInterval(explosionInterval);
  }, [explosion]);

  // Cursor-following sparkles
  useEffect(() => {
    const handleMouseMove = (e) => generateSparkle(e.clientX, e.clientY);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Continuous drifting background sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      generateSparkle(x, y);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      setExplosion(true);
      setTimeout(() => {
        setExplosion(false);
        alert("Registration successful! Please login.");
        window.location.href = "/login";
      }, 1500);
    } catch {
      alert("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="relative min-h-screen flex items-center justify-center overflow-hidden 
    bg-gradient-to-r from-purple-700 via-pink-500 to-blue-600 p-4">
      {/* Floating Background Shapes */}
      <motion.div className="absolute w-40 h-40 bg-purple-300 rounded-full opacity-40 top-10 left-10 blur-2xl animate-bounce-slow" />
      <motion.div className="absolute w-60 h-60 bg-pink-300 rounded-full opacity-30 top-64 right-20 blur-3xl animate-bounce-slower" />
      <motion.div className="absolute w-32 h-32 bg-yellow-300 rounded-full opacity-30 bottom-20 left-1/3 blur-2xl animate-bounce-slowest" />

      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: s.relative ? "absolute" : "fixed",
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              backgroundColor: s.color,
              pointerEvents: "none",
              zIndex: 50,
              boxShadow: `0 0 10px ${s.color}`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Registration Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">
          Create Account
        </h1>

        {["username", "email", "password"].map((field) => (
          <div key={field} className="relative">
            <input
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "password" ? "password" : "text"}
              value={form[field]}
              onChange={(e) => {
                setForm({ ...form, [field]: e.target.value });
                handleTypingSparkle(e);
              }}
            />
          </div>
        ))}

        <button
          className="relative bg-purple-600 text-white p-3 rounded-lg font-semibold mt-2 shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
          disabled={loading}
          onMouseEnter={handleButtonHover}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;

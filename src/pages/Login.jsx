import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const success = await login(email, password); 
      if (success) {
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (err) {
      toast.error("Login failed. Check your email and password.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x bg-[length:400%_400%]"></div>

      {/* Floating dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/30 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
        <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-500 via-blue-400 to-green-500 bg-clip-text text-transparent animate-gradient-text drop-shadow-xl">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-xl border bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 transition
                ${errors.email ? "border-red-400 focus:ring-red-400" : "border-white/30 focus:ring-purple-400"}`}
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full px-4 py-3 rounded-xl border bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 transition
                ${errors.password ? "border-red-400 focus:ring-red-400" : "border-white/30 focus:ring-purple-400"}`}
              required
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-black/90 backdrop-blur-md shadow-2xl px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* Logo */}
      <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:scale-110 transition-transform duration-500 animate-pulse">
        <Link to="/">ShopSphere</Link>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 md:gap-6">

        <Link
          to="/my-orders"
          className="relative group px-5 py-2 rounded-lg text-white font-semibold transition-all duration-300"
        >
          <span className="absolute inset-0 bg-blue-500/30 rounded-lg blur opacity-50 transition-all duration-300 group-hover:opacity-100"></span>
          <span className="relative z-10">My Orders</span>
        </Link>

        {["Products","About","Contact","Cart"].map((link) => (
          <Link
            key={link}
            to={`/${link.toLowerCase()}`}
            className="relative text-white px-3 py-2 rounded-md font-medium group hover:text-yellow-300 transition-colors duration-300"
          >
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            <span className="relative z-10">{link}</span>
          </Link>
        ))}

        {/* Auth Buttons */}
        {user ? (
          <>
            <span className="text-white font-semibold animate-pulse mr-2">Hi, {user.username}</span>
            <button
              onClick={logout}
              className="relative px-4 py-2 rounded-lg cursor-pointer text-white font-semibold bg-red-500 hover:bg-red-600 shadow-lg transform hover:scale-110 transition-all duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-red-300 after:rounded-lg after:opacity-0 after:blur-sm after:transition-all after:duration-500 hover:after:opacity-50"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="relative px-4 py-2 cursor-pointer rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 shadow-lg transform hover:scale-110 transition-all duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-purple-400 after:rounded-lg after:opacity-0 after:blur-sm after:transition-all after:duration-500 hover:after:opacity-50" to="/login">
              Login
            </Link>
            <Link className="relative px-4 py-2 cursor-pointer rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 shadow-lg transform hover:scale-110 transition-all duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-300 after:rounded-lg after:opacity-0 after:blur-sm after:transition-all after:duration-500 hover:after:opacity-50" to="/register">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;

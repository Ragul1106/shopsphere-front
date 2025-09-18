// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // for hamburger icons

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-md shadow-2xl px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:scale-110 transition-transform duration-500 animate-pulse">
        <Link to="/">ShopSphere</Link>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="text-white md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Links (Desktop + Mobile) */}
      <div
        className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-black/95 md:bg-transparent px-6 md:px-0 py-4 md:py-0 transition-all duration-300 ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <Link
          to="/my-orders"
          className="relative group px-5 py-2 rounded-lg text-white font-semibold transition-all duration-300"
          onClick={() => setMenuOpen(false)}
        >
          <span className="absolute inset-0 bg-blue-500/30 rounded-lg blur opacity-50 transition-all duration-300 group-hover:opacity-100"></span>
          <span className="relative z-10">My Orders</span>
        </Link>

        {["Products", "About", "Contact", "Cart"].map((link) => (
          <Link
            key={link}
            to={`/${link.toLowerCase()}`}
            className="relative text-white px-3 py-2 rounded-md font-medium group hover:text-yellow-300 transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            <span className="relative z-10">{link}</span>
          </Link>
        ))}

        {/* Auth Buttons */}
        {user ? (
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-white font-semibold animate-pulse">
              Hi, {user.username}
            </span>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="relative px-4 py-2 rounded-lg cursor-pointer text-white font-semibold bg-red-500 hover:bg-red-600 shadow-lg transform hover:scale-110 transition-all duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-red-300 after:rounded-lg after:opacity-0 after:blur-sm after:transition-all after:duration-500 hover:after:opacity-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-3">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="relative px-4 py-2 cursor-pointer rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 shadow-lg transform hover:scale-110 transition-all duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-purple-400 after:rounded-lg after:opacity-0 after:blur-sm after:transition-all after:duration-500 hover:after:opacity-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="relative px-4 py-2 cursor-pointer rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 shadow-lg transform hover:scale-110 transition-all duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-300 after:rounded-lg after:opacity-0 after:blur-sm after:transition-all after:duration-500 hover:after:opacity-50"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

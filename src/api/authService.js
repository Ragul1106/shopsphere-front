// src/api/authService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://shopsphere-b.onrender.com";

// Login using JWT
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/token/`, { email, password });
    const { access, refresh } = res.data;

    if (access && refresh) {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    } else {
      throw new Error("Tokens not received");
    }

    return res.data;
  } catch (err) {
    console.error("Login API error:", err);
    throw err; // propagate error to AuthContext
  }
};

// Refresh access token
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) throw new Error("No refresh token found");

  const res = await axios.post(`${API_URL}/api/token/refresh/`, { refresh });
  localStorage.setItem("access_token", res.data.access);
  return res.data;
};

// Get current user profile
export const getProfile = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.get(`${API_URL}/api/users/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Register new user
export const register = async (payload) => {
  const res = await axios.post(`${API_URL}/api/users/register/`, payload);
  return res.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

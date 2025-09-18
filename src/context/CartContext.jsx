import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Fetch cart from backend on load
  const fetchCart = async () => {
    if (!user) return setLoading(false);
    try {
      const res = await axiosInstance.get("/cart/");
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Add product to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      const payload = {
        items: [
          {
            product: product.id,
            quantity,
          },
        ],
      };
      const res = await axiosInstance.post("/cart/", payload);
      setCart(res.data.items || []);
      toast.success(`${product.name || product.title} added to cart`);
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add to cart");
    }
  };

  // Remove product
  const removeFromCart = async (cartItemId) => {
    try {
      await axiosInstance.delete(`/cart/${cartItemId}/`);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (err) {
      console.error("Remove from cart failed:", err);
      toast.error("Failed to remove item");
    }
  };

  // Update quantity
  const updateCartItem = async (cartItemId, quantity) => {
    if (quantity <= 0) return removeFromCart(cartItemId);
    try {
      const res = await axiosInstance.put(`/cart/${cartItemId}/`, { quantity });
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
      );
    } catch (err) {
      console.error("Update cart item failed:", err);
      toast.error("Failed to update item");
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      for (let item of cart) {
        await axiosInstance.delete(`/cart/${item.id}/`);
      }
      setCart([]);
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartItem, clearCart, total, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, total, loading } =
    useContext(CartContext);

  if (loading)
    return <p className="p-10 text-center text-gray-600">Loading cart...</p>;

  if (!cart.length)
    return (
      <div className="p-10 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-40 mx-auto mb-6 opacity-70"
        />
        <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="bg-white shadow rounded-lg p-4 divide-y">
        {cart.map((item) => {
          const product = item.product || {}; 
          const imageUrl =
            product.image || product.images?.[0] || "https://via.placeholder.com/100";

          return (
            <motion.div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={imageUrl}
                  alt={product.name || product.title || "Product"}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div>
                  <h3 className="font-semibold text-lg">
                    {product.name || product.title}
                  </h3>
                  <p className="text-gray-500">₹{product.price}</p>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  className="px-3 py-1 border rounded-l cursor-pointer hover:bg-gray-100 disabled:opacity-50"
                  disabled={item.quantity <= 1}
                  onClick={() =>
                    updateCartItem(item.id, Math.max(item.quantity - 1, 1))
                  }
                >
                  -
                </button>
                <span className="px-4 font-medium">{item.quantity}</span>
                <button
                  className="px-3 py-1 border cursor-pointer rounded-r hover:bg-gray-100"
                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <span className="text-xl font-bold text-gray-800">
                  ₹{(product.price * item.quantity).toLocaleString()}
                </span>
                <button
                  className="text-red-500 cursor-pointer hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">Total: ₹{total.toLocaleString()}</h2>
        <Link
          to="/checkout"
          className="bg-green-600 text-white px-6 py-3 mt-4 sm:mt-0 rounded-lg hover:bg-green-700 transition"
        >
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
};

export default Cart;

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, total, loading } = useContext(CartContext);

  if (loading) return <p className="p-10 text-center">Loading cart...</p>;
  if (!cart.length) return <p className="p-10 text-center">Your cart is empty.</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <div>
            <span className="font-medium">{item.product.name || item.product.title}</span>
            <div className="flex items-center mt-1">
              <button
                className="px-2 border rounded-l"
                onClick={() => updateCartItem(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                className="px-2 border rounded-r"
                onClick={() => updateCartItem(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>₹{item.product.price * item.quantity}</span>
            <button
              className="text-red-500"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2 className="mt-6 text-xl font-bold">Total: ₹{total}</h2>
      <Link
        to="/checkout"
        className="bg-blue-600 text-white px-6 py-2 mt-4 inline-block rounded"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;

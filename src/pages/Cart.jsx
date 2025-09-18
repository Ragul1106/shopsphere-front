import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, total, loading } =
    useContext(CartContext);

  if (loading) return <p className="p-10 text-center">Loading cart...</p>;
  if (!cart.length) return <p className="p-10 text-center">Your cart is empty.</p>;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.product.image || "/placeholder.png"}
                alt={item.product.name || item.product.title}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {item.product.name || item.product.title}
                </h2>
                <p className="text-gray-600">₹{item.product.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                    onClick={() =>
                      updateCartItem(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b">
                    {item.quantity}
                  </span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price + Remove */}
            <div className="flex flex-col items-end gap-2">
              <span className="font-semibold text-lg">
                ₹{item.product.price * item.quantity}
              </span>
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Checkout */}
      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
        <Link
          to="/checkout"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;

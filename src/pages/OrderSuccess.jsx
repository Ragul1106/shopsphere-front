import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${orderId}/`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        toast.error("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="p-10">Loading order details...</p>;

  if (!order)
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Order not found</h1>
        <Link
          to="/products"
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded shadow-lg hover:scale-105 transition-transform"
        >
          Back to Products
        </Link>
      </div>
    );

  // Safely parse numbers
  const orderTotal = Number(order.order_total || 0);
  const orderTax = Number(order.tax || 0);
  const grandTotal = orderTotal + orderTax;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      {/* Gradient Animated Title */}
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse text-center">
        🎉 Order Placed Successfully! 🎉
      </h1>

      {/* Shipping Details Card */}
      <div className="border border-purple-500/40 p-6 rounded-2xl mb-6 bg-gray-900 text-white shadow-lg hover:shadow-purple-500/40 transition">
        <h2 className="text-xl font-semibold mb-2 text-purple-400">📦 Shipping Details</h2>
        <p>
          {order.address}, {order.city}, {order.state}, {order.postal_code},{" "}
          {order.country}
        </p>
        <p className="mt-1">📞 {order.phone}</p>
      </div>

      {/* Order Items Table */}
      <div className="border border-cyan-500/40 p-6 rounded-2xl mb-6 bg-gray-900 text-white shadow-lg hover:shadow-cyan-500/40 transition">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">🛍️ Order Items</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-cyan-500/30 text-cyan-300">
              <th className="py-2">Product</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-cyan-500/10 hover:bg-cyan-500/10 transition"
              >
                <td>{item.product.title || item.product.name}</td>
                <td>{item.quantity}</td>
                <td>₹{Number(item.product_price || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="text-right mb-8 text-white">
        <p>
          <strong>Subtotal:</strong> ₹{orderTotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax:</strong> ₹{orderTax.toFixed(2)}
        </p>
        <p className="text-lg font-bold text-green-400">
          <strong>Total:</strong> ₹{grandTotal.toFixed(2)}
        </p>
      </div>

      {/* Button */}
      <div className="text-center">
        <Link
          to="/products"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                     text-white px-8 py-3 rounded-full shadow-lg 
                     hover:scale-110 hover:shadow-pink-500/50 
                     transition-transform duration-300"
        >
          🛒 Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

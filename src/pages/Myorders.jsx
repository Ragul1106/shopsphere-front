import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders/");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-10">Loading your orders...</p>;

  if (orders.length === 0)
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-400">No Orders Yet</h1>
        <Link
          to="/products"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                     text-white px-6 py-2 rounded-full shadow-lg 
                     hover:scale-110 hover:shadow-purple-500/40 
                     transition-transform duration-300"
        >
          🛒 Start Shopping
        </Link>
      </div>
    );

  // Updated steps to match your Django STATUS_CHOICES
  const steps = ["New", "Accepted", "Completed", "Cancelled"];

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
        📦 My Orders
      </h1>

      <div className="grid gap-6">
        {orders.map((order) => {
          const orderTotal = Number(order.order_total) || 0;
          const orderTax = Number(order.tax) || 0;

          // Find the current step index
          const currentStepIndex = steps.findIndex(
            (s) => s.toLowerCase() === order.status.toLowerCase()
          );

          return (
            <div
              key={order.id}
              className="p-6 rounded-2xl bg-gray-900 text-white border border-purple-500/40 
                         shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-purple-400">
                Order #{order.order_number}
              </h2>
              <p className="mb-1">
                Status:{" "}
                <span
                  className={`font-bold ${
                    order.status === "Completed"
                      ? "text-green-400"
                      : order.status === "Accepted"
                      ? "text-blue-400"
                      : order.status === "New"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="mb-3">
                Total:{" "}
                <span className="text-green-300 font-bold">
                  ₹{(orderTotal + orderTax).toFixed(2)}
                </span>{" "}
                <span className="text-sm text-gray-400">
                  (Subtotal: ₹{orderTotal.toFixed(2)}, Tax: ₹
                  {orderTax.toFixed(2)})
                </span>
              </p>

              {/* Timeline */}
              <div className="flex items-center justify-between mt-6 mb-4">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex flex-col items-center w-full relative"
                  >
                    {/* Circle */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold 
                      ${
                        index <= currentStepIndex
                          ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Label */}
                    <span
                      className={`mt-2 text-xs ${
                        index <= currentStepIndex
                          ? "text-purple-300"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>

                    {/* Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-4 left-1/2 w-full h-1 
                        ${
                          index < currentStepIndex
                            ? "bg-purple-500"
                            : "bg-gray-700"
                        }`}
                        style={{ transform: "translateX(50%)" }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              <Link
                to={`/order-success?order_id=${order.id}`}
                className="inline-block mt-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 
                           text-white px-5 py-2 rounded-full shadow-md 
                           hover:scale-110 hover:shadow-cyan-400/50 
                           transition-transform duration-300"
              >
                🔍 View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;

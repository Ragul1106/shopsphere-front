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
    return <p className="p-10 text-center">You have no orders yet.</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.map(order => {
        const orderTotal = Number(order.order_total) || 0;
        const orderTax = Number(order.tax) || 0;

        return (
          <div key={order.id} className="border p-4 rounded mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Order #{order.order_number}
            </h2>
            <p>Status: <strong>{order.status}</strong></p>
            <p>
              Total: ₹{(orderTotal + orderTax).toFixed(2)} (Subtotal: ₹{orderTotal.toFixed(2)}, Tax: ₹{orderTax.toFixed(2)})
            </p>
            <Link
              to={`/order-success?order_id=${order.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;

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
        <h1 className="text-3xl font-bold mb-4">Order not found</h1>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded"
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
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully!
      </h1>

      <div className="border p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
        <p>
          {order.address}, {order.city}, {order.state}, {order.postal_code},{" "}
          {order.country}
        </p>
        <p>Phone: {order.phone}</p>
      </div>

      <div className="border p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Product</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td>{item.product.title || item.product.name}</td>
                <td>{item.quantity}</td>
                <td>₹{Number(item.product_price || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mb-6">
        <p>
          <strong>Subtotal:</strong> ₹{orderTotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax:</strong> ₹{orderTax.toFixed(2)}
        </p>
        <p className="text-lg font-bold">
          <strong>Total:</strong> ₹{grandTotal.toFixed(2)}
        </p>
      </div>

      <Link
        to="/products"
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;

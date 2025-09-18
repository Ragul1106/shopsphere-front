import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { createOrder } from "../api/productService";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  // Prefill user profile
  useEffect(() => {
    if (user && user.profile) {
      setAddress(user.profile.address || "");
      setCity(user.profile.city || "");
      setState(user.profile.state || "");
      setCountry(user.profile.country || "");
      setPostalCode(user.profile.postal_code || "");
      setPhone(user.profile.phone_number || "");
    }
  }, [user]);

  const handleCheckout = async () => {
    if (!address || !city || !country) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);

    const items = cart.map((item) => ({
      product: item.id, // backend expects product ID
      quantity: item.quantity,
      product_price: Number(item.price), // optional if backend calculates price
    }));

    const payload = {
      items,
      address,
      city,
      state,
      country,
      postal_code: postalCode,
      phone,
      payment_method: paymentMethod,
    };

    try {
      const order = await createOrder(payload);
      clearCart();
      toast.success("Order placed successfully!");
      window.location.href = `/order-success?order_id=${order.id}`;
    } catch (err) {
      console.error("Checkout error:", err.response?.data || err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <p className="text-lg font-semibold mb-4">Total Amount: ₹{Number(total || 0).toFixed(2)}</p>

      {/* Shipping Form */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Address *</label>
        <textarea
          className="w-full border rounded p-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="w-full border rounded p-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City *"
        />
        <input
          className="w-full border rounded p-2"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="w-full border rounded p-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country *"
        />
        <input
          className="w-full border rounded p-2"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Postal Code"
        />
      </div>

      <input
        className="w-full border rounded p-2 mb-4"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />

      {/* Payment Method */}
      <select
        className="w-full border rounded p-2 mb-4"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="cod">Cash on Delivery</option>
        <option value="card">Credit/Debit Card</option>
        <option value="upi">UPI</option>
      </select>

      <button
        className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Order"}
      </button>
    </div>
  );
};

export default Checkout;

import axiosInstance from "./axios";

// ----------------------
// Products
// ----------------------

// List products (supports search, filter, pagination)
export const fetchProducts = async (params = {}) => {
  const res = await axiosInstance.get("/products/", { params });
  // DRF paginated response: {count, next, previous, results}
  return res.data;
};

// Get single product by slug
export const fetchProductBySlug = async (slug) => {
  const res = await axiosInstance.get(`/products/${slug}/`);
  return res.data;
};

// Create product (admin only, with image upload)
export const createProduct = async (payload) => {
  const res = await axiosInstance.post("/products/", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ----------------------
// Categories
// ----------------------

// Get categories
export const fetchCategories = async () => {
  const res = await axiosInstance.get("/categories/");
  return res.data;
};

// ----------------------
// Orders
// ----------------------

// Create an order
// payload example: { items: [{ product: 1, qty: 2 }], shipping_address: "...", payment_method: "card" }
export const createOrder = async (payload) => {
  try {
    const res = await axiosInstance.post("/orders/", payload);
    return res.data;
  } catch (err) {
    console.error("createOrder error:", err);
    throw err;
  }
};

// Get order by ID
export const fetchOrder = async (orderId) => {
  const res = await axiosInstance.get(`/orders/${orderId}/`);
  return res.data;
};

// List all orders for logged-in user
export const fetchUserOrders = async () => {
  const res = await axiosInstance.get("/orders/my-orders/");
  return res.data;
};

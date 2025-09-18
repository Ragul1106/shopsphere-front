import axiosInstance from "./axios";

// Fetch paginated products
export const fetchProducts = async (params = {}) => {
  try {
    const res = await axiosInstance.get("/products/", { params });
    return res.data;
  } catch (err) {
    console.error("fetchProducts error:", err);
    throw err;
  }
};

// Fetch single product by slug
export const fetchProductBySlug = async (slug) => {
  try {
    const res = await axiosInstance.get(`/products/${slug}/`);
    return res.data;
  } catch (err) {
    console.error("fetchProductBySlug error:", err);
    throw err;
  }
};

// Create a new product
export const createProduct = async (payload) => {
  try {
    const res = await axiosInstance.post("/products/", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("createProduct error:", err);
    throw err;
  }
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories/");
    return res.data;
  } catch (err) {
    console.error("fetchCategories error:", err);
    throw err;
  }
};

// Create new order
export const createOrder = async (payload) => {
  try {
    const res = await axiosInstance.post("/orders/", payload);
    return res.data;
  } catch (err) {
    console.error("createOrder error:", err);
    throw err;
  }
};

// Fetch specific order
export const fetchOrder = async (orderId) => {
  try {
    const res = await axiosInstance.get(`/orders/${orderId}/`);
    return res.data;
  } catch (err) {
    console.error("fetchOrder error:", err);
    throw err;
  }
};

// Fetch orders of current user
export const fetchUserOrders = async () => {
  try {
    const res = await axiosInstance.get("/orders/my-orders/");
    return res.data;
  } catch (err) {
    console.error("fetchUserOrders error:", err);
    throw err;
  }
};

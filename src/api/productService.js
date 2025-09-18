import axiosInstance from "./axios";

export const fetchProducts = async (params = {}) => {
  const res = await axiosInstance.get("/products/", { params });
  return res.data;
};

export const fetchProductBySlug = async (slug) => {
  const res = await axiosInstance.get(`/products/${slug}/`);
  return res.data;
};

export const createProduct = async (payload) => {
  const res = await axiosInstance.post("/products/", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const fetchCategories = async () => {
  const res = await axiosInstance.get("/categories/");
  return res.data;
};


export const createOrder = async (payload) => {
  try {
    const res = await axiosInstance.post("/orders/", payload);
    return res.data;
  } catch (err) {
    console.error("createOrder error:", err);
    throw err;
  }
};

export const fetchOrder = async (orderId) => {
  const res = await axiosInstance.get(`/orders/${orderId}/`);
  return res.data;
};

export const fetchUserOrders = async () => {
  const res = await axiosInstance.get("/orders/my-orders/");
  return res.data;
};

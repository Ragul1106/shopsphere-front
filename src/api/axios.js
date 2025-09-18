import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || 'http://localhost:8000'; 


const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use((config) => {
  const access = localStorage.getItem('access_token');
  if (access) {
    config.headers['Authorization'] = `Bearer ${access}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh_token');

      if (refresh) {
        try {
          const resp = await axios.post(`${API_URL}/token/refresh/`, { refresh }); 
          localStorage.setItem('access_token', resp.data.access);

          axiosInstance.defaults.headers['Authorization'] = `Bearer ${resp.data.access}`;
          originalRequest.headers['Authorization'] = `Bearer ${resp.data.access}`;

          return axiosInstance(originalRequest);
        } catch (err) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(err);
        }
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

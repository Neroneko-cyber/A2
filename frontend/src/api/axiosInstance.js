import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8321',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh or errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Implement refresh token logic here if needed
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

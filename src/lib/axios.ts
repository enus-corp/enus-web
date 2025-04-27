import axios from 'axios';
import { refreshToken as refresh } from '@/services/auth';
import { Token } from '@/types/token';
import { removeTokens } from '@/utils/jwt';

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080', // Fallback just in case
  baseURL: "", // relative URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from storage (e.g., localStorage)
    let token: string | null = null;
    // Ensure this runs only client-side where localStorage is available
    if (typeof window !== 'undefined') { 
      token = localStorage.getItem('accessToken');
    }
    
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    localStorage.removeItem("accessToken");

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        
        if (!refreshTokenValue) {
          throw new Error('No refresh token available');
        }

        // Attempt to refresh the token
        console.log("Refreshing new token")
        const newTokens : Token = await refresh({ refreshToken: refreshTokenValue });
        
        // Update the tokens in localStorage
        localStorage.setItem('accessToken', newTokens.accessToken);
        localStorage.setItem('refreshToken', newTokens.refreshToken);

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, clear tokens and redirect to login
        removeTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 
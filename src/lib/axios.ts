import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080', // Fallback just in case
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
  (error) => {
    console.log(error.response.status)
    if (typeof window !== 'undefined' && error.response && error.response.status === 401) {
      console.log('Unauthorized access (401). Token might be expired. Redirecting to login.');
      
      // Remove the expired token
      localStorage.removeItem('accessToken'); 
      
      // Redirect to login page
      window.location.href = '/login'; 
      
      return new Promise(() => {});
    }
    
    // For any other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance; 
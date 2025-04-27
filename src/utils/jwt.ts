import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;  // Expiration time (Unix timestamp)
  iat: number;  // Issued at time
  sub: string;  // Subject (usually user ID)
  // Add other claims as needed
}

export const getTokenExpiration = (token: string): Date | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // Convert Unix timestamp to Date
    return new Date(decoded.exp * 1000);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // Check if token is expired
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Consider invalid tokens as expired
  }
};

export const getTokenRemainingTime = (token: string): number | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    return Math.max(0, expirationTime - currentTime);
  } catch (error) {
    console.error('Error calculating token remaining time:', error);
    return null;
  }
}; 

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
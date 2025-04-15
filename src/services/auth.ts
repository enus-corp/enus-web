import axiosInstance from '../lib/axios'; 
import axios from 'axios'; 

// --- General Server Response Structure ---
interface GeneralServerResponse<T> {
  error: boolean;
  message: string;
  code: number;
  data?: T; // Data is optional
}

interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
  refreshToken: string;
}

// Note: Gender is string here, assuming backend handles enum conversion
interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  gender: string; // Consider 'male' | 'female' | 'other' if known
  age: number;
}

// Define expected *data* field structure within GeneralServerResponse on successful signup 
interface SignupSuccessData {
  id: number; 
  username: string;
  email: string;
}

export const loginUser = async (credentials: SigninRequest): Promise<SigninResponse> => {
  try {
    // Expect GeneralServerResponse wrapping the SigninResponse (Token data)
    const response = await axiosInstance.post<GeneralServerResponse<SigninResponse>>('/api/auth/signin', credentials); // Updated endpoint

    // Check the 'error' flag
    if (response.data.error) {
      throw new Error(response.data.message || 'Login failed. Please check your credentials.');
    }

    // Login successful, return the token data
    return response.data.data!; // Return the accessToken and refreshToken

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage = error.response?.data?.message;
      throw new Error(backendMessage || 'An error occurred during login. Please try again.');
    } else if (error instanceof Error) {
      // Re-throw errors from the try block (like backend validation errors)
      throw error;
    } else {
      throw new Error('An unknown error occurred during login.');
    }
  }
};

export const signupUser = async (userData: SignupRequest): Promise<SignupSuccessData | { message: string }> => {
  try {
    // Expect the general response structure, wrapping the success data type
    const response = await axiosInstance.post<GeneralServerResponse<SignupSuccessData>>('/api/auth/signup', userData);

    // Check the 'error' flag from the general response
    if (response.data.error) {
      // If error is true, throw an error with the message from the response
      console.error('Signup API Error:', response.data.message);
      throw new Error(response.data.message || 'Signup failed due to a server error.');
    }

    // If error is false, signup was successful
    console.log('Signup successful:', response.data);
    // Return the 'data' field (e.g., created user info) or just a success message object
    return response.data.data || { message: response.data.message || 'Signup successful!' };

  } catch (error) {
    console.error('Signup Request Failed:', error);
    // Handle network errors or errors thrown from the try block
    if (axios.isAxiosError(error)) {
      // Handle potential Axios-specific errors (though backend errors are caught above now)
      const backendMessage = error.response?.data?.message;
      throw new Error(backendMessage || 'An error occurred during signup. Please try again.');
    } else if (error instanceof Error) {
      // Re-throw errors caught from the try block (like backend validation errors)
      throw error;
    } else {
      throw new Error('An unknown error occurred during signup.');
    }
  }
};

export const oauthLogin = (provider: string): void => {
  // Get the base URL from the axios instance
  const baseURL = axiosInstance.defaults.baseURL;
  // Use window.location.href to redirect the user to the backend endpoint  
  window.location.href = `${baseURL}/api/oauth/${provider.toLowerCase()}`;
};

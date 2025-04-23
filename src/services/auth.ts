import { SigninRequest } from '@/types/request/signinRequest';
import axiosInstance from '../lib/axios'; 
import axios from 'axios'; 
import { SignupRequest } from '@/types/request/signupRequest';
import { SigninResponse } from '@/types/response/signinResponse';
import { protectedApi, publicApi } from './api';
import { Token } from '@/types/token';
import { UserDTO } from '@/types/user';
import { RefreshTokenRequest } from '@/types/request/refreshTokenRequest';

export const loginUser = async (credentials: SigninRequest): Promise<SigninResponse> => {
  /**
   * Login a user
   */
  try {
    const response = await publicApi.signin(credentials);

    if (response.data) {
      if (!response.data.error) {
        // success
        console.log('Login successful:', response.data);
        return response.data.data!; 
      } else {
        // fail
        console.error('Login API Error:', response.data.message);
        throw new Error(response.data.message || 'Login failed. Please check your credentials.');
      }
    } else {
      // unexpected error
      throw new Error("error occured during login");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage = error.response?.data?.message;
      throw new Error(backendMessage || 'An error occurred during login. Please try again.');
    } else {
      throw error;
    } 
  }
};

export const signupUser = async (userData: SignupRequest): Promise<void> => {
  /**
   * Sign up a new user
   */
  try {
    const response = await publicApi.signup(userData);
    if (response.data) {
      if (!response.data.error) {
        // success
        console.log('Signup successful:', response.data);
      } else {
        // fail
        console.error('Signup API Error:', response.data.message);
        throw new Error(response.data.message || 'Signup failed due to a server error.');
      }
    } else {
      // unexpected error
      throw new Error("error occured during signup");
    }
  } catch (error) {
    console.error('Signup Request Failed:', error);
    if (axios.isAxiosError(error)) {
      const backendMessage = error.response?.data?.message;
      throw new Error(backendMessage || 'An error occurred during signup. Please try again.');
    } else {
      throw error;
    }
  }
};

export const exchangeToken = async (tempToken: {tempToken: string}): Promise<{token: Token, user: UserDTO}> => {
  /**
   * Exchange temporary token for access and refresh tokens
   * Save tokens to local storage
   * Return token and user data
   */
  try {
    const response = await publicApi.exchangeToken(tempToken);
    if (response.data) {
      if (!response.data.error) {
        const { token } = response.data.data!;
        // save tokens to local storage
        localStorage.setItem('accessToken', token.accessToken);
        localStorage.setItem('refreshToken', token.refreshToken);

        return response.data.data!;
      } else {
        throw new Error(response.data.message || "error occured during exchange token");
      }
    }
    throw new Error("error occured during exchange token");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage = error.response?.data?.message;
      throw new Error(backendMessage || 'An error occurred during exchange token. Please try again.');
    } else {
      throw error;
    }
  }
}

export const oauthLogin = (provider: string): void => {
  /**
   * Redirect to OAuth provider
   */
  const baseURL = axiosInstance.defaults.baseURL;
  window.location.href = `${baseURL}/api/oauth/${provider.toLowerCase()}`;
};

export const refreshToken = async (refreshToken: RefreshTokenRequest): Promise<Token> => {
  /**
   * Refresh access token
   */
  try {
    const response = await protectedApi.refreshToken(refreshToken);

    if (response.data) {
      if (!response.data.error) {
        return response.data.data!;
      } else {
        throw new Error(response.data.message || 'Failed to refresh token');
      }
    }
    throw new Error("error occured during exchange token");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage = error.response?.data?.message;
      throw new Error(backendMessage || 'An error occurred during token refresh');
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unknown error occurred during token refresh');
    }
  }
};

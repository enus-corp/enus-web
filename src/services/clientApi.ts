import axiosInstance from "@/lib/axios";
import { tokenService } from "./tokenService"
import { AxiosError, AxiosRequestConfig } from "axios";
import { GeneralServerResponse } from "@/types/response/serverResponse";

const clientApi = {
    async request<T>(endpoint: string, options: AxiosRequestConfig = {}) : Promise<GeneralServerResponse<T>> {
        try {
            // Create a new config object with all options
            const config: AxiosRequestConfig = {
                url: endpoint,
                ...options,  // Spread all other options first
                headers: {
                    ...options.headers  // Keep any custom headers
                },
                withCredentials: true  // Important for cookies
            };

            const response = await axiosInstance(config);
            return response.data;

        } catch (error) {
            // Only attempt token refresh if:
            // 1. The error is 401 (Unauthorized)
            // 2. This is not already a refresh token request (to prevent infinite loops)
            // 3. This is not an initial login request (signin/signup)
            if (error instanceof AxiosError && 
                error.response?.status === 401 && 
                !endpoint.includes('/api/auth/refresh') &&
                !endpoint.includes('/api/auth/signin') &&
                !endpoint.includes('/api/auth/signup')) {
                try {
                    await tokenService.refreshAccessToken();
                    // Retry the original request with the new token (cookie)
                    return this.request(endpoint, options);
                } catch (refreshError) {
                    // If refresh fails, redirect to login
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                    throw refreshError;
                }
            }
            throw error;
        }
    },
    async get<T>(endpoint: string) : Promise<GeneralServerResponse<T>> {
        return this.request<T>(endpoint)
    },
    async post<T>(endpoint: string, data: unknown) : Promise<GeneralServerResponse<T>> {
        return this.request<T>(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data)
        })
    },
    async put<T>(endpoint: string, data: unknown) : Promise<GeneralServerResponse<T>> {
        return this.request<T>(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data)
        })
    },
    async delete<T>(endpoint: string) : Promise<GeneralServerResponse<T>> {
        return this.request<T>(endpoint, { method: "DELETE" })
    }
}

export default clientApi;
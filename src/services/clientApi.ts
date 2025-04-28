import axiosInstance from "@/lib/axios";
import { tokenService } from "./tokenService"
import { AxiosError, AxiosRequestConfig } from "axios";
import { GeneralServerResponse } from "@/types/response/serverResponse";

const clientApi = {
    async request<T>(endpoint: string, options: AxiosRequestConfig = {}) : Promise<GeneralServerResponse<T>> {
        try {
            const token = await tokenService.getAccessToken();
            const response = await axiosInstance({
                url: endpoint,
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            return response.data;

        } catch (error) {
            if ( error instanceof AxiosError && error.response?.status === 401) {
                await tokenService.refreshAccessToken();
                return this.request(endpoint, options);
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
        return this.request<T>(endpoint, {
            method: "DELETE"
        })
    }
}

export default clientApi;
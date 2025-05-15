import { User } from "@/types/user";
import { protectedApi } from "./api";
import axios from "axios";
import { UpdateUserRequest } from "@/types/request/updateUserRequest";

export const self = async (): Promise<User> => {
    try {
        const response = await protectedApi.self();
        console.log(response.data);
        if (response.data) {
            if (!response.data.error) {
                // success
                return response.data.data!;
            } else {
                // fail
                throw new Error(response.data.message || "error occured during self");
            }
        }
        // unexpected error
        throw new Error("error occured during self");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const backendMessage = error.response?.data?.message;
            throw new Error(backendMessage || 'An error occurred during self. Please try again.');
        } else {
            throw error;
        }
    }
}

export const update = async (userData: UpdateUserRequest): Promise<User> => {
    try {
        const response = await protectedApi.update(userData);
        if (response.data) {
            if (!response.data.error) {
                // success
                return response.data.data!;
            } else {
                // fail
                throw new Error(response.data.message || "error occured during update");
            }
        }
        // unexpected error
        throw new Error("error occured during update");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const backendMessage = error.response?.data?.message;
            throw new Error(backendMessage || 'An error occurred during update. Please try again.');
        } else {
            throw error;
        }
    }
}

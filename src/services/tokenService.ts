import axiosInstance from "@/lib/axios";

class TokenService {
    async refreshAccessToken(): Promise<void> {
        try {
            // Send request to Next.js BFF to refresh access token
            // The refresh token cookie will be sent automatically
            const response = await axiosInstance.post("/api/auth/refresh", {}, {
                withCredentials: true
            });

            if (response.status !== 200) {
                throw new Error("Failed to refresh access token");
            }
            // The new access token will be set as a cookie by the BFF
        } catch (error) {
            throw error;
        }
    }
}

export const tokenService = new TokenService();
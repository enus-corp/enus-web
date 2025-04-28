import axiosInstance from "@/lib/axios";

class TokenService {
    private accessToken: string | null = null;
    private refreshPromise: Promise<string> | null = null;

    async getAccessToken(): Promise<string> {
        if (!this.accessToken) {
            return this.refreshAccessToken();
        }
        return this.accessToken;
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    clearAccessToken() {
        this.accessToken = null;
    }

    async refreshAccessToken(): Promise<string> {
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = new Promise<string>(async (resolve, reject) => {
            try {
                // send request to Next.js BFF to refresh access token
                const response = await axiosInstance.post("/api/auth/refresh", {}, {
                    "withCredentials": true
                });

                if (response.status !== 200) {
                    throw new Error("Failed to refresh access token");
                }

                const accessToken = response.data.accessToken;
                this.setAccessToken(accessToken);
                resolve(accessToken);
                
            } catch (error) {
                reject(error);
            }
        }).finally(() => {
            this.refreshPromise = null
        });

        return this.refreshPromise;
    }

}

export const tokenService = new TokenService();
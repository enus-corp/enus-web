import axiosInstance from "@/lib/axios";
import { SigninRequest } from "@/types/request/signinRequest";
import { SignupRequest } from "@/types/request/signupRequest";
import { UpdateUserRequest } from "@/types/request/updateUserRequest";
import { SigninResponse } from "@/types/response/signinResponse";
import { GeneralServerResponse } from "@/types/response/serverResponse";
import { UserDTO } from "@/types/user";
import { Token } from "@/types/token";

// api without authentication
export const publicApi = {
    signin: (credentials: SigninRequest) => axiosInstance.post<GeneralServerResponse<SigninResponse>>("/api/auth/signin", credentials),
    signup: (userData: SignupRequest) => axiosInstance.post<GeneralServerResponse<null>>("/api/auth/signup", userData),
    exchangeToken: (tempToken: {tempToken: string}) => axiosInstance.post<GeneralServerResponse<{token: Token, user: UserDTO}|null>>("/api/oauth/exchange-token", tempToken),
}

// api with authentication
export const protectedApi = {
    self: () => axiosInstance.get<GeneralServerResponse<UserDTO>>("/api/user/self"),
    update: (userDate: UpdateUserRequest) => axiosInstance.put<GeneralServerResponse<null>>("/api/user/update", userDate),
}
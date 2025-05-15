import { SigninRequest } from "@/types/request/signinRequest";
import { SignupRequest } from "@/types/request/signupRequest";
import { UpdateUserRequest } from "@/types/request/updateUserRequest";
import { SigninResponse } from "@/types/response/signinResponse";
import { GeneralServerResponse } from "@/types/response/serverResponse";
import { User } from "@/types/user";
import { Token } from "@/types/token";
import { RefreshTokenRequest } from "@/types/request/refreshTokenRequest";
import serverAxios from "@/lib/serverAxios";

// api without authentication
export const publicApi = {
    signin: (credentials: SigninRequest) => serverAxios.post<GeneralServerResponse<SigninResponse>>("/api/auth/signin", credentials),
    signup: (userData: SignupRequest) => serverAxios.post<GeneralServerResponse<null>>("/api/auth/signup", userData),
    exchangeToken: (tempToken: {tempToken: string}) => serverAxios.post<GeneralServerResponse<{token: Token, user: User}|null>>("/api/oauth/exchange-token", tempToken),
}

// api with authentication
export const protectedApi = {
    self: () => serverAxios.get<GeneralServerResponse<User>>("/api/user/self"),
    update: (userDate: UpdateUserRequest) => serverAxios.put<GeneralServerResponse<User>>("/api/user/update", userDate),
    refreshToken: (refreshToken: RefreshTokenRequest) => serverAxios.post<GeneralServerResponse<Token>>("/api/auth/refresh", refreshToken),
}
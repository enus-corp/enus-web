import { Token } from "../token";
import { User } from "../user";

export interface OAuthCallbackResponse {
    token: Token,
    user: User
}

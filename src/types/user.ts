export interface UserDTO {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    gender: 'male' | 'female' | 'other';
    age: number;
    isOauthUser: boolean;
}
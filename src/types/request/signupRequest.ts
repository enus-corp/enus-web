export interface SignupRequest {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    gender: string; // Consider 'male' | 'female' | 'other' if known
    age: number;
}
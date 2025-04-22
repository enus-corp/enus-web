export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    username: string;
    age: number;
    gender: 'male' | 'female' | 'other';
}

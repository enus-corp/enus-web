
// Response from service layer
export interface ServiceResponse<T> {
    data: T;
    error: boolean;
    message: string;
}

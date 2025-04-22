export interface GeneralServerResponse<T> {
    error: boolean;
    message: string;
    code: number;
    data: T | null;
}
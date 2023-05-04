export interface RegularErrorType {
  error: string;
  error_description: string;
}

export default interface AuthError {
  error: {
    status: number;
    message: string;
  };
}

import { SuccessResponse } from "@shared/http/http.types";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest extends Pick<AuthRequest, 'password'> {
  secret: string;
  token: string;
}

export interface AuthResponse extends SuccessResponse {
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: string;
}

import { toast } from "react-toastify";
import CrudService from "./CrudService";
import { SuccessResponse } from "../types/success-response.type";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest extends Pick<AuthRequest, "password"> {
  secret: string;
  token: string;
}

export interface AuthResponse extends SuccessResponse {
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: string;
}

class AuthService extends CrudService {
  public uniqueName: string;

  constructor() {
    super("auth");
    this.uniqueName = "auth";
  }

  async login(data: AuthRequest) {
    const routeParams = {};

    const response = await this.create<AuthRequest, AuthResponse>(
      data,
      routeParams,
      "/login"
    );

    if ("details" in response && 'error' in response && !!response.error) {
      const error = response.details;

      if (typeof error === "string") {
        toast.error(error);
        return null;
      }

      error.forEach(({ error, field_name }) => {
        toast.error(`The field: ${field_name} ${error}`);
      });
      return null;
    }

    localStorage.setItem("access_token", response.access_token);

    return response;
  }

  async forgotPassword(data: { email: AuthRequest["email"] }) {
    const routeParams = {};

    const response = await this.create<
      { email: AuthRequest["email"] },
      AuthResponse
    >(data, routeParams, "/password-reset");

    if ("details" in response && 'error' in response && !!response.error) {
      const error = response.details;

      if (typeof error === "string") {
        toast.error(error);
        return null;
      }

      error.forEach(({ error, field_name }) => {
        toast.error(`Error field: ${field_name}. Reason: ${error}`);
      });
      return null;
    }

    toast.success(response.detail);

    return response;
  }

  async resetPassword(data: ResetPasswordRequest) {
    const routeParams = {};

    const response = await this.create<ResetPasswordRequest, AuthResponse>(
      data,
      routeParams,
      "/password-set"
    );

    if ("details" in response && 'error' in response && !!response.error) {
      const error = response.details;

      if (typeof error === "string") {
        toast.error(error);
        return null;
      }

      error.forEach(({ error, field_name }) => {
        toast.error(`The field: ${field_name} ${error}`);
      });
      return null;
    }
    console.log('here')


    return response;
  }
}

export default new AuthService();

import { AuthRequest, AuthResponse, ResetPasswordRequest } from './auth.types';
import { toast } from 'react-toastify';
import { Nullable } from '@shared/types/nullable.type';
import { CrudService } from '@shared/http/crud.service';

class AuthService extends CrudService {
  public uniqueName: string;

  constructor() {
    super('auth');
    this.uniqueName = 'auth';
  }

  async login(data: AuthRequest): Promise<Nullable<AuthResponse>> {
    const routeParams = {};

    const response = await this.create<AuthRequest, AuthResponse>(
      data,
      routeParams,
      '/login'
    );

    if (!response) return null;

    if ('details' in response) {
      const error = response.details;

      if (typeof error === 'string') {
        return null;
      }

      error.forEach(({ error, field_name }) => {
        toast.error(`The field: ${field_name} ${error}`);
      });
      return null;
    }

    if (response.error) {
      return null;
    }

    localStorage.setItem('access_token', response.access_token);

    return response;
  }

  async forgotPassword(data: { email: AuthRequest['email'] }) {
    const routeParams = {};

    const response = await this.create<
      { email: AuthRequest['email'] },
      AuthResponse
    >(data, routeParams, '/password-reset');

    if ('details' in response && 'error' in response && !!response.error) {
      const error = response.details;

      if (typeof error === 'string') {
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
      '/password-set'
    );

    if ('details' in response && 'error' in response && !!response.error) {
      const error = response.details;

      if (typeof error === 'string') {
        toast.error(error);
        return null;
      }

      error.forEach(({ error, field_name }) => {
        toast.error(`The field: ${field_name} ${error}`);
      });
      return null;
    }

    return response;
  }
}

export default new AuthService();

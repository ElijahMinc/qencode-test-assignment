import { AuthRequest } from '@entities/Auth/api/auth.types';

export interface IResetPasswordFormProps {
  handleSubmit: (data: {
    password: Pick<AuthRequest, 'password'>;
    ['confirm-password']: string;
  }) => void;
  isDisabledSubmitBtn?: boolean;
}

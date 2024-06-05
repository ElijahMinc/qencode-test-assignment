import { useMutation } from '@tanstack/react-query';
import { AuthRequest, ResetPasswordRequest } from './auth.types';
import authService from './auth.service';

export const useLoginMutation = () => {
  const loginMutation = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (data: AuthRequest) => authService.login(data),
  });

  return {
    loginMutation,
  };
};

export const useResetPasswordMutation = () => {
  const resetPassword = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
  });

  return {
    resetPassword,
  };
};

export const useForgotPasswordMutation = () => {
  const forgotPasswordMutation = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (data: { email: AuthRequest['email'] }) =>
      authService.forgotPassword(data),
  });

  return {
    forgotPasswordMutation,
  };
};

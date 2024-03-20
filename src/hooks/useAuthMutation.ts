import { useMutation } from "react-query";
import AuthService, {
  AuthRequest,
  ResetPasswordRequest,
} from "services/AuthService";

export const useAuthMutation = () => {
  const loginMutation = useMutation((data: AuthRequest) =>
    AuthService.login(data)
  );

  const forgotPasswordMutation = useMutation(
    (data: { email: AuthRequest["email"] }) => AuthService.forgotPassword(data)
  );

  const resetPasswordMutation = useMutation((data: ResetPasswordRequest) =>
    AuthService.resetPassword(data)
  );

  return {
    loginMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
  };
};

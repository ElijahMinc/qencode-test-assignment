import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '@entities/Auth/api/auth.queries';
import { AuthRequest } from '@entities/Auth/api/auth.types';
import { toast } from 'react-toastify';
import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { ForgotPasswordForm } from '@features/Auth/ForgotPassword/forgot-password-form.ui';

export const ForgotPasswordFormW = () => {
  const { setAuth } = useAuth();
  const {
    forgotPasswordMutation: { isPending, mutateAsync: forgotPasswordByEmailFn },
  } = useForgotPasswordMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: { email: AuthRequest['email'] }) => {
    const res = await forgotPasswordByEmailFn(data);

    if (!res) {
      toast.error('User not found');

      return;
    }

    toast.success('You have successfully logged in');

    setAuth(true);
    navigate(ROUTER_PATHS.HOME, { replace: true });
  };

  return (
    <ForgotPasswordForm
      handleSubmit={onSubmit}
      isDisabledSubmitBtn={isPending}
    />
  );
};

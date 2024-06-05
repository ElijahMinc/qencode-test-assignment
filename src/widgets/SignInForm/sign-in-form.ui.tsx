import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@entities/Auth/api/auth.queries';
import { SignInForm } from '@features/Auth/SignInForm/sign-in-form.ui';
import { AuthRequest } from '@entities/Auth/api/auth.types';
import { toast } from 'react-toastify';
import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';

export const SignInFormW = () => {
  const { setAuth } = useAuth();
  const {
    loginMutation: { isPending, mutateAsync: loginFn },
  } = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: AuthRequest) => {
    const res = await loginFn(data);

    if (!res) {
      toast.error('User not found');

      return;
    }

    toast.success('You have successfully logged in');
    setAuth(true);
    navigate(ROUTER_PATHS.HOME, { replace: true });
  };

  return <SignInForm handleSubmit={onSubmit} isDisabledSubmitBtn={isPending} />;
};

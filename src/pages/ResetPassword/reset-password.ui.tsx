/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { Nullable } from '@shared/types/nullable.type';
import styles from './reset-password-styles.module.css';
import { ResetPasswordForm } from '@features/Auth/ResetPasswordForm/reset-password-form.ui';
import { useResetPasswordMutation } from '@entities/Auth/api/auth.queries';
import { toast } from 'react-toastify';

export const ResetPasswordPage = () => {
  const {
    resetPassword: { isPending, mutateAsync: resetPasswordFn },
  } = useResetPasswordMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    // const res = await resetPasswordFn(data);
    // if (!res) {
    //   toast.error('User not found');
    //   return;
    // }
    // toast.success('You have successfully logged in');
    // navigate(ROUTER_PATHS.HOME, { replace: true });
  };
  return (
    <ResetPasswordForm
      handleSubmit={onSubmit}
      isDisabledSubmitBtn={isPending}
    />
  );
};

import { useForm } from '@shared/lib/hooks/form';
import { Button, Form } from '@shared/index';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { AuthRequest } from '@entities/Auth/api/auth.types';
import { useNavigate } from 'react-router-dom';
import { IResetPasswordFormProps } from './reset-password-form.types';
import {
  resetPasswordFormDefaultValues,
  resetPasswordFormSchema,
} from './constants/reset-password.constants';
import { PasswordField } from '@entities/PasswordField';

import styles from './reset-password-form-styles.module.css';

export const ResetPasswordForm = ({
  handleSubmit,
  isDisabledSubmitBtn = false,
}: IResetPasswordFormProps) => {
  const navigate = useNavigate();

  const {
    values,
    handleSubmit: onSubmit,
    handleBlur,
    handleChange,
    errors,
    clearValues,
  } = useForm({
    callback: (data: {
      password: Pick<AuthRequest, 'password'>;
      ['confirm-password']: string;
    }) => {
      console.log(data);
      handleSubmit(data);
      clearValues(resetPasswordFormDefaultValues);
    },
    schema: resetPasswordFormSchema,
    initialValues: resetPasswordFormDefaultValues,
  }) as any;

  return (
    <Form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.form__title}>Create new Password?</h2>
      <div className={styles.inputs}>
        <PasswordField
          name="password"
          value={values.password}
          placeholder="Work email"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['password']}
          labelOptions={{
            text: 'Password',
            position: 'top',
          }}
        />

        <PasswordField
          name="confirm-password"
          value={values['confirm-password']}
          placeholder="Work email"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['confirm-password']}
          labelOptions={{
            text: 'Confirm Password',
            position: 'top',
          }}
        />
      </div>

      <div className={styles.btns}>
        <Button
          type="submit"
          className={styles.submitBtn}
          disabled={isDisabledSubmitBtn}
          appearance="primary"
        >
          Send
        </Button>

        <Button type="button" onClick={() => navigate(`/${ROUTER_PATHS.AUTH}`)}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

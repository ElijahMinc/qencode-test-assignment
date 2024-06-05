/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISignInFormProps } from './sign-in-form.types';
import {
  signInFormDefaultValues,
  signInFormSchema,
} from './constants/sign-in-form.constants';

import { Link } from 'react-router-dom';
import GithubIcon from '@shared/assets/github.svg';
import GoogleIcon from '@shared/assets/google.svg';
import { useForm } from '@shared/lib/hooks/form';
import { Button, Form, Input } from '@shared/index';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { AuthRequest } from '@entities/Auth/api/auth.types';

import styles from './sign-in-form.module.css';

export const SignInForm = ({
  handleSubmit,
  isDisabledSubmitBtn = false,
}: ISignInFormProps) => {
  const {
    values,
    handleSubmit: onSubmit,
    handleBlur,
    handleChange,
    errors,
    clearValues,
  } = useForm({
    callback: (data: AuthRequest) => {
      handleSubmit(data);
      clearValues(signInFormDefaultValues);
    },
    schema: signInFormSchema,
    initialValues: signInFormDefaultValues,
  }) as any;

  return (
    <Form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.form__title}>Log in to your account</h2>
      <div className={styles.form__signin}>
        <Button type="button">
          <img src={GoogleIcon} />
          Google
        </Button>
        <Button type="button">
          <img src={GithubIcon} />
          Github
        </Button>
      </div>
      <div className={styles.sep}>or</div>
      <div className={styles.inputs}>
        <Input
          name="email"
          type="input"
          value={values.email}
          placeholder="Work email"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['email']}
        />
        <Input
          name="password"
          type="password"
          value={values.password}
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['password']}
        />
      </div>
      <div className={styles.forgot_password}>
        <Link
          to={`${location.pathname}/${ROUTER_PATHS.FORGOT_PASSWORD}`}
          className="primary"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        className={styles.submitBtn}
        appearance="primary"
        disabled={isDisabledSubmitBtn}
      >
        Log in to Qencode
      </Button>

      <div className={styles.signUp}>
        Is your company new to Qencode?
        <a className={styles.signUp__link}>Sign up</a>
      </div>
    </Form>
  );
};

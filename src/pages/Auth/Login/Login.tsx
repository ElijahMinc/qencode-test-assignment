import { Link, useLocation, useNavigate } from "react-router-dom";
import GithubIcon from "assets/github.svg";
import GoogleIcon from "assets/google.svg";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "hooks/useAuth";
import { useAuthMutation } from "hooks/useAuthMutation";
import { Nullable } from "types/nullable.type";
import { AuthRequest } from "services/AuthService";
import { ROUTER_PATHS } from "router/paths";
import { Button } from "common/Button";
import { ThemedInput } from "components/ThemedInput";
import { PASSWORD_MIN_LENGTH } from "constants";

import styles from "../Auth.module.css";

export const Login = () => {
  const { setAuth } = useAuth();

  const {
    loginMutation: { mutateAsync: logIn, isLoading: logInLoading },
  } = useAuthMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<Nullable<HTMLFormElement>>(null);

  const [formValidHandler, setFormValidHandler] = useState({
    email: false,
    password: false,
  });

  const isDisabledSubmitButton =
    !Object.values(formValidHandler).every(Boolean) || logInLoading;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const isValidForm = Object.values(formValidHandler).every(Boolean);
    if (!isValidForm) return;

    const formData = Object.fromEntries(new FormData(formRef.current));

    const data: AuthRequest = {
      email: formData.email as string,
      password: formData.password as string,
    };

    const res = await logIn(data);

    if (!res) {
      return;
    }

    setAuth(true);

    toast.success("You have successfully logged in");

    navigate(ROUTER_PATHS.HOME, { replace: true });
  };

  return (
    <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
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
        <ThemedInput
          name="email"
          type="input"
          isEmail
          placeholder="Work email"
          handleValid={(status) =>
            setFormValidHandler((prevFormValidStatus) => ({
              ...prevFormValidStatus,
              email: status,
            }))
          }
        />
        <ThemedInput
          name="password"
          type="password"
          placeholder="Password"
          minLength={PASSWORD_MIN_LENGTH}
          handleValid={(status) =>
            setFormValidHandler((prevFormValidStatus) => ({
              ...prevFormValidStatus,
              password: status,
            }))
          }
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
        disabled={isDisabledSubmitButton}
      >
        Log in to Qencode
      </Button>

      <div className={styles.signUp}>
        Is your company new to Qencode?
        <a className={styles.signUp__link}>Sign up</a>
      </div>
    </form>
  );
};

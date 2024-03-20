import { useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { Nullable } from "types/nullable.type";
import { useAuthMutation } from "hooks/useAuthMutation";
import { ThemedInput } from "components/index";
import { Button } from "common/Button";
import { ROUTER_PATHS } from "router/paths";

import styles from "../Auth.module.css";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const formRef = useRef<Nullable<HTMLFormElement>>(null);
  const [formValidHandler, setFormValidHandler] = useState({
    email: false,
  });
  const {
    forgotPasswordMutation: {
      mutateAsync: sendEmailToUpdatePassword,
      isLoading: isSendingEmailToUpdateLoading,
    },
  } = useAuthMutation();

  const isDisabledSubmitButton =
    !Object.values(formValidHandler).every(Boolean) ||
    isSendingEmailToUpdateLoading;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const isValidForm = Object.values(formValidHandler).every(Boolean);
    if (!isValidForm) return;

    const formData = Object.fromEntries(new FormData(formRef.current));

    const res = await sendEmailToUpdatePassword({
      email: formData.email as string,
    });

    if (!res) return;

    navigate(ROUTER_PATHS.RESET_PASSWORD, { replace: true });
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.form__title}>Forgot Password?</h2>
      <div className={styles.inputs}>
        <ThemedInput
          type="input"
          name="email"
          placeholder="Enter your email"
          handleValid={(status) =>
            setFormValidHandler((prevFormValidStatus) => ({
              ...prevFormValidStatus,
              email: status,
            }))
          }
          isEmail
        />
      </div>

      <div className={styles.btns}>
        <Button
          type="submit"
          className={styles.submitBtn}
          disabled={isDisabledSubmitButton}
          appearance="primary"
        >
          Send
        </Button>

        <Button type="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

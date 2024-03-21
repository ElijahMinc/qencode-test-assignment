import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Nullable } from "types/nullable.type";
import { useAuthMutation } from "hooks/useAuthMutation";
import { ResetPasswordRequest } from "services/AuthService";
import { ROUTER_PATHS } from "router/paths";
import { LabelWrapper } from "components/LabelWrapper";
import { ThemedInput } from "components/ThemedInput";
import { Button } from "common/Button";

import styles from "../Auth.module.css";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const formRef = useRef<Nullable<HTMLFormElement>>(null);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [formValidHandler, setFormValidHandler] = useState({
    password: false,
    confirm: false,
  });

  const {
    resetPasswordMutation: {
      mutateAsync: sendResetPassword,
      isLoading: isResetPasswordLoading,
    },
  } = useAuthMutation();

  const isDisabledSubmitButton =
    !Object.values(formValidHandler).every(Boolean) || isResetPasswordLoading;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const isValidForm = Object.values(formValidHandler).every(Boolean);
    if (!isValidForm) return;

    const formData = Object.fromEntries(new FormData(formRef.current));

    const data: ResetPasswordRequest = {
      password: formData.password as string,
      secret: "",
      token: "",
    };

    const res = await sendResetPassword(data);

    if (!res) return;

    navigate(ROUTER_PATHS.AUTH, { replace: true });
  };

  useEffect(() => {
    setFormValidHandler((prev) => ({
      ...prev,
      confirm:
        !!confirmPasswordValue.length &&
        !!passwordValue.length &&
        confirmPasswordValue === passwordValue,
    }));
  }, [passwordValue, confirmPasswordValue]);

  return (
    <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
      <h2 className={styles.form__title}>Create new Password?</h2>
      <div className={styles.inputs}>
        <LabelWrapper text="Password">
          <ThemedInput
            name="password"
            type="password"
            placeholder="Password"
            handleChange={setPasswordValue}
            handleValid={(status) =>
              setFormValidHandler((prevFormValidStatus) => ({
                ...prevFormValidStatus,
                password: status,
              }))
            }
          />
        </LabelWrapper>
        <LabelWrapper text="Confirm Password">
          <ThemedInput
            handleChange={setConfirmPasswordValue}
            type="password"
            placeholder="Password"
          />
        </LabelWrapper>
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

        <Button type="button" onClick={() => navigate(`/${ROUTER_PATHS.AUTH}`)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

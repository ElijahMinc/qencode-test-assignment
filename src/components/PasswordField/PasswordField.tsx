import { forwardRef, useState } from "react";
import ShowPasswordIcon from "assets/show-password.svg";
import styles from "./PasswordField.module.css";
import cn from "classnames";
import { Input, InputProps } from "common/Input";

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...inputProps }, ref) => {
    const [isShowPassword, setShowPassword] = useState(false);

    const type = isShowPassword ? "text" : "password";

    const toggleShowPassword = () =>
      setShowPassword((prevStatus) => !prevStatus);

    return (
      <div className={cn(styles.password, className)}>
        <Input
          ref={ref}
          type={type}
          className={styles.password__input}
          {...inputProps}
        />
        <img
          src={ShowPasswordIcon}
          className={styles.password__icon}
          onClick={toggleShowPassword}
        />
      </div>
    );
  }
);

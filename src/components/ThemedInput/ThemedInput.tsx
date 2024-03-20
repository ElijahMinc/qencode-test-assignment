import { Input, InputProps } from "common/Input";
import { useInput } from "hooks/useInput";
import { HookValidateConfig } from "hooks/useValidate";
import { forwardRef, useEffect, useMemo } from "react";
import { PasswordField } from "..";

export interface ThemedInputProps extends InputProps, HookValidateConfig {
  type: "input" | "password";
  handleValid?: (status: boolean) => void;

  handleChange?: (value: string) => void;
}

export const ThemedInput = forwardRef<HTMLInputElement, ThemedInputProps>(
  (
    {
      isEmail,
      maxLength: maxLengthProps,
      minLength: minLengthProps,
      type,
      handleChange,
      defaultValue = "",
      handleValid,
      ...restInputProps
    },
    ref
  ) => {
    const {
      inputInfo: { value, ...restInputInfo },
      validInput,
      maxLengthError,
      minLengthError,
      isDirty,
      emailError,
      maxLength,
      minLength,
    } = useInput(defaultValue as string, {
      isEmail,
      maxLength: maxLengthProps,
      minLength: minLengthProps,
    });

    useEffect(() => {
      handleValid?.(validInput);
      handleChange?.(value);
    }, [validInput, value]);

    const CurrentInput = useMemo(() => {
      switch (type) {
        case "input":
          return (
            <Input
              ref={ref}
              value={value}
              {...restInputInfo}
              {...restInputProps}
            />
          );

        case "password":
          return (
            <PasswordField
              ref={ref}
              value={value}
              {...restInputInfo}
              {...restInputProps}
            />
          );

        default:
          return null;
      }
    }, [value]);

    return (
      <div>
        {CurrentInput}
        {maxLengthError && isDirty && (
          <div
            style={{ color: "red" }}
          >{`Max length value is ${maxLength}`}</div>
        )}
        {minLengthError && isDirty && (
          <div
            style={{ color: "red", marginTop: "5px" }}
          >{`The password fields should be at least ${minLength} characters long.`}</div>
        )}
        {emailError && isDirty && (
          <div style={{ color: "red", marginTop: "5px" }}>
            The email should be a valid email format.
          </div>
        )}
      </div>
    );
  }
);

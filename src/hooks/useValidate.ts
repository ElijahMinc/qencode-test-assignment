import { EMAIL_PATTERN_REGEX } from "constants";
import { useCallback, useEffect, useState } from "react";

export interface HookValidateConfig {
  maxLength?: number;
  minLength?: number;
  isEmail?: boolean;
}

export const useValidate = (value: string, config: HookValidateConfig) => {
  const [isEmpty, setEmpty] = useState(false);
  const [maxLength] = useState(config.maxLength);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [minLength] = useState(config.minLength);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [validInput, setValidInput] = useState(false);

  const handleEmpty = useCallback(
    () => setEmpty(!value.length),
    [value.length]
  );

  useEffect(() => {
    handleEmpty();

    Object.keys(config).forEach((currentConfig) => {
      switch (currentConfig) {
        case "maxLength":
          setMaxLengthError(value.length > maxLength!);
          break;
        case "minLength":
          setMinLengthError(value.length < minLength!);
          break;
        case "isEmail":
          if (!config["isEmail"]) return;
          setEmailError(!EMAIL_PATTERN_REGEX.test(value));
          break;
        default:
          return;
      }
    });
  }, [value, handleEmpty, config, maxLength, minLength]);

  useEffect(() => {
    if (minLengthError || maxLengthError || emailError || isEmpty) {
      setValidInput(false);
    } else {
      setValidInput(true);
    }
  }, [maxLengthError, minLengthError, isEmpty, emailError]);

  return {
    isEmpty,
    maxLength,
    minLength,
    maxLengthError,
    emailError,
    minLengthError,
    validInput,
  };
};

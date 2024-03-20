import { useState } from "react";
import { HookValidateConfig, useValidate } from "./useValidate";

export const useInput = (
  initialValue: string,
  configValidate: HookValidateConfig
) => {
  const [isDirty, setDirty] = useState(false);
  const [value, setValue] = useState(initialValue);

  const errorsHandler = useValidate(value, configValidate);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  const onBlur = () => setDirty(true);

  return {
    inputInfo: {
      value,
      onChange,
      onBlur,
    },
    isDirty,
    ...errorsHandler,
  };
};

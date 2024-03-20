import React, { DetailedHTMLProps, ParamHTMLAttributes } from "react";

interface FormProps
  extends DetailedHTMLProps<
    ParamHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

export const Form = ({
  children,
  ...props
}: React.PropsWithChildren<FormProps>) => {
  return <form {...props}>{children}</form>;
};

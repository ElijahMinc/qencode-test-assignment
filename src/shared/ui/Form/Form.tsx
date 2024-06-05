import React, {
  DetailedHTMLProps,
  ParamHTMLAttributes,
  forwardRef,
} from 'react';

interface FormProps
  extends DetailedHTMLProps<
    ParamHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

export const Form = forwardRef<
  HTMLFormElement,
  React.PropsWithChildren<FormProps>
>(({ children, ...props }, ref) => (
  <form ref={ref} {...props}>
    {children}
  </form>
));

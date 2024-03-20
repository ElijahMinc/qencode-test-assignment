import { forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...restProps }, ref) => (
    <input ref={ref} className={cn(styles.input, className)} {...restProps} />
  )
);

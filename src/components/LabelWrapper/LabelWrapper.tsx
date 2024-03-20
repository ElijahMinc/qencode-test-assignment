import styles from "./LabelWrapper.module.css";

interface LabelWrapperProps extends React.HTMLProps<HTMLLabelElement> {
  text: string;
}

export const LabelWrapper = ({
  text,
  children,
  ...labelProps
}: React.PropsWithChildren<LabelWrapperProps>) => {
  return (
    <div className={styles.labelWrapper}>
      <label className={styles.label} {...labelProps}>
        {text}
      </label>
      {children}
    </div>
  );
};

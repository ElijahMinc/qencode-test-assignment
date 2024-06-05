export const resetPasswordFormSchema = {
  password: {
    validation: ['password', 'isRequired'],
  },
  ['confirm-password']: {
    validation: ['password', 'isRequired'],
    customValidation: {
      check: (value: string, values: any) => {
        return value === values['password'];
      },
      message: 'Is not matches',
    },
  },
};

export const resetPasswordFormDefaultValues = {
  password: '',
  ['confirm-password']: '',
};

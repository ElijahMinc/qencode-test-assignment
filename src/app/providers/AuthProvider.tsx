import { AuthContext, IAuthContext } from '@entities/Auth';
import { useMemo, useState } from 'react';

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access_token'));

  const setAuth = (status: boolean) => setIsAuth(status);

  const value: IAuthContext = useMemo(
    () => ({
      setAuth,
      isAuth,
    }),
    [isAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

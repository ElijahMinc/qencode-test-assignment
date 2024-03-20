import { createContext, useState } from "react";

export interface IAuthContext {
  isAuth: boolean;
  setAuth: (status: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: !!localStorage.getItem("access_token"),
  setAuth: () => {},
});

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("access_token"));
  const setAuth = (status: boolean) => setIsAuth(status);

  const value: IAuthContext = {
    setAuth,
    isAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

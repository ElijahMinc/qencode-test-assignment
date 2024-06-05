import { createContext } from "react";

export interface IAuthContext {
  isAuth: boolean;
  setAuth: (status: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: !!localStorage.getItem('access_token'),
  setAuth: () => {},
});

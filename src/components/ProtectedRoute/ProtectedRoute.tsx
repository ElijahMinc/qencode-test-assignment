import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTER_PATHS } from "router";

export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to={ROUTER_PATHS.AUTH} />;
};

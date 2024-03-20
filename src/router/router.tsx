import { createBrowserRouter } from "react-router-dom";
import { Auth, Home, Layout } from "../pages";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Login } from "../pages/Auth/Login";
import { ForgotPassword, ResetPassword } from "../pages/Auth";
import { ROUTER_PATHS } from "./paths";

export const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />,
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTER_PATHS.AUTH,
        element: <Auth />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
        ],
      },
    ],
  },
]);

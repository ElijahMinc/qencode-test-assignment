import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

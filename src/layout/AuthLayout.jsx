import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="grid grid-cols-2 min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;

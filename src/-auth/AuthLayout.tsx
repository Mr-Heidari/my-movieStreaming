import { useUserContext } from "@/context/useUserContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <div>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <section className="flex  justify-center items-center flex-col ">
            <Outlet />
          </section>

          <div className="bg-black ">
            <img
              src="/assets/images/authbackground.jpg"
              alt=""
              className="h-screen absolute top-0 left-0 w-full object-cover opacity-50 -z-10"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthLayout;

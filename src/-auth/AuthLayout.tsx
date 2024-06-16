import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/useUserContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated , isLoading} = useUserContext();
  return (
    <div>
      {!isLoading ? isAuthenticated ? (
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
      ): <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><Loader width={30} height={30}></Loader></div>}
    </div>
  );
};

export default AuthLayout;

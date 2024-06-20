import { Link, useLocation } from "react-router-dom";
import { topbarLinks } from "@/constants/barlinks";
import { useUserContext } from "@/context/useUserContext";

const TopBar = () => {
  const { pathname } = useLocation();
  const { user,isLoading,isAuthenticated } = useUserContext();

  return (
    <>
      <main className=" top-contianer">
        <section className=" flex flex-row gap-16 justify-between">
          <img
            src="/assets/images/logo.png"
            width={60}
            height={60}
            className="object-contain "
          />

          <nav className="hidden md:block">
            <ul className=" flex flex-row gap-4">
              {topbarLinks.map((link, index) => {
                const isActive = pathname === link.route;
                return (
                  <Link
                    key={index}
                    to={link.route}
                    className={
                      "topbar-links" +
                      (isActive
                        ? " border-white bg-white/20"
                        : " border-white/30 hover:bg-white/10")
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </ul>
          </nav>
        </section>
        <div className="flex flex-row gap-2">
          <Link to={'/search'} className="flex flex-row border-2 border-white/30 rounded-3xl p-1 items-center  ">
            {" "}
            <img
              src="/assets/icons/search-icone.svg
          "
              className="opacity-60 w-8 h-8"
              alt=""
            />
          </Link>
          <Link to={isAuthenticated? isLoading ? '':`/profile/${user.id}`:'/sing-in'}>
              <img src={isLoading? '/assets/icons/Spinner-2.gif' : `${user.imageUrl}` || '/assets/icons/person-Icone.svg'} className="w-11 h-11 rounded-full border-2 border-white/60"/>
          </Link>
        </div>
      </main>
    </>
  );
};

export default TopBar;

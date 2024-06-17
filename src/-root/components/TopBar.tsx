import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { topbarLinks } from "@/constants/barlinks";
import { useUserContext } from "@/context/useUserContext";

const TopBar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();

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
          <Link to={`/profile/${user.id}`}>
            <Avatar>
              <AvatarImage src={`${user.imageUrl}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </main>
    </>
  );
};

export default TopBar;

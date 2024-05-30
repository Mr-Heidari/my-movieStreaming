import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { topbarLinks } from "@/constants/barlinks";

const TopBar = () => {
  const { pathname } = useLocation();

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
              {topbarLinks.map((link,index) => {
                const isActive = pathname === link.route;
                return (
                  <Link key={index}
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
          <section className="flex flex-row border-2 border-white/30 rounded-3xl px-2 items-center  max-lg:hidden">
            {" "}
            <Input
              id="searchInput"
              placeholder="search for movies"
              className="border-none placeholder:text-white/70 text-white text-xs  h-8"
            />
            <label htmlFor="searchInput" className="cursor-pointer">
              <img
                src="/assets/icons/search-icone.svg
          "
                className="opacity-60 w-8 h-8"
                alt=""
              />
            </label>
          </section>

          {/** search mobile version */}
          <section className="lg:hidden">
            <img
              src="/assets/icons/search-icone.svg
          "
              className="opacity-60 w-8 h-8 mt-1 "
              alt=""
            />
          </section>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </main>
    </>
  );
};

export default TopBar;

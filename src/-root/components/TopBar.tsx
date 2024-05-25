import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { topbarLinks } from "@/constants/topbarlinks";

const TopBar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <main className=" top-contianer">
        <div className=" flex flex-row gap-16 justify-between">
          <section>
            <img
              src="/assets/images/logo.png"
              width={60}
              height={60}
              className="object-contain"
            />
          </section>

          <section>
            <nav className="">
              <ul className=" flex flex-row gap-4">
                {topbarLinks.map((link) => {
                  const isActive = pathname === link.route;
                  return (
                    <Link
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
        </div>
        <div className="flex flex-row gap-2">
          <section className="flex flex-row border-2 border-white/30 rounded-3xl px-2 items-center">
            {" "}
            <Input
              id="searchInput"
              placeholder="search for movies"
              className="border-none placeholder:text-white/70 text-white text-xs  h-8 "
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

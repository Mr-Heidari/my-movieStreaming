import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const TopBar = () => {
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
            <nav className=" flex flex-row gap-4">
              <Link to={"/"} className="topbar-links">
                HOME
              </Link>
              <Link to={"/movies"} className="topbar-links">
                MOVIES
              </Link>
              <Link to={"/tvseries"} className="topbar-links">
                TVSERIES
              </Link>
              <Link to={"/about"} className="topbar-links">
                ABOUT
              </Link>
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

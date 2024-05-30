import { bottombarLinks } from "@/constants/barlinks";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <main>
      <section className=" bottom-container  ">
        <nav className="md:hidden">
          <ul className=" flex flex-row gap-4 justify-between ">
            {bottombarLinks.map((link,index) => {
              const isActive = pathname === link.route;
              return (
                <Link key={index}
                  to={link.route}
                  className={
                    "bottombar-links" +
                    (isActive
                      ? "   bg-red-700"
                      : "  ")
                  }
                >
                    <img src={link.img} alt=""  width={28} height={28} className="object-contain   overflow-hidden"/>
                  {link.label}
                </Link>
              );
            })}
          </ul>
        </nav>
      </section>
    </main>
  );
};

export default BottomBar;

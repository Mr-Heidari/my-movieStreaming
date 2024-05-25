import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";

const RootLayout = () => {
  return (
    <main>
      <TopBar/>
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default RootLayout;

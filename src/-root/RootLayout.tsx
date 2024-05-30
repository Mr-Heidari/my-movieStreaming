import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";

const RootLayout = () => {
  return (
    <main>
      <TopBar/>
      <section>
        <Outlet />
      </section>
      <BottomBar/>
    </main>
  );
};

export default RootLayout;

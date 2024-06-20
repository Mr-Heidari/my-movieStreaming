import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import Footer from "./components/Footer";

const RootLayout = () => {
  return (
    <main>
      <TopBar/>
      <section className="min-h-screen">
        <Outlet />
      </section>
      <Footer/>
      <BottomBar/>
    </main>
  );
};

export default RootLayout;

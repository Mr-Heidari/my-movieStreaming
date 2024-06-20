import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full h-fit bg-neutral-950 p-10 max-md:pb-28">
      <div className="w-full h-fit flex flex-row flex-wrap text-white/80 gap-10 justify-around">
        <section className="flex flex-col">
          <h4 className="text-2xl font-semibold text-white">Movie</h4>
          <Link to={"/movie/Action/28"}>Action</Link>
          <Link to={"/movie/Drama/18"}>Drama</Link>
          <Link to={"/movie/Horror/27"}>Horror</Link>
          <Link to={"/movie/Documentary/99"}>Documentary</Link>
          <Link to={"/movie/Comedy/35"}>Comedy</Link>
        </section>
        <section className="flex flex-col">
          <h4 className="text-2xl font-semibold text-white">TvSeries</h4>
          <Link to={"/tv/Action%20&%20Adventure/10759"}>Action & Adventure</Link>
          <Link to={"/tv/Family/10751"}>Family</Link>
          <Link to={"/movie/Horror/27"}>Horror</Link>
          <Link to={"/movie/Documentary/99"}>Documentary</Link>
          <Link to={"/movie/Comedy/35"}>Comedy</Link>
        </section>
        <section className="flex flex-col">
          <h4 className="text-2xl font-semibold text-white">Support</h4>
          <Link to={"/movie/Action/28"}>Action</Link>
          <Link to={"/movie/Drama/18"}>Drama</Link>
          <Link to={"/movie/Horror/27"}>Horror</Link>
          <Link to={"/movie/Documentary/99"}>Documentary</Link>
          <Link to={"/movie/Comedy/35"}>Comedy</Link>
        </section>
        <section className="flex flex-col">
          <h4 className="text-2xl font-semibold text-white">About us</h4>
          <Link to={"/movie/Action/28"}>Action</Link>
          <Link to={"/movie/Drama/18"}>Drama</Link>
          <Link to={"/movie/Horror/27"}>Horror</Link>
          <Link to={"/movie/Documentary/99"}>Documentary</Link>
          <Link to={"/movie/Comedy/35"}>Comedy</Link>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

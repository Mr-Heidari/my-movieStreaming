import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className=" py-28 mx-10  text-white">
      <section className="w-full h-full flex flex-col gap-5">
        <div>
          <h1 className="md:text-3xl text-xl font-semibold mb-5">Our Stroy</h1>
          <p className=" px-5 leading-8 text-white/60">
            In 2007, we set out to reimagine the movie industry and create a
            platform that would empower creators to tell their stories in an
            authentic way. We knew it wouldn't be easy, but we were determined
            to build something that would change the way people thought about
            entertainment. Over the years, we've faced many challenges, but
            we've never lost sight of our mission: to inspire, entertain, and
            connect people through the power of storytelling.
          </p>
        </div>
        <div>
          <h1 className="md:text-3xl text-xl font-semibold mb-5">
            Our Mission
          </h1>
          <p className=" px-5 leading-8 text-white/60">
            At Streamr, our mission is to bring people together through the
            power of great stories. We believe that by creating a platform where
            creators can share their unique perspectives, we can inspire
            empathy, drive meaningful conversations, and foster a sense of
            community. We're committed to making it easier for creators to find
            their audience and for viewers to discover new voices and
            perspectives. We want to help people connect, learn, and grow
            through the magic of storytelling.
          </p>
        </div>
        <Link to={'/'} className="bg-red-900 p-4 rounded-lg mt-10 hover:bg-red-950 transition text-center">Get Started</Link>
      </section>
    </div>
  );
};

export default About;

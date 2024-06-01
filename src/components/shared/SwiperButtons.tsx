import { useSwiper } from "swiper/react";

const SwiperButtons = () => {
  const swiper = useSwiper();

  return (
    <div className=" max-md:hidden">
      <button
        className="absolute left-0 opacity-50 hover:bg-red-700 hover:opacity-100 bg-black top-0 z-20 w-10 md:w-20  rounded-r-2xl h-full "
        onClick={() => swiper.slidePrev()}
      >
        <img src="/assets/icons/prevslide.svg" className=" w-12 h-12 m-auto " />
      </button>
      <button
        className="absolute right-0 opacity-50 hover:bg-red-700 hover:opacity-100  bg-black  top-0 z-20 w-10 md:w-20 rounded-l-2xl h-full "
        onClick={() => swiper.slideNext()}
      >
        <img src="/assets/icons/nextslide.svg" className=" w-12 h-12 m-auto " />
      </button>
    </div>
  );
};

export default SwiperButtons;

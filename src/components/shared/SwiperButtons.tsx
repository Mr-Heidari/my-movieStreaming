import { useState } from "react";
import { useSwiper } from "swiper/react";

const SwiperButtons = () => {
  const swiper = useSwiper();
  const [swiperIsEnd, setSWiperIsEnd] = useState<boolean>();
  const [swiperIsBeginning, setSwiperIsBeginning] = useState<boolean>();
  return (
    <div className=" max-md:hidden">
      <button
        className={
          "absolute left-0 opacity-50 hover:bg-red-700 hover:opacity-100 bg-black top-0 z-20 w-10 md:w-20  rounded-r-2xl h-full " +
          (swiperIsBeginning ? "hidden" : "")
        }
        onClick={() => {
          swiper.slidePrev();
          setSWiperIsEnd(swiper.isEnd);
          setSwiperIsBeginning(swiper.isBeginning);
        }}
      >
        <img src="/assets/icons/prevslide.svg" className=" w-12 h-12 m-auto " />
      </button>
      <button
        className={
          "absolute right-0 opacity-50 hover:bg-red-700 hover:opacity-100  bg-black  top-0 z-20 w-10 md:w-20 rounded-l-2xl h-full " +
          (swiperIsEnd ? " hidden" : "")
        }
        onClick={() => {
          swiper.slideNext();
          setSWiperIsEnd(swiper.isEnd);
          setSwiperIsBeginning(swiper.isBeginning);
        }}
      >
        <img src="/assets/icons/nextslide.svg" className=" w-12 h-12 m-auto " />
      </button>
    </div>
  );
};

export default SwiperButtons;

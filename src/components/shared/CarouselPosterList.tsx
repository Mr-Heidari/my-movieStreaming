import { Media } from "@/types";

import { Swiper, SwiperSlide } from "swiper/react";

import "react-circular-progressbar/dist/styles.css";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect } from "react";

import useSize from "@/hooks/useSize";
import SwiperButtons from "./SwiperButtons";

import MediaCard from "./MediaCard";

type props = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any;
  isLoading: boolean;
  hasNextPage?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
  mediaType?: string;
};

const CarouselPosterList = ({
  title,
  items,
  isLoading,
  hasNextPage,
  fetchNextPage,
  mediaType,
}: props) => {
  const { ref, inView } = useInView();

  const numberofSlides = useSize();

  useEffect(() => {
    if (inView && fetchNextPage && items) {
      fetchNextPage();
    }

    console.log(numberofSlides);
  }, [inView]);

  return (
    <div className=" flex flex-col gap-5 mt-5">
      <header>
        <h2 className=" text-white font-semibold text-xl md:text-3xl px-10">
          {title}
        </h2>
      </header>
      <main className="sm:px-1 px-0  pb-10 relative ">
        {isLoading ? (
          <div className="w-full h-[400px] flex ">
            <img
              src="/assets/icons/Spinner-2.gif"
              alt=""
              className="m-auto w-12 h-12"
            />
          </div>
        ) : (
          <div className="mx-1  cursor-pointer">
            {/**mobile version  */}
            <Swiper
              slidesPerView={numberofSlides}
              slidesPerGroup={numberofSlides - 1}
              spaceBetween={20}
            >
              <SwiperButtons></SwiperButtons>
              {items &&
                (items.results !== undefined ? items.results : items).map(
                  (card: Media) => (
                    <SwiperSlide className="max-w-fit h-fit" key={card.id}>
                      <MediaCard mediaType={mediaType} card={card}></MediaCard>;
                    </SwiperSlide>
                  )
                )}

              {hasNextPage && items && (
                <SwiperSlide>
                  <div className=" " ref={ref}>
                    <Skeleton className="h-[220px] w-[110px] md:h-[380px] md:w-[200px] flex flex-col-reverse gap-2 items-center  p-2  bg-neutral-800 relative">
                      <Skeleton className="  w-10 h-4  bg-neutral-600" />
                      <Skeleton className="   w-full h-4   bg-neutral-600" />
                      <Skeleton className=" w-8 h-8   md:w-14 md:h-14 rounded-full -translate-x-[80%] bg-neutral-600" />
                      <img
                        src="/assets/icons/Spinner-2.gif"
                        alt=""
                        className="absolute w-10 h-10 top-1/3"
                      />
                    </Skeleton>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        )}
      </main>
    </div>
  );
};

export default CarouselPosterList;

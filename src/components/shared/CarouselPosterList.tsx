import { Media } from "@/types";
import { Card, CardContent } from "../ui/card";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useSize from "@/hooks/useSize";

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

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0,0,0,0.6)" ,height: '100%', width:'50px ', zIndex:'10'}}
      onClick={onClick}
    />
  );
}

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

  const settings = {
    infinite: false,
    slidesToShow: numberofSlides ,
    slidesToScroll: numberofSlides,
    swipe:false,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow:  numberofSlides,
          swipe:true,
          slidesToScroll: numberofSlides,
          swipeToSlide:true,
        }
      },],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

  };

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
          <>
            <Slider className="mx-6  cursor-pointer  center" {...settings}>
              {items &&
                (items.results !== undefined ? items.results : items).map(
                  (card: Media) => (
                    <Link
                      to={
                        mediaType
                          ? `/${mediaType}/${card?.id}`
                          : card.media_type === "movie"
                          ? `/movie/${card?.id}`
                          : `/tv/${card?.id}`
                      }
                    >
                      <div
                        onClick={() => console.log(items)}
                        key={card?.id}
                        className="max-w-fit p-0 text-white flex flex-col gap-5 "
                      >
                        <Card className=" border-4 border-black/50 ">
                          <CardContent className=" p-0 relative ">
                            <div className="relative">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${card?.poster_path}`}
                                className="min-w-[100px] h-[150px] md:min-w-[200px] md:h-[300px] rounded-md  hover:bg-gradient-to-t hover:from-black"
                                alt=""
                              />
                              <div className="h-full w-full absolute bottom-0 opacity-0 hover:opacity-100 hover:bg-gradient-to-t hover:from-black/70  flex">
                                <img
                                  className="m-auto w-10 h-10 md:w-16  md:h-16 opacity-75 bg-black rounded-full p-2"
                                  src="/assets/icons/right-arrow.svg"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="p-2 w-fit h-fit absolute top-0 left-0 md:top-2 md:left-2 rounded-full">
                                <img
                                  src="/assets/icons/heart.svg"
                                  alt=""
                                  className=" max-md:w-6 bg-black/70 p-1 rounded-full"
                                />
                              </div>
                              <div className="p-2 w-fit h-fit absolute top-0 right-0 md:top-2 md:right-2 rounded-full">
                                <img
                                  src="/assets/icons/save.svg"
                                  alt=""
                                  className=" brightness-200  max-md:w-6 bg-black/70 max-md:p-1 md:p-[6px] rounded-full "
                                />
                              </div>
                            </div>

                            <Skeleton className="h-full w-full bg-neutral-600 absolute top-0 left-0 -z-10">
                              <img
                                src="/assets/icons/Spinner-2.gif"
                                alt=""
                                className="absolute w-10 h-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                              />
                            </Skeleton>

                            <div className="absolute -bottom-5 left-2 md:w-16 md:h-16 w-10 h-10">
                              <CircularProgressbar
                                value={card?.vote_average}
                                styles={buildStyles({
                                  rotation: 0,

                                  strokeLinecap: "butt",

                                  textSize: "20px",

                                  pathTransitionDuration: 0.5,

                                  pathColor: "#DC2626",
                                  textColor: "#fff",
                                  trailColor: "#fff",
                                  backgroundColor: "#111111",
                                })}
                                strokeWidth={8}
                                maxValue={10}
                                text={`${
                                  parseFloat(card?.vote_average?.toFixed(1)) *
                                  10
                                }`}
                                background={true}
                                backgroundPadding={8}
                              />
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex flex-col text-center">
                          <p className="max-w-[100px] md:max-w-[200px] max-md:text-xs line-clamp-2 text-ellipsis">
                            {card?.title
                              ? card?.title
                              : card?.original_title
                              ? card?.original_title
                              : card?.name}
                          </p>
                          <p className="opacity-60 text-sm">
                            {card?.release_date?.slice(0, 4)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                )}

              {hasNextPage && items && (
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
              )}
            </Slider>
          </>
        )}
      </main>
    </div>
  );
};

export default CarouselPosterList;

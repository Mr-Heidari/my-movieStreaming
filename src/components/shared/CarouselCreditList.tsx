import { MovieCredits } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import SwiperButtons from "./SwiperButtons";

type props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  loading: boolean;
};

const CarouselCreditList = ({ item }: props) => {
  return (
    <>
      <main>
        <Swiper slidesPerView={"auto"} slidesPerGroup={4} spaceBetween={20}>
          <SwiperButtons></SwiperButtons>
          {item &&
            item.map((people: MovieCredits) => (
              <SwiperSlide key={people.id} className="max-w-fit">
                <div className="max-w-fit p-0 text-white flex flex-col gap-5 ">
                  <Card className=" border-none bg-neutral-950">
                    <CardContent className=" p-0 relative min-w-[100px] max-w-[100px] md:min-w-[200px] h-fit">
                      <div className="relative min-w-[100px] max-w-[100px] md:min-w-[200px] md:h-[300px] h-[150px]">
                        <img
                          src={
                            people.profile_path
                              ? `https://image.tmdb.org/t/p/w500${people.profile_path}`
                              : "/assets/icons/feelnessemoji.svg"
                          }
                          className=" h-full w-full  hover:bg-gradient-to-t rounded-t-md"
                          alt=""
                        />
                        {people.profile_path &&
                        <Skeleton className="w-full h-full rounded-md bg-neutral-600 absolute top-0 left-0 -z-10">
                          <img
                            src="/assets/icons/Spinner-2.gif"
                            alt=""
                            className="absolute w-10 h-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                          />
                        </Skeleton>
                        }
                      </div>
                      <div className="flex flex-col w-full  p-1 max-md:text-xs ">
                        <p className="max-w-full text-ellipsis line-clamp-1">
                          {people.original_name}
                        </p>
                        <p className="max-w-full text-ellipsis line-clamp-1">
                          {people.character ? people.character : people.known_for_department}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </main>
    </>
  );
};

export default CarouselCreditList;

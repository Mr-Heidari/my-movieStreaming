import { useGetImageByMovieId, useGetVideoByMovieId } from "@/lib/react-query/queries";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { MediaBarTabs } from "@/constants/mediaBarTabs";
import { Skeleton } from "../ui/skeleton";
import CarouselImageList from "./CarouselImageList";
import CarouselVideoList from "./CarouselVideoList";

const MediaBar = () => {
    const { id } = useParams();
  
    const [mediaTab, setMediaTab] = useState<string>("Videos");
    const { data: images, isPending: imageIsLoading } = useGetImageByMovieId({
      id: id || "",
    });
    const { data: videos, isPending: videoISLoading } = useGetVideoByMovieId({
      id: id || "",
    });
    return (
      <div className=" flex flex-col gap-1 " id="mediatab">
        <header className=" flex flex-row md:gap-16 gap-5 text-white/85 mt-5 max-md:scale-90 mx-2 max-md:-translate-x-[5%]">
          <h3 className="md:text-2xl font-semibold my-auto">Media</h3>
          <Tabs defaultValue={mediaTab} className="w-[400px]">
            <TabsList className="  bg-red-900 ">
              {MediaBarTabs.map((tab) => (
                <TabsTrigger
                  className=" bg-neutral-900 rounded-none"
                  value={tab}
                  onClick={() => setMediaTab(tab)}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </header>
  
        <main className="mt-2">
          <section className={`${mediaTab === "Backdrops" ? " " : "hidden"}`}>
            {imageIsLoading ? (
              <Skeleton className="w-full h-[300px] bg-neutral-700"></Skeleton>
            ) : (
              <CarouselImageList
                item={images?.backdrops.slice(0, 8)}
                type="backdrop"
              />
            )}
          </section>
          <section className={`${mediaTab === "Posters" ? " " : "hidden"}`}>
            {imageIsLoading ? (
              <Skeleton className="w-full h-[300px] bg-neutral-700"></Skeleton>
            ) : (
              <CarouselImageList
                item={images?.posters.slice(0, 8)}
                type="backdrop"
              />
            )}
          </section>
          <section className={`${mediaTab === "Videos" ? " " : "hidden"}`}>
            {videoISLoading ? (
              <Skeleton className="w-full h-[300px] bg-neutral-700"></Skeleton>
            ) : (
              <CarouselVideoList item={videos} />
            )}
          </section>
        </main>
      </div>
    );
  };

  export default MediaBar;
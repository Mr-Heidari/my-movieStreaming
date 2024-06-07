import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSeriesByGenre } from "@/lib/react-query/queries";
import { SeriesDetaile } from "@/types";

import { useEffect, useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";

const SeriesList = () => {
  const { genre } = useParams();

  const { id } = useParams();

  const { ref, inView } = useInView();

  const {
    data: series,
    fetchNextPage,
    hasNextPage,
  } = useGetSeriesByGenre(id || "");

  const seriesItems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return series?.pages?.flatMap((page) => page?.results);
  }, [series]);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);
  

  return (
    <div className="py-28 text-white mx-5">
      <header className="mb-5">
        <h1 className="md:text-2xl font-semibold">{genre}</h1>
      </header>
      <main>
        <section className="flex flex-row flex-wrap gap-3  justify-center">
          {seriesItems?.map((series: SeriesDetaile) => (
            <Link to={`/tv/${series?.id}`} key={series.id}>
              <div className="max-w-fit p-0 text-white flex flex-col gap-5 ">
                <Card className=" border-4 border-black/50  ">
                  <CardContent className=" p-0 relative ">
                    <div className="relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${series?.poster_path}`}
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
                        value={series?.vote_average}
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
                          parseFloat(series?.vote_average?.toFixed(1)) * 10
                        }`}
                        background={true}
                        backgroundPadding={8}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col text-center">
                  <p className="max-w-[100px] md:max-w-[200px] max-md:text-xs line-clamp-2 text-ellipsis">
                    {series?.original_name
                      ? series?.original_name
                      : series?.name
                      ? series?.name
                      : ""}
                  </p>
                  <p className="opacity-60 text-sm">
                    {`(${series?.first_air_date?.slice(0, 4)})`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {hasNextPage && (
            <div ref={ref}>
              <Skeleton className="min-w-[100px] h-[150px] md:min-w-[200px] md:h-[300px] bg-neutral-600 flex">
                <img
                  src="/assets/icons/Spinner-2.gif"
                  alt=""
                  className=" m-auto w-10 h-10"
                />
              </Skeleton>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SeriesList;

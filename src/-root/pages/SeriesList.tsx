import Loader from "@/components/shared/Loader";
import MediaCard from "@/components/shared/MediaCard";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetSeriesByGenre } from "@/lib/react-query/queries";
import { Media } from "@/types";

import { useEffect, useMemo } from "react";

import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

const SeriesList = () => {
  const { genre } = useParams();

  const { id } = useParams();

  const { ref, inView } = useInView();

  const {
    data: series,
    fetchNextPage,
    hasNextPage,
    isPending,
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
      {isPending ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader width={30} height={30}></Loader>
        </div>
      ) : (
        <main>
          <section className="flex flex-row flex-wrap gap-3  justify-center">
            {seriesItems?.map((series: Media) => (
              <MediaCard card={series} mediaType="tv"></MediaCard>
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
      )}
    </div>
  );
};

export default SeriesList;

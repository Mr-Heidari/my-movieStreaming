/* eslint-disable @typescript-eslint/ban-ts-comment */
import CarouselGenreList from "@/components/shared/CarouselGenreList";
import CarouselPosterList from "@/components/shared/CarouselPosterList";
import {
  useGetAiringTodaySeries,
  useGetOnAirSeries,
  useGetPopulareSeries,
  useGetTopRatedSeries,
} from "@/lib/react-query/queries";
import { useMemo } from "react";

const TVSeries = () => {
  const {
    data: topRated,
    fetchNextPage: fetchTopRatedNextPage,
    hasNextPage: topRatedHasNextPage,
    isLoading: topRatedIsLoading,
  } = useGetTopRatedSeries();

  const {
    data: onAir,
    fetchNextPage: fetchOnAirNextPage,
    hasNextPage: onAirHasNextPage,
    isLoading: onAirIsLoading,
  } = useGetOnAirSeries();

  const {
    data: populare,
    fetchNextPage: fetchPopulareNextPage,
    hasNextPage: populareHasNextPage,
    isLoading: populareIsLoading,
  } = useGetPopulareSeries();

  const {
    data: airingToday,
    fetchNextPage: fetchAiringTodayNextPage,
    hasNextPage: airingTodayHasNextPage,
    isLoading: airingTodayIsLoading,
  } = useGetAiringTodaySeries();

  const topRatedItems = useMemo(() => {
    // @ts-ignore: Unreachable code error
    return topRated?.pages?.flatMap((page) => page?.results);
  }, [topRated]);

  const onAirItems = useMemo(() => {
    // @ts-ignore: Unreachable code error
    return onAir?.pages?.flatMap((page) => page?.results);
  }, [onAir]);

  const populareItems = useMemo(() => {
    // @ts-ignore: Unreachable code error
    return populare?.pages?.flatMap((page) => page?.results);
  }, [populare]);

  const airingTodayItems = useMemo(() => {
    // @ts-ignore: Unreachable code error
    return airingToday?.pages?.flatMap((page) => page?.results);
  }, [airingToday]);

  return (
    <div className="py-28">
      <section>
        <CarouselGenreList type="tv"/>
      </section>
      <section>
        {" "}
        <CarouselPosterList
          items={onAirItems}
          fetchNextPage={fetchOnAirNextPage}
          hasNextPage={onAirHasNextPage}
          isLoading={onAirIsLoading}
          title="On Air"
          mediaType="tv"
        />
      </section>

      <hr className="mx-2 border-white/50" />

      <section>
        <CarouselPosterList
          items={topRatedItems}
          fetchNextPage={fetchTopRatedNextPage}
          hasNextPage={topRatedHasNextPage}
          isLoading={topRatedIsLoading}
          title="Top Rated"
          mediaType="tv"
        />
      </section>

      <hr className="mx-2 border-white/50" />

      <section>
        <CarouselPosterList
          items={populareItems}
          fetchNextPage={fetchPopulareNextPage}
          hasNextPage={populareHasNextPage}
          isLoading={populareIsLoading}
          title="Populare"
          mediaType="tv"
        />
      </section>

      <hr className="mx-2 border-white/50" />

      <section>
        <CarouselPosterList
          items={airingTodayItems}
          fetchNextPage={fetchAiringTodayNextPage}
          hasNextPage={airingTodayHasNextPage}
          isLoading={airingTodayIsLoading}
          title="Airing Today"
          mediaType="tv"
        />
      </section>

      <hr className="mx-2 border-white/50" />
    </div>
  );
};

export default TVSeries;

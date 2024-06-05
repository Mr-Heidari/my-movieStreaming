/* eslint-disable @typescript-eslint/ban-ts-comment */
import CarouselGenreList from "@/components/shared/CarouselGenreList";
import CarouselPosterList from "@/components/shared/CarouselPosterList";
import {
  useGetInifinityNowPlayingMovies,
  useGetInifinityPopulareMovies,
  useGetInifinityTopRatedMovies,
  useGetInifinityUpComingMovies,
} from "@/lib/react-query/queries";
import { useMemo } from "react";

const Movie = () => {
  const {
    data: nowPlaying,
    fetchNextPage: fetchNowPlayingNextPage,
    hasNextPage: nowPlayingHasNextPage,
    isLoading: nowPlayinIsLoading,
  } = useGetInifinityNowPlayingMovies();

  const {
    data: topRated,
    fetchNextPage: fetchTopRatedNextPage,
    hasNextPage: topRatedHasNextPage,
    isLoading: topRatedIsLoading,
  } = useGetInifinityTopRatedMovies();

  const {
    data: populare,
    fetchNextPage: fetchPopulareNextPage,
    hasNextPage: populareHasNextPage,
    isLoading: populareIsLoading,
  } = useGetInifinityPopulareMovies();

  const {
    data: upComing,
    fetchNextPage: fetchUpComingNextPage,
    hasNextPage: upComingHasNextPage,
    isLoading: upComingIsLoading,
  } = useGetInifinityUpComingMovies();

  const nowPlayingItems = useMemo(() => {
    // @ts-ignore: Unreachable code error
    return nowPlaying?.pages?.flatMap((page) => page?.results);
  }, [nowPlaying]);

  const topRatedItems = useMemo(() => {
    // @ts-ignore: Unreachable code error
    return topRated?.pages?.flatMap((page) => page?.results);
  }, [topRated]);

  const populareItems = useMemo(() => {
    // @ts-ignore: Unreachable code error
    return populare?.pages?.flatMap((page) => page?.results);
  }, [populare]);

  const upComingItems = useMemo(() => {
    // @ts-ignore: Unreachable code error
    return upComing?.pages?.flatMap((page) => page?.results);
  }, [upComing]);

  return (
    <div className="py-28">
      <section>
        <CarouselGenreList type={'movie'}/>
      </section>
      <section>
        {" "}
        <CarouselPosterList
          items={nowPlayingItems}
          fetchNextPage={fetchNowPlayingNextPage}
          hasNextPage={nowPlayingHasNextPage}
          isLoading={nowPlayinIsLoading}
          title="Now Playing"
          mediaType="movie"
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
          mediaType="movie"
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
          mediaType="movie"
        />
      </section>

      <hr className="mx-2 border-white/50" />

      <section>
        <CarouselPosterList
          items={upComingItems}
          fetchNextPage={fetchUpComingNextPage}
          hasNextPage={upComingHasNextPage}
          isLoading={upComingIsLoading}
          title="UpComing"
          mediaType="movie"
        />
      </section>

      <hr className="mx-2 border-white/50" />
    </div>
  );
};

export default Movie;

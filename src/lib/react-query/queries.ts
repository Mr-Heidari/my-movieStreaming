import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  getAiringTodaySeries,
  getAllDayTrendings,
  getAllWeekTrendings,
  getInifinityPopulareMovies,
  getMovieById,
  getMovieCreditById,
  getMovieDirectorAndWriter,
  getMovieImagesById,
  getMovieRealeseDateById,
  getMovieRecomendationById,
  getMovieVideoById,
  getMoviesByGenre,
  getNowPlayingMovies,
  getOnAirSeries,
  getPopulareSeries,
  getSerieById,
  getSeriesByGenre,
  getSeriesCreditById,
  getSeriesImageById,
  getSeriesRecomendationById,
  getSeriesVideoById,
  getTopRatedMovies,
  getTopRatedSeries,
  getUpComingMovies,
} from "@/api/tmdb";
import { MovieDetaile, SeriesDetaile } from "@/types";

type Page = {
  length: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  page: number;
  previousCursor?: number;
  nextCursor?: number;
};

export const useGetAllDayTrendings = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_DAY_TRENDINGS],
    queryFn: getAllDayTrendings,
  });
};

export const useGetAllWeekTrendings = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_WEEK_TRENDINGS],
    queryFn: getAllWeekTrendings,
  });
};

export const useGetInifinityPopulareMovies = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_INFINIT_POPULARE_MOVIES],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: getInifinityPopulareMovies,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        return null;
      }
      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetInifinityRecomendedMovies = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECOMENDED_MOVIES],
    queryFn: () => getMovieRecomendationById({ id: id }),
  });
};

export const useGetMovieById = ({ id }: { id: string }) => {
  return useQuery<MovieDetaile>({
    queryKey: [QUERY_KEYS.GET_MOVIE_BY_ID],
    queryFn: () => getMovieById(id),
  });
};

export const useGetMovieReleaseDateById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_RELEASE_BY_ID],
    queryFn: () => getMovieRealeseDateById(id),
  });
};

export const useGetMovieDirectorAndWriter = ({ id }: { id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any[] | undefined>({
    queryKey: [QUERY_KEYS.GET_MOVIE_DIRECTOR_WRITER],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: () => getMovieDirectorAndWriter(id),
  });
};

export const useGetSeriesById = ({ id }: { id: string }) => {
  return useQuery<SeriesDetaile>({
    queryKey: [QUERY_KEYS.GET_SERIES_BY_ID],
    queryFn: () => getSerieById(id),
  });
};

export const useGetSeriesCreditById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERIES_CREDIT_BY_ID],
    queryFn: () => getSeriesCreditById(id),
  });
};

export const useGetSeriesImageById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERIES_IMAGE_BY_ID],
    queryFn: () => getSeriesImageById(id),
  });
};

export const useGetSeriesVideoById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERIES_VIDEO_BY_ID],
    queryFn: () => getSeriesVideoById(id),
  });
};

export const useGetCreditByMovieId = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_CREDITS_BY_ID],
    queryFn: () => getMovieCreditById(id),
  });
};

export const useGetImageByMovieId = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_Image_BY_ID],
    queryFn: () => getMovieImagesById(id),
  });
};

export const useGetVideoByMovieId = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_VIDEO_BY_ID],
    queryFn: () => getMovieVideoById(id),
  });
};

export const useGetSeriesRecomended = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERIES_RECOMENDED_BY_ID],
    queryFn: () => getSeriesRecomendationById({ id: id }),
  });
};

export const useGetInifinityNowPlayingMovies = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_NOW_PLAYING_MOVIES],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: getNowPlayingMovies,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }
      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetInifinityTopRatedMovies = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_TOP_RATED_MOVIES],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: getTopRatedMovies,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }

      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetInifinityUpComingMovies = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_UPCOMING_MOVIES],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: getUpComingMovies,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }

      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetMoviesByGenre = (id: string) => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_MOVIES_BY_GENRE],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => {
      return getMoviesByGenre({ genreid: id, page: pageParam });
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }

      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetTopRatedSeries = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_TOP_RATED_SERIES],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: getTopRatedSeries,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }

      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetOnAirSeries = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_ON_AIR_SERIES],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: getOnAirSeries,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }

      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetAiringTodaySeries = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_AIRING_TODAY_SERIES],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: getAiringTodaySeries,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }

      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetPopulareSeries = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_POPULARE_SERIES],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: getPopulareSeries,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }

      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

export const useGetSeriesByGenre = (id: string) => {
  return useInfiniteQuery<Page, Error>({
    queryKey: [QUERY_KEYS.GET_SERIES_BY_GENRE],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => {
      return getSeriesByGenre({ genreid: id, page: pageParam });
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    getNextPageParam: (lastPage: Page) => {
      if (lastPage && lastPage.length === 0) {
        console.log("asghar");
        return null;
      }

      const nextpage = lastPage?.page;

      return nextpage + 1;
    },
  });
};

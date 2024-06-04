import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
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
  getSerieById,
} from "@/api/tmdb";
import { MovieDetaile, SeriesDetaile } from "@/types";

interface Page {
  length: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  page: number;
  previousCursor?: number;
  nextCursor?: number;
}

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
        console.log("asghar");
        return null;
      }
      const nextpage = lastPage?.page;
      console.log(lastPage);
      return nextpage + 1;
    },
  });
};

export const useGetInifinityRecomendedMovies = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECOMENDED_MOVIES],
    queryFn:()=> getMovieRecomendationById({id:id}),
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

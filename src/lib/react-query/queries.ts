import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
import { INewUser, MovieDetaile, SeriesDetaile } from "@/types";
import {
  createUserAccount,
  deleteSavedMovie,
  getCurrentUser,
  saveMovie,
  signInAccount,
  signOutAccount,
} from "@/api/appwrite";

type Page = {
  length: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  page: number;
  previousCursor?: number;
  nextCursor?: number;
};

//Trends
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
//end of trends

//############################################### Movies
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
    queryKey: [QUERY_KEYS.GET_RECOMENDED_MOVIES,id],
    queryFn: () => getMovieRecomendationById({ id: id }),
  });
};

export const useGetMovieById = ({ id }: { id: string }) => {
  return useQuery<MovieDetaile>({
    queryKey: [QUERY_KEYS.GET_MOVIE_BY_ID,id],
    queryFn: () => getMovieById(id),
  });
};

export const useGetMovieReleaseDateById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_RELEASE_BY_ID,id],
    queryFn: () => getMovieRealeseDateById(id),
  });
};

export const useGetMovieDirectorAndWriter = ({ id }: { id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any[] | undefined>({
    queryKey: [QUERY_KEYS.GET_MOVIE_DIRECTOR_WRITER,id],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    queryFn: () => getMovieDirectorAndWriter(id),
  });
};

export const useGetCreditByMovieId = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_CREDITS_BY_ID,id],
    queryFn: () => getMovieCreditById(id),
  });
};

export const useGetImageByMovieId = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_Image_BY_ID,id],
    queryFn: () => getMovieImagesById(id),
  });
};

export const useGetVideoByMovieId = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_VIDEO_BY_ID,id],
    queryFn: () => getMovieVideoById(id),
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
    queryKey: [QUERY_KEYS.GET_MOVIES_BY_GENRE,id],
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
//end of movie

//################################################## Series
export const useGetSeriesById = ({ id }: { id: string }) => {
  return useQuery<SeriesDetaile>({
    queryKey: [QUERY_KEYS.GET_SERIES_BY_ID,id],
    queryFn: () => getSerieById(id),
  });
};

export const useGetSeriesCreditById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERIES_CREDIT_BY_ID,id ],
    queryFn: () => getSeriesCreditById(id),
  });
};

export const useGetSeriesImageById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERIES_IMAGE_BY_ID,id],
    queryFn: () => getSeriesImageById(id),
  });
};

export const useGetSeriesVideoById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERIES_VIDEO_BY_ID,id],
    queryFn: () => getSeriesVideoById(id),
  });
};

export const useGetSeriesRecomended = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SERIES_RECOMENDED_BY_ID,id],
    queryFn: () => getSeriesRecomendationById({ id: id }),
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
    queryKey: [QUERY_KEYS.GET_SERIES_BY_GENRE,id],
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
//end of series

//authentication
export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useSaveMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      mediaId,
      imageUrl,
      mediaName,
    }: {
      userId: string;
      mediaId: string;
      imageUrl: string;
      mediaName: string;
    }) => saveMovie(userId, mediaId, imageUrl, mediaName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MOVIE_BY_ID],
      });
    },
  });
};

export const useDeleteSavedMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedMovie(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SERIES_BY_ID],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

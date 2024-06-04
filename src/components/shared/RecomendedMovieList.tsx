import { useGetInifinityRecomendedMovies } from "@/lib/react-query/queries";
import { MovieDetaile } from "@/types";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const RecomendedMovieList = () => {
  const { id } = useParams();

  const { data: recomended } = useGetInifinityRecomendedMovies(id || "");

  return (
    <div className="w-[300px] max-h-fit border-2 bg-neutral-800 border-black/50 rounded-md p-2  text-white">
      <header>
        <h2 className="text-2xl font-semibold mb-2">Recommendations</h2>
      </header>
      <main>
        <section className="flex flex-col gap-2">
          {recomended?.results.slice(0,8).map((movie: MovieDetaile) => (
            <Link to={`/movie/${movie.id}`}>
              <div className="max-w-fit p-0 text-white flex flex-row gap-5 relative ">
                <Card className=" border-4 border-black/50  ">
                  <CardContent className=" p-0 relative ">
                    <div className="relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                        className="w-full h-full rounded-sm object-cover"
                        alt=""
                      />
                      <div className="h-full w-full absolute bottom-0  bg-gradient-to-t from-black  flex">
                        <img
                          className="m-auto w-10 h-10 md:w-16  md:h-16 opacity-25 hover:opacity-100 bg-black rounded-full p-2"
                          src="/assets/icons/right-arrow.svg"
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
                    <div className="flex flex-col font-semibold text-center absolute bottom-5 left-1/2 -translate-x-1/2 ">
                      <p className="w-[250px] max-w-[250px]  line-clamp-1 text-ellipsis">
                        {movie?.title
                          ? movie?.title
                          : movie?.original_title
                          ? movie?.original_title
                          : ""}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default RecomendedMovieList;

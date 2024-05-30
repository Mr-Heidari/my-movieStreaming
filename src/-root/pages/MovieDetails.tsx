import {
  useGetMovieById,
  useGetMovieDirectorAndWriter,
} from "@/lib/react-query/queries";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useParams } from "react-router-dom";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="z-10 w-full  flex flex-row gap-2 ">
      <Skeleton className="md:w-[300px] max-md:w-[200px] max-sm:min-w-[110px] max-sm:w-[110px] h-full bg-neutral-600"></Skeleton>
      <div className="flex flex-col w-full gap-3 md:gap-6 justify-center">
        <Skeleton className=" w-[20%] h-4 bg-neutral-600"></Skeleton>
        <Skeleton className=" w-[50%] h-4 bg-neutral-600"></Skeleton>
        <div className=" flex flex-row items-center gap-2">
          <Skeleton className=" w-12 h-12 rounded-full bg-neutral-600"></Skeleton>
          <Skeleton className=" w-20 h-4 bg-neutral-600"></Skeleton>
        </div>
        <Skeleton className=" w-52 h-10 bg-neutral-600"></Skeleton>
        <Skeleton className=" w-full h-20 bg-neutral-600"></Skeleton>
        <Skeleton className=" w-[70%] h-10 bg-neutral-600"></Skeleton>
      </div>
    </div>
  );
};

const MovieDetails = () => {
  const { id } = useParams();

  const { data: movieDetaile, isLoading: isDetailLoading } = useGetMovieById({
    id: id || "",
  });

  const { data: D_and_W } = useGetMovieDirectorAndWriter({ id: id || "" });

  const getGenres = () => {
    return movieDetaile?.genres?.map((genre) => {
      return genre.name;
    });
  };

  return (
    <div className="pt-28">
      <header className="">
        <div
          className={`w-full md:h-[500px] h-[300px]  flex flex-row p-2 sm:p-5 lg:px-20 sm:px-5 relative ${
            isDetailLoading ? "bg-neutral-800" : "bg-black/50"
          }  overflow-hidden gap-0 sm:gap-5 border-y-2 border-white/30`}
        >
          {isDetailLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <section className=" absolute top-0 right-0  -z-10  w-full h-[120%]  ">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetaile?.poster_path}`}
                  alt=""
                  className=" object-fill blur-md w-full h-full"
                />
                <div className=" absolute from-black bg-gradient-to-r top-0 z-20 w-full h-full"></div>
              </section>
              <section className="flex items-center">
                {!isDetailLoading ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetaile?.poster_path}`}
                    alt=""
                    className="md:w-[400px] max-md:w-[240px] max-sm:h-[250px] max-sm:min-w-[150px] max-sm:w-[150px] h-full z-10 border-2 border-white/30 rounded-sm"
                  />
                ) : (
                  <Skeleton className="md:w-[400px] items-center flex justify-center max-md:w-[240px] max-sm:min-w-[110px] max-sm:w-[110px] h-full bg-neutral-600 "></Skeleton>
                )}
              </section>
              <section className="flex flex-col gap-3 sm:gap-5 justify-center text-white w-full  max-sm:scale-[75%] max-md:scale-[65%] max-md:-translate-x-[10%] max-sm:-translate-x-[5%] ">
                <div>
                  <h1 className="text-4xl font-bold flex flex-row gap-2 max-sm:text-xl">
                    {movieDetaile?.original_title}{" "}
                    <p className="text-white/50">{`(${movieDetaile?.release_date?.slice(
                      0,
                      4
                    )})`}</p>
                  </h1>
                  <p className="text-white/80 max-sm:text-xs">
                    {movieDetaile?.release_date} <strong>&middot;</strong>{" "}
                    {getGenres()?.join(" , ")} {movieDetaile?.runtime}m
                  </p>
                </div>
                <div className="text-white flex flex-row items-center gap-2 ">
                  <div className="w-16 h-16 max-sm:w-12 max-sm:h-12">
                    <CircularProgressbar
                      value={movieDetaile?.vote_average || 0}
                      styles={buildStyles({
                        rotation: 0,

                        strokeLinecap: "butt",

                        textSize: "20px",

                        pathTransitionDuration: 0.5,

                        pathColor: "#BF2A2A",
                        textColor: "#000",
                        trailColor: "#fff",
                        backgroundColor: "#DADADA",
                      })}
                      strokeWidth={8}
                      maxValue={10}
                      text={
                        movieDetaile
                          ? `${
                              parseFloat(
                                movieDetaile?.vote_average?.toFixed(1)
                              ) * 10
                            }
            `
                          : "0"
                      }
                      background={true}
                      backgroundPadding={8}
                    />
                  </div>
                  <p>User Score</p>
                </div>
                <div className="flex flex-row gap-5 w-full max-sm:hidden">
                  {/** like  */}
                  <HoverCard>
                    <HoverCardTrigger>
                      <img
                        src="/assets/icons/heart.svg"
                        alt=""
                        className=" max-md:w-6 w-12 bg-red-900 p-3 rounded-full brightness-200 cursor-pointer min-w-10"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-red-700 w-fit p-1 px-2 border-none text-xs">
                      Mark as favorite
                    </HoverCardContent>
                  </HoverCard>

                  {/** save  */}
                  <HoverCard>
                    <HoverCardTrigger>
                      <img
                        src="/assets/icons/save.svg"
                        alt=""
                        className=" max-md:w-6 min-w-10 w-12 bg-red-900 p-3 rounded-full brightness-200 cursor-pointer"
                        title="asghar"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-red-700 w-fit p-1 px-2 border-none text-xs">
                      Add to your watchlist
                    </HoverCardContent>
                  </HoverCard>
                  <div className=" flex flex-row  w-full items-center cursor-pointer brightness-75 hover:brightness-100 transition">
                    <img
                      src="/assets/icons/play-icone.svg"
                      alt=""
                      className="w-10 h-10"
                    />
                    <p>Play trailer</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold max-sm:text-lg">
                    Overview
                  </h2>
                  <p className="line-clamp-2 text-white/50 max-sm:text-sm">
                    {movieDetaile?.overview}
                  </p>
                </div>
                <div className=" flex flex-row gap-5 sm:gap-10">
                  { D_and_W?.map((members: { name: string; job: string }) => (
                    <div className=" flex flex-col ">
                      <p className="font-semibold max-sm:text-sm">
                        {members?.name}
                      </p>
                      <p className=" text-white/50 text-sm max-sm:text-xs">
                        {members?.job}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default MovieDetails;

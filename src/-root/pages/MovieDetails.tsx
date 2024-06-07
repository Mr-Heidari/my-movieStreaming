import {
  useDeleteSavedPost,
  useGetCreditByMovieId,
  useGetCurrentUser,
  useGetInifinityRecomendedMovies,
  useGetMovieById,
  useGetMovieDirectorAndWriter,
  useSavePost,

} from "@/lib/react-query/queries";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {  useParams } from "react-router-dom";
import { Link as SmoothScroll } from "react-scroll";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import CarouselCreditList from "@/components/shared/CarouselCreditList";
import RecomendedMovieList from "@/components/shared/RecomendedMovieList";
import { languageName } from "@/constants/languageName";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RecomendedCarouselList from "@/components/shared/RecomendedCarouselList";
import MediaBar from "@/components/shared/MediaBar";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Models } from "appwrite";

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
  const { id } = useParams()
  
  const { data: currentUser } = useGetCurrentUser();

  const { user } = useUserContext();

  const [isSaved, setIsSaved] = useState(false);

  const { mutate: savePost, isPending: isSavingPost } = useSavePost();

  const { mutate: deleteSavePost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record?.mediaId == id
  );

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    //saved post id  to user collection  inside saved attribute on DB
    savePost({ userId: user.id, mediaId: `${id}` });
    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
    console.log('asghar');
  }, [currentUser]);

  const { data: movieDetaile, isLoading: isDetailLoading } = useGetMovieById({
    id: id || "",
  });

  const { data: credits, isPending: isCreditOnLoading } = useGetCreditByMovieId(
    {
      id: id || "",
    }
  );
  const { data: D_and_W } = useGetMovieDirectorAndWriter({ id: id || "" });

  const { data: recomended } = useGetInifinityRecomendedMovies(id || "");

  const getGenres = () => {
    return movieDetaile?.genres?.map((genre) => {
      return genre.name;
    });
  };

  return (
    <div className="py-28  lg:flex lg:flex-row">
      <section className="relative order-0  box-border lg:max-w-[78%] md:mr-2">
        <header className=" md:ml-2 ">
          <div
            className={`w-full  md:h-[400px] h-[250px]  flex flex-row p-2 sm:p-5 lg:px-5 sm:px-5 relative ${
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
                      className="md:w-[400px] max-md:w-[240px] max-sm:h-[220px] max-sm:min-w-[120px] max-sm:w-[120px] h-full z-10 border-2 border-white/30 rounded-sm"
                    />
                  ) : (
                    <Skeleton className="md:w-[400px] items-center flex justify-center max-md:w-[240px] max-sm:min-w-[110px] max-sm:w-[110px] h-full bg-neutral-600 "></Skeleton>
                  )}
                </section>

                <section className="flex flex-col gap-3 md:gap-5 justify-center text-white w-full  max-sm:scale-[73%] max-md:scale-[65%] max-md:-translate-x-[10%]  min-w-[80%]">
                  <div>
                    <h1 className="text-4xl font-bold flex flex-row gap-2 max-md:text-xl line-clamp-1 text-ellipsis">
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

                  <div>
                    <h2 className="text-2xl font-semibold max-sm:text-lg">
                      Overview
                    </h2>
                    <p className="line-clamp-2 text-white/70 max-sm:text-sm">
                      {movieDetaile?.overview}
                    </p>
                  </div>

                  <div className=" flex flex-row gap-5 sm:gap-10">
                    {D_and_W?.map((members: { name: string; job: string }) => (
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

        <main className="text-white/85">
          <section className=" flex flex-col gap-2 mx-5 mt-5">
            {" "}
            <p>
              {" "}
              <strong className="text-xl">Status</strong> :{" "}
              {movieDetaile?.status}{" "}
            </p>
            <p>
              <strong className="text-xl">Original Language </strong>:
              {movieDetaile?.original_language
                ? ` ${languageName.of(movieDetaile?.original_language)} `
                : ""}
            </p>
          </section>
          {/** just show on mobile */}
          <section className=" text-white  p-5 w-full">
            <div className="w-full flex flex-row justify-between  items-center gap-2">
              <SmoothScroll
                to={"mediatab"}
                smooth={true}
                duration={200}
                offset={-100}
                className=" flex flex-row items-center cursor-pointer hover:brightness-75 brightness-100 transition p-2 pr-4 rounded-md bg-red-700 justify-center w-fit"
              >
                <img
                  src="/assets/icons/play-icone.svg"
                  alt=""
                  className="w-8 h-8  object-cover"
                />
                <p className="line-clamp-1">Play trailer</p>
              </SmoothScroll>
              <div className="flex flex-row border-2 border-white/30 w-fit p-1 gap-2 rounded-md">
                {/** like */}
                <HoverCard>
                  <HoverCardTrigger>
                    <img
                      src="/assets/icons/like-icone.svg"
                      alt=""
                      className="w-9 object-contain cursor-pointer hover:bg-red-700 p-1 rounded-md opacity-90"
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-red-700 px-2 w-fit border-none text-xs">
                    Like
                  </HoverCardContent>
                </HoverCard>

                {/** dislike */}
                <HoverCard>
                  <HoverCardTrigger>
                    <img
                      src="/assets/icons/dislike-icone.svg"
                      alt=""
                      className="w-9 object-contain cursor-pointer hover:bg-red-700 p-1 rounded-md opacity-90"
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-red-700 w-fit px-2  border-none text-xs">
                    Dislike
                  </HoverCardContent>
                </HoverCard>

                {/** save */}
                
              
                <HoverCard>
                  <HoverCardTrigger>
                  {isSavingPost || isDeletingSaved ? (
                    <div>
                      <Loader width={30} height={30} />{" "}
                    </div>):
                    <img
                      src={
                        isSaved
                          ? "/assets/icons/saved.svg"
                          : "/assets/icons/save.svg"
                      }
                      alt=""
                      className="w-9 object-contain cursor-pointer hover:bg-red-700 p-1 rounded-md opacity-90"
                    onClick={(e)=>handleSavePost(e)}/>}
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-red-700 px-2 w-fit border-none text-xs">
                    {isSaved ? 'remove from watch list' : 'add to watch list'}
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </section>


          <hr className="mx-2 border-white/50 mb-5"/>


          <section className="text-white/85 mx-2 flex flex-col gap-1">
            <h3 className=" md:text-2xl font-semibold mb-2">Top Billed Cast</h3>
            <CarouselCreditList item={credits} loading={isCreditOnLoading} />
          </section>

          <hr className="mx-2 border-white/50 my-5 mt-10"/>
          <section>
            <MediaBar />
          </section>

          <hr className=" mx-2 border-white/50 my-5" />
          

          <section className="lg:hidden mt-5 mx-2">
            <h3 className="lg:text-2xl font-semibold my-auto mb-2">
              Recommendations
            </h3>
            <RecomendedCarouselList item={recomended} type="movie"/>
          </section>
          <section className=" mt-5 m-2">
            <h3 className="md:text-2xl font-semibold  mb-5">Comments</h3>
            <hr className="mx-2 border-black/50" />
            <div className="w-full h-52 bg-neutral-950 rounded-md p-3">
              <div className="md:mx-10 mx-1 flex flex-row p-1 bg-neutral-800 rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Input
                  className="border-none placeholder:text-white/50"
                  placeholder="add your comment"
                />
                <button className="my-auto flex flex-row opacity-80 p-2 px-6 md:px-4  rounded-full bg-neutral-900 max-md:scale-90">
                  <p>Send</p>
                  <img src="/assets/icons/send-icone.svg" alt="" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </section>
      <aside className="order-1 border-l-white/20 border-l-2  max-lg:hidden">
        <RecomendedMovieList item={recomended} type="movie"/>
      </aside>
    </div>
  );
};


export default MovieDetails;

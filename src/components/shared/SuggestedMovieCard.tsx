import { movieGenreIds } from "@/constants/genresId";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Skeleton } from "../ui/skeleton";

type prop = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  loader: boolean;
};
const SuggestedMovieCard = ({ item, loader }: prop) => {
  const getGenres = () => {
    return item?.results[0].genre_ids.map((genre: number) => {
      for (let i = 0; i < movieGenreIds.length; i++) {
        if (genre === movieGenreIds[i].id) {
          return movieGenreIds[i].name;
        }
      }
    });
  };

  return (
    <main className="cursor-pointer h-[200px] md:h-[300px] bg-neutral-800 flex flex-row gap-2 sm:gap-5 mx-2 md:mx-20 rounded-lg overflow-hidden border-2 border-black/70  relative max-[480px]:justify-between">
      {loader ? (
        <Skeleton className="w-full h-full bg-neutral-600 flex "> <img src="./assets/icons/Spinner-2.gif" alt=""  className="m-auto"/> </Skeleton>
      ) : (
        <>
          <section>
            <img
              src={`https://image.tmdb.org/t/p/w500${item?.results[0].poster_path}`}
              alt=""
              className=" min-w-[140px] w-[140px] min-h-[210px]   md:min-w-[195px] md:h-full object-cover "
            />
          </section>
          <section className="flex flex-col flex-wrap max-md:pt-2 md:justify-around w-full ">
            <div className=" flex flex-col max-sm:flex-row md:flex-row gap-5 py-5 text-white max-[480px]:hidden">
              <div className="w-[70px] h-[70px] max-sm:w-[45px] max-sm:h-[45px] md:w-[100px] md:h-[100px] z-20">
                <CircularProgressbar
                  value={item?.results[0].vote_average}
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
                  text={`${
                    parseFloat(item?.results[0].vote_average.toFixed(1)) * 10
                  }
          `}
                  background={true}
                  backgroundPadding={8}
                />
              </div>
              <div className="flex flex-col gap-2 my-auto z-20 ">
                <p>
                  {item?.results[0].title
                    ? item?.results[0].title
                    : item?.results[0].original_title
                    ? item?.results[0].original_title
                    : item?.results[0].name}
                </p>
                <p className="text-xs  opacity-50 ">
                  {getGenres()?.join(" | ")}
                </p>
              </div>
            </div>
            <p className="max-w-[70%] text-white md:text-lg line-clamp-2 text-ellipsis max-md:translate-y-1/2 max-sm:text-sm max-[480px]:hidden">
              {item?.results[0].overview}
            </p>

            <div className="min-[480px]:hidden flex flex-col flex-wrap gap-5  justify-center w-full items-center">
              <div className="flex flex-row gap-2 justify-center">
                <div className="w-12 h-12 ">
                  <CircularProgressbar
                    value={item?.results[0].vote_average}
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
                    text={`${
                      parseFloat(item?.results[0].vote_average.toFixed(1)) * 10
                    }
          `}
                    background={true}
                    backgroundPadding={8}
                  />
                </div>

                <div className="flex flex-col gap-2 my-auto z-20 text-white">
                  <p>
                    {item?.results[0].title
                      ? item?.results[0].title
                      : item?.results[0].original_title
                      ? item?.results[0].original_title
                      : item?.results[0].name}
                  </p>
                </div>
              </div>
              <p className="text-white/80 text-xs line-clamp-3">
                {item?.results[0].overview}
              </p>
              <button className="bg-red-500 rounded-md p-1 px-2 w-fit text-white">
                Play
              </button>
            </div>
          </section>
          {/* <section className="md:hidden max-sm:hidden text-white line-clamp-2 text-ellipsis text-xs w-full bg-red-300"> <p >
      {item?.results[0].overview}
            </p></section> */}
          <button className="bg-red-500 w-fit h-fit p-2 px-4 rounded-md text-white max-[480px]:hidden absolute bottom-6 text-xl right-5 hover:scale-125 transition">
            Play
          </button>
        </>
      )}
    </main>
  );
};

export default SuggestedMovieCard;

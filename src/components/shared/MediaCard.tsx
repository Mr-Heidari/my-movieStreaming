import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Media } from "@/types";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useSavePost,
} from "@/lib/react-query/queries";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import Loader from "./Loader";

type props = {
  card: Media;
  mediaType?: string;
};

const MediaCard = ({ mediaType, card }: props) => {
  const { data: currentUser } = useGetCurrentUser();

  const { user } = useUserContext();

  const [isSaved, setIsSaved] = useState(false);

  const { mutate: savePost, isPending: isSavingPost } = useSavePost();

  const { mutate: deleteSavePost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record?.mediaId == card?.id
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
    savePost({ userId: user.id, mediaId: `${card.id}` });
    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
    console.log('asghar');
  }, [currentUser]);

  return (
    <div className="max-w-fit h-fit">
      <section>
        <div className="max-w-fit p-0 text-white flex flex-col gap-5 ">
          <Card className=" border-4 border-black/50  ">
            <CardContent className=" p-0 relative ">
              <Link
                to={
                  mediaType
                    ? `/${mediaType}/${card?.id}`
                    : card.media_type === "movie"
                    ? `/movie/${card?.id}`
                    : `/tv/${card?.id}`
                }
              >
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${card?.poster_path}`}
                    className="min-w-[100px] h-[150px] md:min-w-[200px] md:h-[300px] rounded-md  hover:bg-gradient-to-t hover:from-black"
                    alt=""
                  />
                  <div className="h-full w-full absolute bottom-0 opacity-0 hover:opacity-100 hover:bg-gradient-to-t hover:from-black/70  flex">
                    <img
                      className="m-auto w-10 h-10 md:w-16  md:h-16 opacity-75 bg-black rounded-full p-2"
                      src="/assets/icons/right-arrow.svg"
                    />
                  </div>
                </div>
              </Link>
              <div>
                <div className="p-2 w-fit h-fit absolute top-0 right-0 md:top-2 md:right-2 rounded-full ">
                  {isSavingPost || isDeletingSaved ? (
                    <div className="bg-black/70 p-2 rounded-full">
                      <Loader width={22} height={22} />{" "}
                    </div>
                  ) : (
                    <img
                      src={
                        isSaved
                          ? "/assets/icons/saved.svg"
                          : "/assets/icons/save.svg"
                      }
                      alt=""
                      className=" brightness-200  max-md:w-6 bg-black/70 max-md:p-1 md:p-[6px] rounded-full cursor-pointer"
                      onClick={(e) => handleSavePost(e)}
                    />
                  )}
                </div>
              </div>

              <Skeleton className="h-full w-full bg-neutral-600 absolute top-0 left-0 -z-10">
                <img
                  src="/assets/icons/Spinner-2.gif"
                  alt=""
                  className="absolute w-10 h-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                />
              </Skeleton>

              <div className="absolute -bottom-5 left-2 md:w-16 md:h-16 w-10 h-10">
                <CircularProgressbar
                  value={card?.vote_average}
                  styles={buildStyles({
                    rotation: 0,

                    strokeLinecap: "butt",

                    textSize: "20px",

                    pathTransitionDuration: 0.5,

                    pathColor: "#DC2626",
                    textColor: "#fff",
                    trailColor: "#fff",
                    backgroundColor: "#111111",
                  })}
                  strokeWidth={8}
                  maxValue={10}
                  text={`${parseFloat(card?.vote_average?.toFixed(1)) * 10}`}
                  background={true}
                  backgroundPadding={8}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col text-center">
            <p className="max-w-[100px] md:max-w-[200px] max-md:text-xs line-clamp-2 text-ellipsis">
              {card?.title
                ? card?.title
                : card?.original_title
                ? card?.original_title
                : card?.name}
            </p>
            <p className="opacity-60 text-sm">
              {card?.release_date?.slice(0, 4)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaCard;

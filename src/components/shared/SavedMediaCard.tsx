// import {
//   useDeleteSavedPost,
//   useGetCurrentUser,
//   useGetMovieById,
//   useGetSeriesById,
//   useSavePost,
// } from "@/lib/react-query/queries";
// import { useEffect, useState } from "react";
// import Loader from "./Loader";
// import { Link } from "lucide-react";
// import { Card, CardContent } from "../ui/card";
// import { Skeleton } from "../ui/skeleton";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import { Models } from "appwrite";
// import { useUserContext } from "@/context/AuthContext";
// import { useParams } from "react-router-dom";
// import { getMovieById } from "@/api/tmdb";

// type props = {
//   mediaId: string;
// };
// const SavedMediaCard = ({ mediaId }: props) => {
//   const { id } = useParams();

//   const { data: currentUser } = useGetCurrentUser();

//   const { user } = useUserContext();

//   const [isSaved, setIsSaved] = useState(false);

//   const { mutate: savePost, isPending: isSavingPost } = useSavePost();

//   const { mutate: deleteSavePost, isPending: isDeletingSaved } =
//     useDeleteSavedPost();

// //   const savedPostRecord = currentUser?.save.find(
// //     (record: Models.Document) => record?.mediaId == id
// //   );

// //   const handleSavePost = (
// //     e: React.MouseEvent<HTMLImageElement, MouseEvent>
// //   ) => {
// //     e.stopPropagation();

// //     if (savedPostRecord) {
// //       setIsSaved(false);
// //       return deleteSavePost(savedPostRecord.$id);
// //     }

// //     //saved post id  to user collection  inside saved attribute on DB
// //     savePost({ userId: user.id, mediaId: `${id}` });
// //     setIsSaved(true);
// //   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [card, setCard] = useState<any>();

// //   const { data: movie} = useGetMovieById({
// //     id: mediaId,
// //   });
//   const { data: series} = useGetSeriesById({
//     id: mediaId,
//   });
//   const movie = getMovieById( mediaId)

// //   useEffect(() => {
// //     if (!movie) {
// //       setCard(series);
// //     } else if (!series) {
// //       setCard(movie);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     setIsSaved(!!savedPostRecord);
// //     console.log('asghar');
// //   }, [currentUser]);

//   if (!movie && !series) return <></>;

//   return (
//   <div><p>{movie?.id}</p></div>
//   );
// };

// export default SavedMediaCard;

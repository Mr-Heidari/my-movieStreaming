import { Link } from "react-router-dom";

type mediaDetail = {
  imageUrl: string;
  mediaName: string;
  mediaId: string;
  type:string
};

const SavedMediaCard = ({ imageUrl, mediaId, mediaName,type }: mediaDetail) => {
  return (
    <>
      <section className="max-w-fit text-center">
        <Link to={ `/${type}/${mediaId}`
                }>
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
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
        <p className="max-w-[100px] md:max-w-[200px] max-md:text-xs line-clamp-2 text-ellipsis">
          {mediaName}
        </p>
      </section>
    </>
  );
};

export default SavedMediaCard;

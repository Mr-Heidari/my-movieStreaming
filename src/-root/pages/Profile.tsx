import Loader from "@/components/shared/Loader";
import SavedMediaCard from "@/components/shared/SavedMediaCard";
import { useUserContext } from "@/context/useUserContext";
import {
  useGetCurrentUser,
  useSignOutAccount,
} from "@/lib/react-query/queries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();

  const { data: currentUser } = useGetCurrentUser();

  const { mutate: signOutAccount, isSuccess, isPending } = useSignOutAccount();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <div className="py-28 px-[2%] md:px-[10%] text-white/90 w-full">
      <header>
        <h1 className="md:text-4xl text-xl font-semibold mb-5">information</h1>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3 px-4 md:px-10">
            <p className="md:text-2xl font-semibold bg-neutral-950 w-fit p-3 px-6 rounded-md">
              <strong className="text-red-800">name</strong> : {user.name}
            </p>
            <p className="md:text-2xl font-semibold bg-neutral-950 w-fit p-3 px-6 rounded-md">
              <strong className="text-red-800">username</strong> :{" "}
              {user.username}
            </p>
            <p className="md:text-2xl font-semibold bg-neutral-950 w-fit p-3 px-6 rounded-md">
              <strong className="text-red-800">Email</strong> : {user.email}
            </p>
          </div>
          <section
            className=" bg-red-900 h-fit p-2 px-4 rounded-md cursor-pointer hover:scale-110 transition"
            onClick={() => signOutAccount()}
          >
            {isPending ? (
              <div>
                <Loader height={30} width={30} />
              </div>
            ) : (
              <>
                <p className="inline mr-2">Log Out</p>
                <img
                  src="/assets/icons/exit-icone.svg"
                  alt=""
                  className="inline-block"
                />
              </>
            )}
          </section>
        </div>
      </header>

      <hr className="mx-2 mt-5" />

      <main>
        <section>
          {" "}
          <h2 className="md:text-2xl  font-semibold my-5">Watch List </h2>
          <div className=" w-full flex flex-row flex-wrap gap-5">
            {currentUser?.save.map((media) => (
              <SavedMediaCard
                imageUrl={media.imageUrl}
                mediaId={media.mediaId}
                mediaName={media.mediaName}
              ></SavedMediaCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;

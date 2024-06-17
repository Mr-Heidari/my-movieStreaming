import Loader from "@/components/shared/Loader";
import MediaCard from "@/components/shared/MediaCard";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce";
import { useGetSearchedMedia } from "@/lib/react-query/queries";
import { Media } from "@/types";
import { useMemo, useState } from "react";

const Search = () => {
  const [searchValue, setSerchValue] = useState<string>("");

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isPending } = useGetSearchedMedia(debouncedSearch);

  const searchItems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return data?.pages?.flatMap((page) => page?.results);
  }, [data]);

  return (
    <div className="py-28 text-white md:mx-10 mx-5">
      <section className=" flex flex-row p-1 bg-neutral-800 rounded-full">
        <Input
          className="border-none placeholder:text-white/50"
          placeholder="Search movie tv "
          onChange={(e) => {
            setSerchValue(e.target.value);
            console.log(searchItems)
          }}
        />
        <button className="my-auto flex flex-row opacity-80 p-2 px-6 md:px-4  rounded-full  max-md:scale-90">
          <img src="/assets/icons/search-icone.svg" alt="" />
        </button>
      </section>

      <hr className="mt-5  border-white/30" />

      <p className="mt-5 mb-10 text-xl md:text-3xl font-semibold">Results</p>
      <section className="flex flex-row flex-wrap max-md:gap-1 gap-3 relative">
        {isPending ? (
          <Loader width={30} height={30}></Loader>
        ) : (
          <>
            {searchItems.length>0  ? (
              searchItems.map((item: Media) => (
                <>
                  {item.media_type !== "person" ? (
                    <MediaCard card={item} key={item.id}></MediaCard>
                  ) : (
                    <></>
                  )}
                </>
              ))
            ) : (
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{!searchValue ? '' : 'not results found'}</p>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Search;

import CarouselPosterList from "@/components/shared/CarouselPosterList";
import SuggestedMovieCard from "@/components/shared/SuggestedMovieCard";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetAllDayTrendings,
  useGetAllWeekTrendings,
  useGetInifinityPopulareMovies,
} from "@/lib/react-query/queries";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useUserContext();

  const [inifinityItems,setInifinityItems] =useState<object[]>()

  const { data: allTrendings, isPending: isTrendingLoading } =
    useGetAllDayTrendings();

  const { data: suggestedMovie, isPending: isSuggestedMovieLoading } =
    useGetAllWeekTrendings();

  const { data: popul, fetchNextPage ,hasNextPage ,isLoading:isPopulareLoading} = useGetInifinityPopulareMovies();

  const yetabe=()=>{

    for(let i=0 ; i<popul?.pages.length ;i++){
      if(!inifinityItems){
        console.log(inifinityItems)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unreachable code error
        setInifinityItems([popul?.pages[i]?.results])
      }else{
        console.log(inifinityItems)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unreachable code error
        setInifinityItems([...inifinityItems, popul?.pages[i]?.results])
      }
  
    }
  }
  useEffect(()=>{
    console.log('assaass')
    if(popul?.pages)yetabe()
    console.log(isAuthenticated)
  },[popul])

  return (
    <div className="max-md:pb-24 pb-10 pt-28">
      <header className="  " onClick={()=>{console.log(inifinityItems?.flat(1));fetchNextPage()}}>
        <section className="w-full h-[350px] md:h-[500px] relative bg-black bg-gradient-to-t from-red-600">
          <img
            src="/assets/images/home-poster.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30 brightness-50"
          />
          <section className="absolute top-10 px-10 w-full">
            <h1 className=" text-white/90  text-3xl md:text-7xl font-semibold">
              Welcome.
              <p className=" text-xl md:text-3xl  mt-1">
                Millions of movies, TV shows and people to discover. Explore
                now.
              </p>
            </h1>
            <Input
              placeholder="Serach for movies , tvshow ..."
              className="text-white placeholder:text-white/50 mt-2 md:mt-10 w-full"
            />
          </section>
          <section className="absolute bottom-0 h-24  md:h-40 bg-red-700/90 w-full px-10 text-white flex ">
            <div className="max-md:my-auto max-md:h-20">
              <img
                src="/assets/images/oscars-logo.png"
                alt=""
                className="mb-2 w-[100px] md:w-[300px] "
              />
              <Link
                to={"/oscarswinners"}
                className=" p-2 md:px-4 border-white border-2 max-md:text-xs rounded-full hover:bg-white/20 transition w-fit"
              >
                View the winners <strong>&#10230;</strong>
              </Link>
            </div>
          </section>
        </section>
      </header>
      <main>
        <section>
          <CarouselPosterList items={allTrendings} title={"Trending"} isLoading={isTrendingLoading} />
        </section>
        <section>
          <SuggestedMovieCard item={suggestedMovie} loader={isSuggestedMovieLoading} />
        </section>
        <section className="mt-5">
          <CarouselPosterList items={inifinityItems?.flat(1)} title={"What's Popular"} isLoading={isPopulareLoading} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} mediaType={'movie'}/>
        </section>
      </main>
    </div>
  );
};

export default Home;

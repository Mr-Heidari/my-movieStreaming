import { useGetInifinityPopulareMovies } from "@/lib/react-query/queries";
import { useState } from "react";

const About = () => {
  const [x,setX] =useState<object[]>()

  const { data: yechi, fetchNextPage } = useGetInifinityPopulareMovies();

  const yetabe=()=>{
  for(let i=0 ; i<yechi.pages.length ;i++){
    if(!x){

      setX([yechi.pages[i].results])
    }else{
      setX([...x, yechi.pages[i].results])
    }

  }
  }
  return (
    <div className=" pt-20">
      <button
        onClick={() => {
          fetchNextPage();
          console.log(yechi);
          yetabe()
          console.log(x?.flat(1)
          );
          
        }}
      >
        asgharfarhadi
      </button>
      {yechi?.pages.map((gooz) => (
        <p>asasassaa</p>
      ))}{" "}
    </div>
  );
};

export default About;

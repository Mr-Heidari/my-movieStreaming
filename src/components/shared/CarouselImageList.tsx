
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useRef } from "react";

type props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  type: string; 
};
const CarouselImageList = ({ item, type }: props) => {
  const classname = useRef<string>();
  if (type === "backdrop") {
    classname.current = "min-w-[250px] max-w-[250px] md:min-w-[500px]";
  } else {
    classname.current = "min-w-[100px] max-w-[100px] md:min-w-[200px]";
  }
  return (
    <div className="mx-2">
      <>
        <main className="bg-neutral-950 rounded-lg p-3">
          <div className="max-w-fit h-fit flex flex-row  gap-5 py-2 mx-2 overflow-x-auto section md:mx-5 max-md:no-scrollbar">
            
            {item &&
              item.map((image) => (
                <div className="max-w-fit p-0 text-white flex flex-col gap-5 ">
                  <Card className=" border-none  ">
                    <CardContent
                      className={` p-0 relative ${classname.current} h-fit`}
                    >
                      <div
                        className={`relative ${classname.current} md:h-[300px] h-[150px]`}
                      >
                        <img
                          src={
                            image.file_path
                              ? `https://image.tmdb.org/t/p/w500${image.file_path}`
                              : "/assets/icons/feelnessemoji.svg"
                          }
                          className={` h-full w-full  hover:bg-gradient-to-t rounded-md object-contain
                          }`}
                          alt=""
                        />
                        {image.file_path && (
                          <Skeleton className="w-full h-full rounded-md bg-neutral-600 absolute top-0 left-0 -z-10">
                            <img
                              src="/assets/icons/Spinner-2.gif"
                              alt=""
                              className="absolute w-10 h-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                            />
                          </Skeleton>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>
        </main>
      </>
    </div>
  );
};

export default CarouselImageList;

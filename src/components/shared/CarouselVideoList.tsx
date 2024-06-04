import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
};

const CarouselVideoList = ({ item }: props) => {
  return (
    <>
      <main className="w-full relative">
        <div className="max-w-fit h-fit flex flex-row max-md:gap-20 gap-5 py-2 mx-2 overflow-x-auto section md:mx-5">
          {item &&
            item.map((video) => (
              <div className=" max-w-fit z-10  ">
                <Card className="max-w-[420px] max-md:max-w-[250px]  border-none">
                  <CardContent className="w-[420px] h-[315px] max-md:max-w-[250px] max-md:min-w-[250px] max-md:h-[150px] relative p-0">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}?rel=0&html5=1`}
                      className="min-w-full min-h-full"
                      allowFullScreen={true}
                    ></iframe>
                    <Skeleton className="absolute top-0 left-0 min-w-full min-h-full  bg-neutral-700 -z-10"></Skeleton>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default CarouselVideoList;

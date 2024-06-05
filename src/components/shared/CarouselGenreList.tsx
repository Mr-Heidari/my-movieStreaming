import { movieGenreIds, seriesGenre } from "@/constants/genresId";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperButtons from "./SwiperButtons";

const CarouselGenreList = ({type }:{type:string}) => {
  return (
    <div className="mx-2">
      <section className="text-white">
        <h2 className="mb-2">Genres</h2>
        <Swiper className=" text-white " slidesPerView={'auto'} spaceBetween={20}>
            <SwiperButtons></SwiperButtons>
          {(type==='movie' ?  (movieGenreIds) : (seriesGenre) ).map((genre) => (
            <SwiperSlide className="max-w-fit "> 
              <Link
                to={`/${type}/${genre.name}/${genre.id}`}
                className="bg-neutral-950 rounded-md p-3 md:p-6 flex"
              >
                <p className="my-auto">{genre.name}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default CarouselGenreList;

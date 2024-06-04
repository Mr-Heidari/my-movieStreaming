const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export async function getAllDayTrendings() {
  try {
    const Trendings = await fetch(
      `https://api.themoviedb.org/3/trending/all/day`,
      options
    ).then((response) => response.json());

    if (!Trendings) throw Error;
    console.log(Trendings);

    return Trendings;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllWeekTrendings() {
  try {
    const Trendings = await fetch(
      `https://api.themoviedb.org/3/trending/all/week`,
      options
    ).then((response) => response.json());

    if (!Trendings) throw Error;
    console.log(Trendings);

    return Trendings;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getInifinityPopulareMovies({ pageParam = 1 }) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const populare: any = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${pageParam}`,
      options
    ).then((response) => response.json());

    if (!populare) throw Error;
    console.log(populare);

    return populare;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMovieById(id: string) {
  try {
    const movie = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    ).then((response) => response.json());

    if (!movie) throw Error;

    return movie;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieRealeseDateById(id: string) {
  try {
    const realese = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/release_dates`,
      options
    ).then((response) => response.json());

    if (!realese) throw Error;

    return realese;
  } catch (error) {
    console.log(error);
  }
}

export async function showenv() {
  console.log(import.meta.env.VITE_TMDB_API_KEY);
}

export async function getMovieDirectorAndWriter(id: string) {
  try {
    const realese = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?`,
      options
    )
      .then((response) => response.json())
      .then((jsonData) =>
        [
          jsonData?.crew?.filter(
            ({ job }: { job: string }) => job === "Director"
          ),
          jsonData?.crew?.filter(
            ({ job }: { job: string }) => job === "Writer"
          ),
        ].flat(1)
      );
    console.log(realese);
    if (!realese) throw Error;

    return realese;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieCreditById(id: string) {
  try {
    const credits = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    )
      .then((respons) => respons.json())
      .then((credit) => credit.cast);

    if (!credits) throw Error;
    console.log(credits);
    return credits;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMovieImagesById(id: string) {
  try {
    const images = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    ).then((response) => response.json());

    if (!images) throw Error;

    return images;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieVideoById(id: string) {
  try {
    const video = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((json) => json.results);

    if (!video) throw Error;

    return video;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieRecomendationById({ id }: { id: string }) {
  try {
    const recomended = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options
    ).then((respons) => respons.json());
    console.log(recomended);
    if (!recomended) throw Error;

    return recomended;
  } catch (error) {
    console.log(error);
  }
}

export async function getSerieById(id: string) {
  try {
    const series = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      options
    ).then((response) => response.json());

    if (!series) throw Error;

    return series;
  } catch (error) {
    console.log(error);
  }
}

export async function getSeriesCreditById(id: string) {
  try {
    const credits = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`,
      options
    )
      .then((respons) => respons.json())
      .then((credit) => credit.cast);

    if (!credits) throw Error;
    console.log(credits);
    return credits;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSeriesImageById(id: string) {
  try {
    const images = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/images`,
      options
    ).then((respons) => respons.json());

    if (!images) throw Error;
    console.log(images);
    return images;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSeriesVideoById(id: string) {
  try {
    const video = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((json) => json.results);
    console.log(video);
    if (!video) throw Error;

    return video;
  } catch (error) {
    console.log(error);
  }
}

export async function getSeriesRecomendationById({ id }: { id: string }) {
  try {
    const recomended = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`,
      options
    ).then((respons) => respons.json());
    console.log(recomended);
    if (!recomended) throw Error;

    return recomended;
  } catch (error) {
    console.log(error);
  }
}

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
          jsonData.crew.filter(
            ({ job }: { job: string }) => job === "Director"
          ),
          jsonData.crew.filter(({ job }: { job: string }) => job === "Writer"),
        ].flat(1)
      );
    console.log(realese);
    if (!realese) throw Error;

    return realese;
  } catch (error) {
    console.log(error);
  }
}

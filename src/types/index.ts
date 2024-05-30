export type Movie = {
  name: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetaile = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string | null | boolean;
  budget: number;
  genres: [{
    id:number,
    name:string
  },];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: number;
  production_companies: object[];
  production_countries: object[];
  release_date: string;
  revenue: number;
  runtime: string;
  spoken_languages: object[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

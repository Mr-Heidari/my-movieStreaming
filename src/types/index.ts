export type Media = {
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
  media_type:string;
};

export type MovieDetaile = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string | null | boolean;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
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
export type SeriesDetaile = {
  adult: boolean;
  backdrop_path: string;
  created_by: [{name:string}];
  episode_run_time: [];
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  networks: object[];
  next_episode_to_air: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  seasons: object[];
  spoken_languages: object[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

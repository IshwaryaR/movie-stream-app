export interface Content {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}

export interface ContentDetails {
  adult: false;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;
  first_air_date: string;
  revenue: 0;
  runtime: 102;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface ProductionCountries {
  iso_3166_1: "AU";
  name: "Australia";
}
export interface SpokenLanguages {
  english_name: "Arabic";
  iso_639_1: "ar";
  name: "العربية";
}

export interface SingleContentProps {
  content: {
    poster_path: string;
    title: string;
    media_type: string;
    release_date: string;
    vote_average: number;
    id: number;
  };
}
export interface CustomPaginationProps {
  setPage: any;
  numOfPages?: number;
}
export interface Genre {
  id: number;
  name: string;
}

export interface GenresProps {
  selectedGenres: any;
  setSelectedGenres: (genre: any) => void;
  genres: any;
  setGenres: (genre: any) => void;
  setPage: (page: number) => void;
  page: number;
  type: string;
}

export interface ContentModalProps {
  children: any;
  id: number;
  media_type: string;
}

export interface CarouselProps {
  id: number;
  media_type: string;
}

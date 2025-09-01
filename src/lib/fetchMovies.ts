import axios from 'axios'
import type { DiscoverMovieParams, DiscoverMovieResponse, MovieDetailsParams, MovieDetailsResponse, MovieDetailsSingleGenre } from '@/types'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMovies = async (params: DiscoverMovieParams & { page?: number }) => {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: "popularity.desc",
      page: params.page ?? 1,
      ...params,
    },
  });

  return res.data as DiscoverMovieResponse
};

export const fetchGenres = async (): Promise<MovieDetailsSingleGenre[]> => {
  const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });

  return res.data.genres;
};

export const fetchMovieDetails = async (params: MovieDetailsParams): Promise<MovieDetailsResponse> => {
  const res = await axios.get(`${BASE_URL}/movie/${params.movie_id}`, {
    params: { api_key: API_KEY },
  });

  return res.data;
};

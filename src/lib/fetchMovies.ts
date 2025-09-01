import axios from 'axios'
import type { DiscoverMovieResponse, MovieDetailsParams, MovieDetailsResponse } from '@/types'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMovies = async (page: number) => {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: 'popularity.desc',
      page,
    },
  })

  return res.data as DiscoverMovieResponse
}


export const fetchMovieDetails = async (params: MovieDetailsParams): Promise<MovieDetailsResponse> => {
  const res = await axios.get(`${BASE_URL}/movie/${params.movie_id}`, {
    params: { api_key: API_KEY },
  });

  return res.data;
};

import type { paths } from './tmdb-types'

export type DiscoverMovieParams = paths['/3/discover/movie']['get']['parameters']['query']
export type DiscoverMovieResponse = paths['/3/discover/movie']['get']['responses']['200']['content']['application/json']
export type DiscoverMovieResult = DiscoverMovieResponse['results']

export type MovieDetailsParams = paths['/3/movie/{movie_id}']['get']['parameters']['path'];
export type MovieDetailsResponse = paths['/3/movie/{movie_id}']['get']['responses']['200']['content']['application/json'];
export type MovieDetailsSingleGenre = NonNullable<MovieDetailsResponse['genres']>[number]; 
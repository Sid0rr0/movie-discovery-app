import type { paths } from './tmdb-types'

export type DiscoverMovieParams = paths['/3/discover/movie']['get']['parameters']['query']
export type DiscoverMovieResponse = paths['/3/discover/movie']['get']['responses']['200']['content']['application/json']
export type DiscoverMovieResult = DiscoverMovieResponse['results']
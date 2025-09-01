import React, { useState, Suspense } from 'react'
import { Card as SCard, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetails, fetchSimilarMovies } from '@/lib/fetchMovies'
import type { Movie, MovieDetailsSingleGenre } from '@/types'

interface CardProps {
  movie: Movie
}

// Separate component for Suspense
function MovieDetails({ movieId }: { movieId: number }) {
  const { data } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails({ movie_id: movieId }),
  })

  const { data: similarMovies } = useQuery({
    queryKey: ['similarMovies', movieId],
    queryFn: () => fetchSimilarMovies({ movie_id: movieId }),
  })

  return (
    <div className="mt-2 space-y-2 text-white">
      <p>
        <strong>Overview:</strong>
        {' '}
        {data?.overview}
      </p>
      <p>
        <strong>Genres:</strong>
        {' '}
        {data?.genres?.map((g: MovieDetailsSingleGenre) => g.name).join(', ')}
      </p>
      <p>
        <strong>Release Date:</strong>
        {' '}
        {data?.release_date}
      </p>
      <h3 className="text-lg font-semibold">Similar Movies:</h3>
      <div className="mt-4 flex flex-col max-h-32 overflow-y-scroll">
        {similarMovies?.results && similarMovies?.results.map(movie => (
          <div key={movie.id} className="mb-4">
            {movie.title}
            {' '}
            (
            {movie.release_date?.substring(0, 4)}
            )
          </div>
        ))}
      </div>
    </div>
  )
}

function MovieCardDetails({ movie }: CardProps) {
  return (
    <>
      <div className="flex justify-between mb-4 gap-4">
        <span>
          Average rating:
          {' '}
          {movie.vote_average}
        </span>
        <span>
          Release year:
          {' '}
          {movie.release_date?.substring(0, 4)}
        </span>
      </div>
      <div className="w-[300px] h-[169px] bg-gray-700 flex items-center justify-center">
        {movie.backdrop_path
          ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                alt={movie.title || 'Movie Poster'}
                width={300}
                height={169}
              />
            )
          : (
              <div>No Image Available</div>
            )}
      </div>
    </>
  )
}

export function MovieCard({ movie }: CardProps) {
  const [open, setOpen] = useState(false)

  return (
    <SCard className="flex flex-col py-4 rounded-lg bg-gray-800">
      <CardHeader>
        <CardTitle>
          <h2 className="text-lg font-semibold">{movie.title}</h2>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <MovieCardDetails movie={movie} />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="mt-4 px-3 w-full py-1 bg-blue-600 text-white rounded cursor-pointer">
            Show details
          </DialogTrigger>

          <DialogContent className="bg-gray-900 rounded-lg p-4 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">{movie.title}</DialogTitle>
            </DialogHeader>

            <Suspense fallback={<p className="text-white">Loading...</p>}>
              {open && <MovieDetails movieId={movie.id} />}
            </Suspense>

            <DialogClose className="mt-4 px-3 py-1 bg-gray-700 rounded cursor-pointer text-white">
              Close
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CardContent>
    </SCard>
  )
}

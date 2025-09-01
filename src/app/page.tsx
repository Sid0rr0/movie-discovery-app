
'use client'

import { Card } from '@/components/MovieCard';
import { MovieFilters } from '@/components/MovieFilters';
import { Pagination } from '@/components/Pagination';
import { fetchGenres, fetchMovies } from '@/lib/fetchMovies';
import { DiscoverMovieParams } from '@/types';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<DiscoverMovieParams>({});


  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    placeholderData: []
  });

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['movies', page, filters],
    queryFn: () => fetchMovies({ ...filters, page }),
    placeholderData: keepPreviousData
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading movies</p>

  return (
    <div className="p-5 max-w-6xl mx-auto bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className='mb-8 text-3xl font-bold'>Movie Discovery App</h1>

      <MovieFilters genres={genres || []} onApply={setFilters} />

      <div className="flex flex-col md:flex-row gap-6 w-full flex-wrap mt-4">
        {data?.results && data.results.map((movie, index) => (
          <Card 
            key={movie.id || index}
            movieId={movie.id || 1}
            title={movie.title || "Untitled"}
          >
            <div className='flex justify-between mb-4 gap-4'>
              <span>Average rating: {movie.vote_average}</span>
              <span>Release year: {movie.release_date?.substring(0, 4)}</span>
            </div>
            {movie.backdrop_path && (
              <div className="w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                  alt={movie.title || "Movie Poster"}
                  width={300}
                  height={169}
                />
              </div>
            )}
          </Card>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={data?.total_pages ?? 1}
        onPageChange={setPage}
        isFetching={isFetching}
      />
    </div>
  );
}

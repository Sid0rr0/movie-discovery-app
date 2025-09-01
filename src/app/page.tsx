
'use client'

import { Card } from '@/components/Card';
import { Pagination } from '@/components/Pagination';
import { fetchMovies } from '@/lib/fetchMovies';

import { useQuery } from '@tanstack/react-query';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
    
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading movies</p>

  return (
    <div className="p-5 max-w-6xl mx-auto bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className='mb-8 text-3xl font-bold'>Movie Discovery App</h1>
      <div className="flex flex-col md:flex-row gap-6 w-full flex-wrap">
        {data?.results && data.results.map((movie, index) => (
          <Card 
            key={movie.id || index} 
            title={movie.title || "Untitled"}
          >
            <div className='flex justify-between mb-4'>
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

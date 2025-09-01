'use client'

import { MovieCard } from '@/components/MovieCard'
import { MovieFilters } from '@/components/MovieFilters'
import { Pagination } from '@/components/Pagination'
import { fetchGenres, fetchMovies } from '@/lib/fetchMovies'
import { DiscoverMovieParams } from '@/types'

import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { useState } from 'react'

export default function Home() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<DiscoverMovieParams>({})

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    placeholderData: [],
  })

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['movies', page, filters],
    queryFn: () => fetchMovies({ ...filters, page }),
    placeholderData: keepPreviousData,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading movies</p>

  return (
    <div className="p-5 max-w-6xl mx-auto bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="mb-8 text-3xl font-bold">Movie Discovery App</h1>

      <MovieFilters genres={genres || []} onApply={setFilters} />

      <div className="flex flex-col md:flex-row gap-6 w-full flex-wrap mt-4 justify-center">
        {data?.results && data.results.map((movie, index) => (
          <MovieCard
            key={movie.id || index}
            movie={movie}
          />

        ))}
      </div>

      <Pagination
        page={page}
        totalPages={data?.total_pages ?? 1}
        onPageChange={setPage}
        isFetching={isFetching}
      />
    </div>
  )
}

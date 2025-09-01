'use client'

import { MovieCard } from '@/components/MovieCard'
import { MovieFilters } from '@/components/MovieFilters'
import { Pagination } from '@/components/Pagination'
import { fetchGenres, fetchMovies } from '@/lib/fetchMovies'
import { DiscoverMovieParams } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'

import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'

export default function Home() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<DiscoverMovieParams>({})

  const [timeLeft, setTimeLeft] = useState(20) // 20 sec
  const [isPaused, setIsPaused] = useState(false)

  const [discoveryEnabled, setDiscoveryEnabled] = useState(false)

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

  useEffect(() => {
    if (!discoveryEnabled) return
    if (isPaused) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          setPage(p => p + 1) // increment page
          return 20 // reset countdown
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, discoveryEnabled])

  const handlePauseTimer = (open: boolean) => {
    setIsPaused(open)
  }

  const handleSetFilters = (newFilters: DiscoverMovieParams) => {
    setFilters(newFilters)
    setPage(1)
    setTimeLeft(20)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading movies</p>

  return (
    <div className="p-5 max-w-6xl mx-auto bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="mb-8 text-3xl font-bold">Movie Discovery App</h1>

      <div className="flex gap-2 mb-2">
        <Checkbox
          id="discovery"
          checked={discoveryEnabled}
          onClick={() => setDiscoveryEnabled(!discoveryEnabled)}
        />
        <Label className="mb-2 block font-semibold" htmlFor="discovery">Enable Discovery</Label>
      </div>

      <MovieFilters genres={genres || []} onApply={handleSetFilters} />

      {discoveryEnabled && (
        <div className="w-full bg-gray-200 h-2 rounded my-4">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 w-full flex-wrap mt-4 justify-center">
        {data?.results && data.results.map((movie, index) => (
          <MovieCard
            key={movie.id || index}
            movie={movie}
            pauseTimer={handlePauseTimer}
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

'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DiscoverMovieParams } from '@/types'

interface MovieFiltersProps {
  genres: { id: number, name?: string }[]
  onApply: (filters: DiscoverMovieParams) => void
}

export function MovieFilters({ genres, onApply }: MovieFiltersProps) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [releaseYearRange, setReleaseYearRange] = useState<[number, number]>([2000, 2025])
  const [minRating, setMinRating] = useState<number>(0)

  const applyFilters = () => {
    const filters: DiscoverMovieParams = {
      'with_genres': selectedGenres.join(',') || undefined,
      'primary_release_date.gte': `${releaseYearRange[0]}-01-01`,
      'primary_release_date.lte': `${releaseYearRange[1]}-12-31`,
      'vote_average.gte': minRating,
    }
    onApply(filters)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full justify-around items-center p-4 bg-gray-800 rounded-lg text-white">
      {/* Genres Multi-Select */}
      <div>
        <Label className="mb-2 block font-semibold">Genres</Label>
      </div>

      {/* Release Year Range */}
      <div>
        <Label className="mb-2 block font-semibold">Release Year</Label>
        <div className="flex items-center gap-4">
          <Select
            value={releaseYearRange[0].toString()}
            onValueChange={val => setReleaseYearRange([Number(val), releaseYearRange[1]])}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder={releaseYearRange[0]} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 26 }, (_, i) => 2000 + i).map(y => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>–</span>
          <Select
            value={releaseYearRange[1].toString()}
            onValueChange={val => setReleaseYearRange([releaseYearRange[0], Number(val)])}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder={releaseYearRange[1]} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 26 }, (_, i) => 2000 + i).map(y => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="flex gap-4">
        <div>
          <Label className="mb-4 block font-semibold">Minimum Rating</Label>
          <Slider
            min={0}
            max={10}
            step={0.1}
            value={[minRating]}
            onValueChange={val => setMinRating(val[0])}
          />
        </div>
        <span>{minRating.toFixed(1)}</span>
      </div>

      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  )
}

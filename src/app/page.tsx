
'use client'

import { Card } from '@/components/Card';
import type { DiscoverMovieResponse, DiscoverMovieResult } from '@/types'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<DiscoverMovieResult | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      // const newMovies = [];
      const options = {method: 'GET', headers: {accept: 'application/json'}};
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5118448f0df78266f8f992a2967ddfd1&include_adult=false`, options);
      const data = await response.json() as DiscoverMovieResponse;
      setMovies(data.results);
    };
    
    fetchMovies();
  }, []);

  return (
    <div className="p-5 max-w-6xl mx-auto bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className='mb-8 text-3xl font-bold'>Movie Discovery App</h1>
      <div className="flex flex-col md:flex-row gap-6 w-full flex-wrap">
        {movies && movies.map((movie, index) => (
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
    </div>
  );
}

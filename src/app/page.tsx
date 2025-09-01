
'use client'

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
    <div className="p-5 max-w-6xl mx-auto bg-gray-900 min-h-screen text-white">

      <div className="flex flex-col gap-8 w-full">
        {movies && movies.map((movie, index) => (
          <div 
            key={movie.id || index} 
            className="flex flex-col p-4 rounded-lg bg-gray-800"
          >
            <h2 className="mb-4">{movie.title}</h2>
            {movie.backdrop_path && (
              <div className="w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.title || "Movie Poster"}
                  width={500}
                  height={281}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

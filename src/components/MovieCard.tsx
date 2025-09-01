import React, { ReactNode, useState } from "react";
import { Card as SCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/lib/fetchMovies";
import { MovieDetailsSingleGenre } from "@/types";

interface CardProps {
  title: string;
  movieId: number;
  children: ReactNode;
}

export function Card({ title, movieId, children }: CardProps) {

  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails({ movie_id: movieId }),
    enabled: open, // only fetch when dialog is open
  });

  return (
    <SCard className="flex flex-col py-4 rounded-lg bg-gray-800">
      <CardHeader>
        <CardTitle><h2 className="text-lg font-semibold">{title}</h2></CardTitle>
      </CardHeader>
      <CardContent>
        {children}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="mt-4 px-3 w-full py-1 bg-blue-600 text-white rounded cursor-pointer">
            Show details
          </DialogTrigger>

          <DialogContent className="bg-gray-900 text-white rounded-lg p-4 max-w-md">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading details</p>}

            {data && (
              <div className="mt-2 space-y-2">
                <p><strong>Overview:</strong> {data.overview}</p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {data.genres?.map((g: MovieDetailsSingleGenre) => g.name).join(", ")}
                </p>
                <p><strong>Release Date:</strong> {data.release_date}</p>
              </div>
            )}

            <DialogClose className="mt-4 px-3 py-1 bg-gray-700 rounded cursor-pointer">
              Close
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CardContent>
    </SCard>
  );
}

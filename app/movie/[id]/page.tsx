

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getMovie } from "@/lib/tmdb";
import AddToList from "@/components/AddToList";



type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MoviePage({
  params,
}: Props) {
  const { id } = await params;

  const movie = await getMovie(id);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <div className="relative h-125">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end p-10">
            <div className="flex gap-8 items-end">
              <div className="relative w-64 h-96 rounded-2xl overflow-hidden border border-zinc-800">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="max-w-2xl">
                <h1 className="text-6xl font-bold mb-4">
                  {movie.title}
                </h1>

                <p className="text-zinc-300 text-lg mb-6">
                  {movie.overview}
                </p>

                <div className="flex gap-6 text-zinc-400 mb-6">
                  <span>
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>

                  <span>
                    📅 {movie.release_date}
                  </span>
                </div>

                <AddToList
                    movieId={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                  />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
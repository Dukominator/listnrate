import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/lib/tmdb";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

export default async function Home() {
  const movies =
    await getTrendingMovies();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">
            Trending Movies
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {(movies ?? []).map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                description={movie.overview}
                posterPath={movie.poster_path}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
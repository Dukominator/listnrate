import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";

const movies = [
  {
    title: "Star Wars",
    description:
      "A long time ago in a galaxy far, far away...",
  },
  {
    title: "The Matrix",
    description:
      "Reality is not what it seems.",
  },
  {
    title: "Interstellar",
    description:
      "Exploring space and time.",
  },
  {
    title: "The Dark Knight",
    description:
      "Batman faces the Joker.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">
            Trending Movies
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.title}
                title={movie.title}
                description={movie.description}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
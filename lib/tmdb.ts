// src/lib/tmdb.ts

const API_KEY = process.env.TMDB_API_KEY;

// 🔥 Trending movies
export async function getTrendingMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await response.json();

  console.log("TMDB RESPONSE:", data);

  return data?.results ?? [];
}

// 🎬 Single movie details
export async function getMovie(id: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
}
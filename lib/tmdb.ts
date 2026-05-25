export async function getTrendingMovies() {
  console.log("🔥 TRENDING FUNCTION CALLED");

  const url =
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`;

  console.log("🔥 URL:", url);

  const response = await fetch(url);

  const data = await response.json();

  console.log("🔥 TMDB RESPONSE:", data);

  return data?.results ?? [];
}
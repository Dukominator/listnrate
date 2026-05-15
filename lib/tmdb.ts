const API_TOKEN = process.env.TMDB_API_KEY;

export async function getTrendingMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week",
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  console.log("TMDB RESPONSE:", data);

  return data?.results ?? [];
}
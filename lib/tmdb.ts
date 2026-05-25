const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(
    `${BASE_URL}${endpoint}${
      endpoint.includes("?") ? "&" : "?"
    }api_key=${API_KEY}`
  );

  return await res.json();
}

export async function getTrendingMovies() {
  const data = await fetchFromTMDB(
    "/trending/movie/week"
  );

  return data?.results ?? [];
}

export async function searchMovies(query: string) {
  const data = await fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}`
  );

  return data?.results ?? [];
}

export async function getMovie(id: string) {
  return await fetchFromTMDB(`/movie/${id}`);
}
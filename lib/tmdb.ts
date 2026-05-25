console.log("TMDB KEY EXISTS:", !!process.env.TMDB_API_KEY);

const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL =
  "https://api.themoviedb.org/3";

async function fetchFromTMDB(
  endpoint: string
) {
  const response = await fetch(
    `${BASE_URL}${endpoint}${
      endpoint.includes("?")
        ? "&"
        : "?"
    }api_key=${API_KEY}`
  );

  const data = await response.json();

  console.log(
    "TMDB RESPONSE:",
    data
  );

  return data;
}

// 🔥 Trending movies
export async function getTrendingMovies() {
  const data =
    await fetchFromTMDB(
      "/trending/movie/week"
    );

  return data?.results ?? [];
}

// 🔍 Search movies
export async function searchMovies(
  query: string
) {
  const data =
    await fetchFromTMDB(
      `/search/movie?query=${encodeURIComponent(
        query
      )}`
    );

  return data?.results ?? [];
}

// 🎬 Single movie
export async function getMovie(
  id: string
) {
  return await fetchFromTMDB(
    `/movie/${id}`
  );
}
import { NextResponse } from "next/server";

export async function GET(
  req: Request
) {
  const { searchParams } =
    new URL(req.url);

  const query =
    searchParams.get("q");

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`
  );

  const data = await res.json();

  return NextResponse.json(data);
}
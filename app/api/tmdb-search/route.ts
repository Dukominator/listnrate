import { NextResponse } from "next/server";

import { searchMovies } from "@/lib/tmdb";

export async function GET(
  req: Request
) {
  const { searchParams } =
    new URL(req.url);

  const query =
    searchParams.get("q") || "";

  const results =
    await searchMovies(query);

  return NextResponse.json({
    results,
  });
}
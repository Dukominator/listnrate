"use client";

import { useState } from "react";
import Image from "next/image";

import { supabase } from "@/lib/supabase";

type List = {
  id: number;
  title: string;
};

type Props = {
  lists: List[];
};

export default function MovieSearch({
  lists,
}: Props) {
  const [query, setQuery] = useState("");
type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedList, setSelectedList] =
    useState("");

  async function searchMovies() {
    const res = await fetch(
      `/api/tmdb-search?q=${query}`
    );

    const data = await res.json();
    console.log(data);

    setMovies(data.results || []);
  }

  async function addMovie(movie: Movie) {
    if (!selectedList) {
      alert("Choose a list");
      return;
    }

    const { error } = await supabase
      .from("list_items")
      .insert({
        list_id: selectedList,
        movie_id: movie.id.toString(),
        movie_title: movie.title,
        poster_path: movie.poster_path,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Added 😄🔥");
  }

  return (
    <div className="mb-10">
      <div className="flex gap-4 mb-6">
        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search movies..."
          className="flex-1 p-4 rounded-xl bg-zinc-900"
        />

        <select
          value={selectedList}
          onChange={(e) =>
            setSelectedList(e.target.value)
          }
          className="p-4 rounded-xl bg-zinc-900"
        >
          <option value="">
            Choose list
          </option>

          {lists.map((list) => (
            <option
              key={list.id}
              value={list.id}
            >
              {list.title}
            </option>
          ))}
        </select>

        <button
          onClick={searchMovies}
          className="bg-white text-black px-6 rounded-xl"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="relative aspect-2/3 rounded-xl overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>

            <h2 className="mt-2 text-sm font-semibold">
              {movie.title}
            </h2>

            <button
              onClick={() =>
                addMovie(movie)
              }
              className="mt-2 bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
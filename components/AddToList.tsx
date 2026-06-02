"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type Props = {
  movieId: number;
  title: string;
  posterPath: string;
};

type UserList = {
  id: number;
  title: string;
};

export default function AddToList({
  movieId,
  title,
  posterPath,
}: Props) {
  const [lists, setLists] = useState<
    UserList[]
  >([]);

  const [selectedList, setSelectedList] =
    useState("");

  useEffect(() => {
    async function loadLists() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("lists")
        .select("id, title")
        .eq("user_id", user.id);

      setLists(data || []);
    }

    loadLists();
  }, []);

  async function addToList() {
    if (!selectedList) {
      alert("Select a list");

      return;
    }

    const { error } = await supabase
      .from("list_items")
      .insert({
            list_id: selectedList,
            movie_id: movieId.toString(),
            movie_title: title,
            poster_path: posterPath,
            });

    if (error) {
      alert(error.message);

      return;
    }

    alert("Movie added 😄🔥");
  }

  return (
    <div className="mt-6 flex gap-4 items-center">
      <select
        value={selectedList}
        onChange={(e) =>
          setSelectedList(e.target.value)
        }
        className="bg-zinc-800 p-3 rounded-xl"
      >
        <option value="">
          Select list
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
        onClick={addToList}
        className="bg-zinc-900 text-black px-4 py-2 rounded-xl"
      >
        Add to List
      </button>
    </div>
  );
}
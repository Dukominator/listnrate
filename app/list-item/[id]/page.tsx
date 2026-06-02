"use client";

import { use } from "react";
import { useState } from "react";

import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditListItemPage({
  params,
}: Props) {
  const { id } = use(params);

  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  async function saveReview() {
    const { error } = await supabase
      .from("list_items")
      .update({
        rating: Number(rating),
        review,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Saved 😄🔥");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Rate Movie
        </h1>

        <input
          type="number"
          min="1"
          max="10"
          placeholder="Rating 1-10"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-zinc-900 mb-4"
        />

        <textarea
          placeholder="Write review..."
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-zinc-900 mb-4 h-40"
        />

        <button
          onClick={saveReview}
          className="bg-zinc-900 px-6 py-3 rounded-xl"
        >
          Save
        </button>
      </div>
    </main>
  );
}
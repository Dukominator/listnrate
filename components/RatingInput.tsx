"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

type Props = {
  itemId: number;
  initialRating: number | null;
};

export default function RatingInput({
  itemId,
  initialRating,
}: Props) {
  const [rating, setRating] = useState(
    initialRating || 0
  );

  async function saveRating(
    value: number
  ) {
    setRating(value);

    const { error } = await supabase
      .from("list_items")
      .update({
        rating: value,
      })
      .eq("id", itemId);

    if (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex gap-1 mt-2">
      {[1,2,3,4,5,6,7,8,9,10].map(
        (num) => (
          <button
            key={num}
            onClick={() =>
              saveRating(num)
            }
            className={`w-8 h-8 rounded-full text-xs ${
              rating >= num
                ? "bg-yellow-400 text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            {num}
          </button>
        )
      )}
    </div>
  );
}
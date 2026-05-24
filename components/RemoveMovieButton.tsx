"use client";

import { supabase } from "@/lib/supabase";

type Props = {
  itemId: number;
};

export default function RemoveMovieButton({
  itemId,
}: Props) {
  async function removeMovie() {
    const confirmed = confirm(
      "Remove movie?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("list_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      alert(error.message);
      return;
    }

    location.reload();
  }

  return (
    <button
      onClick={removeMovie}
      className="text-red-500 text-xs mt-2"
    >
      Remove
    </button>
  );
}
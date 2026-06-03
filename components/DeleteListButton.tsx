"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  listId: number;
};

export default function DeleteListButton({
  listId,
}: Props) {
  const router = useRouter();

  async function deleteList() {
    const confirmed = confirm(
      "Delete this list permanently?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("lists")
      .delete()
      .eq("id", listId);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <button
      onClick={deleteList}
      className="
        bg-red-600
        hover:bg-red-500
        text-white
        px-4
        py-2
        rounded-xl
      "
    >
      Delete List
    </button>
  );
}
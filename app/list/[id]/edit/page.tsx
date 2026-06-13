"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

import { supabase } from "@/lib/supabase";

import DeleteListButton from "@/components/DeleteListButton";

export default function EditListPage() {
  const params = useParams<{ id: string }>();
  console.log("PARAM ID:", params.id);
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [isPublic, setIsPublic] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadList() {
      const { data } =
        await supabase
          .from("lists")
          .select("*")
          .eq("id", params.id)
          .single();
          console.log("LOADED LIST:", data);

      if (data) {
        setTitle(data.title ?? "");
        setDescription(
          data.description ?? ""
        );
setIsPublic(
  data.visibility === "public"
);
      }

      setLoading(false);
    }

    loadList();
  }, [params.id]);

async function saveList() {
  const result = await supabase
    .from("lists")
    .update({
      title,
      description,
      visibility: isPublic
        ? "public"
        : "private",
    })
    .eq("id", Number(params.id))
    .select();

  console.log("UPDATE RESULT:", result);
  console.log("PARAM ID:", params.id);

  if (!result.error) {
    router.push(`/list/${params.id}`);
  }
}

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="p-8">
          Loading...
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Edit List
        </h1>

        <div className="space-y-6">
          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
             className="
    w-full
    p-3
    rounded-xl
    bg-zinc-900
    border
    border-zinc-700
    text-white
    placeholder:text-zinc-400
  "
            placeholder="Title"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900 h-32"
            placeholder="Description"
          />

<div>
  <label className="block mb-2">
    List Visibility
  </label>

  <select
    value={
      isPublic
        ? "public"
        : "private"
    }
    onChange={(e) =>
      setIsPublic(
        e.target.value ===
          "public"
      )
    }
     className="
    w-full
    p-3
    rounded-xl
    bg-zinc-900
    border
    border-zinc-700
    text-white
    placeholder:text-zinc-400
  "
  >
    <option value="public">
      Public
    </option>

    <option value="private">
      Private
    </option>
  </select>
</div>

          <button
            onClick={saveList}
            className="bg-green-600 px-6 py-3 rounded-xl"
          >
            Save Changes
          </button>
<div className="pt-4">
  <DeleteListButton
    listId={String(params.id)}
  />
</div>

        </div>
      </main>
    </>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

import { supabase } from "@/lib/supabase";

export default function CreateListPage() {
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [visibility, setVisibility] =
    useState("public");

  const [loading, setLoading] =
    useState(false);

  async function createList() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in");

      router.push("/login");

      return;
    }

    const { error } =
      await supabase.from("lists").insert({
        user_id: user.id,
        title,
        description,
        visibility,
      });

    setLoading(false);

    if (error) {
      console.error(error);

      alert(error.message);

      return;
    }

    router.push("/dashboard");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-8">
            Create New List
          </h1>

          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="List title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="bg-zinc-800 p-4 rounded-xl"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="bg-zinc-800 p-4 rounded-xl h-40"
            />

            <select
              value={visibility}
              onChange={(e) =>
                setVisibility(
                  e.target.value
                )
              }
              className="bg-zinc-800 p-4 rounded-xl"
            >
              <option value="public">
                Public
              </option>

              <option value="private">
                Private
              </option>

              <option value="friends">
                Friends Only
              </option>
            </select>

            <button
              onClick={createList}
              disabled={loading}
              className="bg-zinc-900 text-black p-4 rounded-xl font-semibold"
            >
              {loading
                ? "Creating..."
                : "Create List"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
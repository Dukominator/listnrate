"use client";

import Navbar from "@/components/Navbar";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [username, setUsername] =
    useState("");

const [displayName, setDisplayName] =
  useState("");

  const [bio, setBio] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

if (data) {
  setUsername(data.username || "");
  setDisplayName(
    data.display_name || ""
  );
  setBio(data.bio || "");
}
  }

useEffect(() => {
  async function init() {
    await loadProfile();
  }

  init();
}, []);

  async function saveProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

await supabase
  .from("profiles")
  .upsert({
    id: user.id,
    username,
    display_name:
      displayName,
    bio,
  });

    setLoading(false);

    alert("Profile saved 😄");
  }

  return (
    <>
      <Navbar />
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Edit Profile
      </h1>

<div className="mb-8">
  <a
    href={`/u/${username}`}
    className="
      inline-block
      bg-blue-600
      hover:bg-blue-500
      px-5
      py-3
      rounded-xl
      font-semibold
    "
  >
    View Public Profile
  </a>
</div>

      <div className="space-y-6">
        <div>
          <label className="block mb-2">
            Username
          </label>

          <input
            value={username}
            onChange={(e) =>
              setUsername(
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
          />
        </div>

<div>
  <label className="block mb-2">
    Display Name
  </label>

  <input
    value={displayName}
    onChange={(e) =>
      setDisplayName(
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
    "
  />
</div>

        <div>
          <label className="block mb-2">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900 h-40"
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={loading}
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          {loading
            ? "Saving..."
            : "Save Profile"}
        </button>
      </div>
    </main>
    </>
  
  );
}
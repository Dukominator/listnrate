"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  User,
} from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] =
    useState<User | null>(null);

  const [username, setUsername] =
    useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setUser(user);

      if (!user) return;

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();

      if (profile?.username) {
        setUsername(
          profile.username
        );
      }
    }

    loadUser();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();

    window.location.href = "/";
  }

  return (
    <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="text-2xl font-bold"
      >
        ListnRate
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/">
          Home
        </Link>

        {user && (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>

            <Link href="/dashboard/profile">
              Profile
            </Link>

            {username && (
              <Link
                href={`/u/${username}`}
              >
                Public Profile
              </Link>
            )}

            <button
              onClick={signOut}
              className="bg-red-600 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link href="/login">
              Login
            </Link>

            <Link href="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
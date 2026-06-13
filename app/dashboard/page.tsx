"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";

import Navbar from "@/components/Navbar";
import MovieSearch from "@/components/MovieSearch";

import { supabase } from "@/lib/supabase";

type List = {
  id: number;
  title: string;
  description: string;
  visibility: string;
};

export default function DashboardPage() {
  const [loading, setLoading] =
    useState(true);

const [user, setUser] =
  useState<User | null>(null);

  const [lists, setLists] =
    useState<List[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } =
        await supabase
          .from("lists")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      setLists(data ?? []);

      setLoading(false);
    }

    loadDashboard();
  }, []);

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

  if (!user) {
    return (
      <>
        <Navbar />

        <main className="p-8">
          You must be logged in.
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              Dashboard
            </h1>

            <p className="text-zinc-400 mt-2">
              Manage your movie
              lists and ratings
            </p>
          </div>

          <Link
            href="/create-list"
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-2xl"
          >
            + New List
          </Link>
        </div>

        <div className="mb-14">
          <MovieSearch
            lists={lists}
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">
            Your Lists
          </h2>

          {lists.length === 0 ? (
            <div className="bg-zinc-900 rounded-2xl p-10 text-center">
              <p className="text-zinc-400">
                No lists yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {lists.map((list) => (
                <Link
                  key={list.id}
                  href={`/list/${list.id}`}
                  className="bg-zinc-900 hover:bg-zinc-800 transition rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">
                      {list.title}
                    </h3>

                    <span className="text-sm text-zinc-400">
                      {list.visibility}
                    </span>
                  </div>

                  {list.description && (
                    <p className="text-zinc-400 mt-4 line-clamp-3">
                      {
                        list.description
                      }
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
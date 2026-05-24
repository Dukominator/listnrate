"use client";

import { User } from "@supabase/supabase-js";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

import { supabase } from "@/lib/supabase";

import Link from "next/link";

import MovieSearch from "@/components/MovieSearch";

type List = {
  id: number;
  title: string;
  description: string;
  visibility: string;
};

export default function DashboardPage() {
 const [user, setUser] =
  useState<User | null>(null);

  const [lists, setLists] = useState<
    List[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");

        return;
      }

      setUser(user);

      const { data } = await supabase
        .from("lists")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (data) {
        setLists(data);
      }
    }

    loadData();
  }, [router]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-5xl font-bold">
                Dashboard
              </h1>
              <p className="text-zinc-400 mt-2">
                Welcome back {user?.email}
              </p>
            </div>
<MovieSearch lists={lists || []} />
            <button
              onClick={() =>
                router.push("/create-list")
              }
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
            >
              Create List
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <Link
                key={list.id}
                href={`/list/${list.id}`}
              >
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-white transition cursor-pointer">
                <h2 className="text-2xl font-bold mb-3">
                  {list.title}
                </h2>

                <p className="text-zinc-400 mb-4">
                  {list.description}
                </p>

                <span className="text-sm text-zinc-500">
                  {list.visibility}
                </span>
              </div>
              </Link>
            ))}
              
            </div>
        </div>
      </main>
    </>
  );
}
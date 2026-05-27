"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] =
  useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.reload();
  }

  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          ListnRate
        </Link>

        <div className="flex items-center gap-6 text-sm text-zinc-300">
          <Link
            href="/dashboard"
            className="hover:text-white"
          >
            Dashboard
          </Link>

          {user ? (
            <>
              <span className="text-zinc-500">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:text-white"
            >
              Login
            </Link>
            
          )}
        </div>
      </div>
    </nav>
  );
}
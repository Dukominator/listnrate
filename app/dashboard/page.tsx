"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    }

    getUser();
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">
        Dashboard
      </h1>

      {user && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-xl mb-2">
            Logged in as:
          </p>

          <p className="text-zinc-400">
            {user.email}
          </p>
        </div>
      )}
    </main>
  );
}
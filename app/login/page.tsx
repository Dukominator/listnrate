"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function signUp() {
    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      alert(error.message);
    } else {
      alert(
        "Check your email for confirmation!"
      );
    }
  }

  async function signIn() {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
    } else {
        router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-zinc-800 p-3 rounded-lg"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-zinc-800 p-3 rounded-lg"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={signIn}
            className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg font-semibold"
          >
            Login
          </button>

          <button
            onClick={signUp}
            className="bg-zinc-700 p-3 rounded-lg"
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserPage({
  params,
}: Props) {
  const { username } = await params;

  const { data: profile } =
    await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();


      
  if (!profile) {
    return (
  
      <> 
        <Navbar />

        <main className="p-8">
          User not found
        </main>
      </>
    );
  }

const { data: lists } =
  await supabase
    .from("lists")
    .select("*")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", {
      ascending: false,
    });

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto p-8">
        <div className="mb-10">
<h1 className="text-5xl font-bold">
  {profile.display_name ||
    profile.username}
</h1>

<p className="text-zinc-400 mt-2">
  @{profile.username}
</p>

          {profile.bio && (
            <p className="mt-6 text-lg text-zinc-300">
              {profile.bio}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">
            Public Lists
          </h2>

          {(lists ?? []).length === 0 ? (
            <p className="text-zinc-500">
              No public lists yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(lists ?? []).map(
                (list) => (
                  <Link
                    key={list.id}
                    href={`/list/${list.id}`}
                    className="bg-zinc-900 p-6 rounded-2xl hover:bg-zinc-800 transition"
                  >
                    <h3 className="text-2xl font-semibold">
                      {list.title}
                    </h3>

                    {list.description && (
                      <p className="text-zinc-400 mt-3">
                        {
                          list.description
                        }
                      </p>
                    )}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
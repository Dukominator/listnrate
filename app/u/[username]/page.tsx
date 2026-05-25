import { supabase } from "@/lib/supabase";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({
  params,
}: Props) {
  const { data: profile } =
    await supabase
      .from("profiles")
      .select("*")
      .eq(
        "username",
        params.username
      )
      .single();

  const { data: lists } =
    await supabase
      .from("lists")
      .select("*")
      .eq("user_id", profile.id)
      .eq("is_public", true);

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">
        @{profile.username}
      </h1>

      <p className="text-zinc-400 mb-10">
        {profile.bio}
      </p>

      <div className="grid gap-4">
        {lists?.map((list) => (
          <a
            key={list.id}
            href={`/list/${list.id}`}
            className="bg-zinc-900 p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold">
              {list.title}
            </h2>
          </a>
        ))}
      </div>
    </main>
  );
}
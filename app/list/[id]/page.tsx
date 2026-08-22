import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import RemoveMovieButton from "@/components/RemoveMovieButton";
import { supabase } from "@/lib/supabase";
import RatingInput from "@/components/RatingInput";



type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ListPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: list } = await supabase
    .from("lists")
    .select("*")
    .eq("id", id)
    .single();

    const { data: profile } =
  await supabase
    .from("profiles")
    .select("username")
    .eq("id", list?.user_id)
    .single();

  const { data: items } = await supabase
    .from("list_items")
    .select("*")
    .eq("list_id", id);



  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-4">
              {list?.title}
            </h1>

            <p className="text-zinc-400 text-lg">
              {list?.description}
            </p>

{profile?.username && (
  <Link
    href={`/u/${profile.username}`}
    className="
      text-blue-400
      hover:text-blue-300
      block
      mt-4
    "
  >
    @{profile.username}
  </Link>
)}

<div className="mt-4">
  <Link
    href={`/list/${id}/edit`}
    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl inline-block"
  >
    Edit List
  </Link>
</div>
        
          </div>
          {items?.length === 0 && (
            <p className="text-zinc-500">
              No movies yet 😄
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {items?.map((item) => (
<Link
  key={item.id}
  href={`/list-item/${item.id}`}
>
                <div className="group">
                  <div className="relative aspect-2/3 rounded-2xl overflow-hidden border border-zinc-800">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.movie_title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

<h2 className="mt-3 font-semibold text-sm">
  {item.movie_title}
</h2>

<RemoveMovieButton
  itemId={item.id}
/>

<RatingInput
  itemId={item.id}
  initialRating={item.rating}
/>

{item.review && (
  <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
    {item.review}
  </p>
)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
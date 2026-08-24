import Link from "next/link";
import { ArrowUpRight, Film, ListVideo, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

type Props = { params: Promise<{ username: string }> };

const cardAccents = [
  "from-emerald-400/80 via-emerald-400/15 to-transparent",
  "from-orange-400/80 via-orange-400/15 to-transparent",
  "from-sky-400/80 via-sky-400/15 to-transparent",
];

function initials(displayName: string | null, username: string) {
  return (displayName?.trim() || username).slice(0, 2).toUpperCase();
}

export default async function UserPage({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = rawUsername.toLowerCase();
  if (!/^[a-z0-9_-]{3,24}$/.test(username)) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio")
    .eq("username", username)
    .maybeSingle();
  if (!profile) notFound();

  const { data: lists } = await supabase
    .from("lists")
    .select("id, title, description")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const publicLists = lists ?? [];
  const displayName = profile.display_name?.trim() || profile.username;

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-73px)] bg-[#101412] pb-16 text-stone-100">
        <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#17211c]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(145,204,126,.26),transparent_22%),radial-gradient(circle_at_83%_25%,rgba(244,125,87,.2),transparent_23%),linear-gradient(118deg,#17211c_0%,#192019_45%,#111512_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,.65)_0.6px,transparent_0.7px)] bg-size-[5px_5px] opacity-[0.16]" />
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4 sm:gap-6">
                <div className="grid size-24 shrink-0 place-items-center rounded-full border border-emerald-200/30 bg-[#24352a] text-2xl font-black tracking-tighter text-emerald-100 shadow-[0_0_0_7px_rgba(16,20,18,.35)] sm:size-28 sm:text-3xl">{initials(profile.display_name, profile.username)}</div>
                <div><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300/80">Medlem af ListnRate</p><h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">{displayName}</h1><p className="mt-1 text-sm text-stone-400">@{profile.username}</p></div>
              </div>
              <div className="flex w-fit divide-x divide-white/10 border border-white/10 bg-black/15 text-sm backdrop-blur-sm"><div className="px-5 py-3"><span className="block text-xl font-black text-white">{publicLists.length}</span><span className="text-xs uppercase tracking-wider text-stone-400">{publicLists.length === 1 ? "liste" : "lister"}</span></div><div className="px-5 py-3"><span className="block text-xl font-black text-white">Offentlig</span><span className="text-xs uppercase tracking-wider text-stone-400">samling</span></div></div>
            </div>
            {profile.bio && <p className="mt-8 max-w-2xl border-l-2 border-orange-300 pl-4 text-base leading-7 text-stone-200 sm:text-lg">{profile.bio}</p>}
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-4"><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.19em] text-orange-300"><Sparkles className="size-3.5" /> Udvalgte samlinger</p><h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">Lister fra {displayName}</h2></div>{publicLists.length > 0 && <span className="hidden text-sm text-stone-500 sm:block">Nyeste først</span>}</div>
          {publicLists.length === 0 ? <div className="border border-dashed border-white/15 bg-[#151a16] px-6 py-16 text-center"><div className="mx-auto grid size-12 place-items-center rounded-full border border-white/10 bg-[#202820] text-emerald-200"><Film className="size-5" /></div><h3 className="mt-5 text-lg font-bold text-white">Projektionsrummet er tomt</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-400">Der er endnu ikke delt nogen offentlige lister fra denne profil.</p></div> : <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">{publicLists.map((list, index) => <Link key={list.id} href={`/list/${list.id}`} className="group relative flex min-h-64 flex-col overflow-hidden bg-[#151a16] p-6 transition duration-300 hover:bg-[#1b231d]"><div className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${cardAccents[index % cardAccents.length]}`} /><div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-stone-500"><span>Liste {String(index + 1).padStart(2, "0")}</span><ListVideo className="size-4 text-stone-600 transition group-hover:text-emerald-300" /></div><h3 className="mt-8 text-2xl font-black leading-tight tracking-[-0.035em] text-white transition group-hover:text-emerald-200">{list.title}</h3>{list.description ? <p className="mt-4 line-clamp-3 text-sm leading-6 text-stone-400">{list.description}</p> : <p className="mt-4 text-sm italic text-stone-600">Ingen noter til denne samling.</p>}<span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-orange-200 transition group-hover:text-orange-100">Åbn listen <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></Link>)}</div>}
        </section>
      </main>
    </>
  );
}

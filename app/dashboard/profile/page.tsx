"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, Loader2, Palette, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const usernamePattern = /^[a-z0-9_-]{3,24}$/;
const initials = (name: string, username: string) => (name.trim() || username.trim() || "?").slice(0, 2).toUpperCase();

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const normalizedUsername = useMemo(() => username.trim().toLowerCase(), [username]);
  const usernameIsValid = usernamePattern.test(normalizedUsername);
  const previewName = displayName.trim() || normalizedUsername || "Dit navn";

  useEffect(() => {
    async function loadProfile() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { setError("Du skal være logget ind for at redigere din profil."); setIsLoading(false); return; }
      const { data, error: profileError } = await supabase.from("profiles").select("username, display_name, bio").eq("id", user.id).single();
      if (profileError && profileError.code !== "PGRST116") setError("Profilen kunne ikke hentes. Prøv igen om lidt.");
      if (data) { setUsername(data.username ?? ""); setDisplayName(data.display_name ?? ""); setBio(data.bio ?? ""); }
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(null); setError(null);
    if (!usernameIsValid) { setError("Brugernavnet skal være 3–24 tegn og må kun indeholde små bogstaver, tal, _ eller -."); return; }
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Din session er udløbet. Log ind igen for at gemme."); setIsSaving(false); return; }
    const { error: saveError } = await supabase.from("profiles").upsert({ id: user.id, username: normalizedUsername, display_name: displayName.trim() || null, bio: bio.trim() || null });
    setIsSaving(false);
    if (saveError) { setError(saveError.code === "23505" ? "Det brugernavn er allerede taget. Vælg et andet." : "Profilen kunne ikke gemmes. Prøv igen."); return; }
    setUsername(normalizedUsername); setMessage("Din profil er gemt.");
  }

  return <><Navbar /><main className="min-h-[calc(100vh-73px)] bg-[#101412] px-4 py-9 text-stone-100 sm:px-6 sm:py-12"><div className="mx-auto max-w-6xl">
    <div className="mb-8 border-b border-white/10 pb-6 sm:mb-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Din side på ListnRate</p><h1 className="mt-3 text-4xl font-black tracking-tighter text-white sm:text-5xl">Sæt scenen</h1><p className="mt-3 max-w-xl text-sm leading-6 text-stone-400 sm:text-base">Giv dine lister et navn, et ansigt og lidt af din egen stemme.</p></div>
    {isLoading ? <div className="grid animate-pulse gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"><div className="h-130 bg-[#182019]" /><div className="h-105 bg-[#182019]" /></div> : <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form onSubmit={saveProfile} className="border border-white/10 bg-[#151a16] p-5 sm:p-8"><div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6"><div className="grid size-12 place-items-center rounded-full border border-emerald-200/25 bg-[#24352a] text-lg font-black text-emerald-100">{initials(displayName, normalizedUsername)}</div><div><h2 className="font-bold text-white">Profilens kreditering</h2><p className="mt-1 text-sm text-stone-400">Det her er det, andre ser, når de finder dine lister.</p></div></div>
        <div className="space-y-6"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-stone-400">Brugernavn</span><div className="flex border border-white/15 bg-black/20 focus-within:border-emerald-300/70"><span className="flex items-center border-r border-white/10 px-3 text-stone-500">@</span><input value={username} onChange={(event) => setUsername(event.target.value.toLowerCase())} maxLength={24} autoComplete="username" aria-describedby="username-help" className="min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 py-3 outline-none" placeholder="dit-brugernavn" /></div><span id="username-help" className="mt-2 block text-xs text-stone-500">3–24 tegn · små bogstaver, tal, bindestreg og underscore.</span></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-stone-400">Visningsnavn <span className="normal-case tracking-normal text-stone-600">(valgfrit)</span></span><input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={60} className="w-full rounded-none border-white/15 bg-black/20 px-4 py-3 outline-none transition focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/10" placeholder="Hvordan skal dit navn vises?" /></label><label className="block"><span className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-stone-400">Bio <span className="normal-case tracking-normal text-stone-600">{bio.length}/160</span></span><textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={160} rows={5} className="w-full resize-none rounded-none border-white/15 bg-black/20 px-4 py-3 outline-none transition focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/10" placeholder="Fortæl lidt om din filmsmag …" /></label></div>
        {(error || message) && <div className={`mt-6 border px-4 py-3 text-sm ${error ? "border-red-400/25 bg-red-400/10 text-red-100" : "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"}`} role="status">{error ?? message}</div>}
        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-stone-500">Ændringer vises straks på din offentlige profil.</p><button type="submit" disabled={isSaving} className="inline-flex items-center justify-center gap-2 bg-emerald-300 px-5 py-3 text-sm font-extrabold text-[#102016] transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}{isSaving ? "Gemmer …" : "Gem profil"}</button></div>
      </form>
      <aside className="overflow-hidden border border-white/10 bg-[#151a16]"><div className="relative h-32 overflow-hidden bg-[#1e2c21]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(146,207,128,.42),transparent_20%),radial-gradient(circle_at_78%_18%,rgba(242,126,86,.36),transparent_25%)]" /><div className="absolute inset-0 bg-[radial-gradient(white_.6px,transparent_.7px)] bg-size-[5px_5px] opacity-[0.18]" /></div><div className="p-6"><div className="-mt-13 grid size-20 place-items-center rounded-full border-4 border-[#151a16] bg-[#24352a] text-2xl font-black text-emerald-100 shadow-lg">{initials(displayName, normalizedUsername)}</div><p className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-orange-300"><Palette className="size-3.5" /> Live forhåndsvisning</p><h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">{previewName}</h2><p className="mt-1 text-sm text-stone-500">@{normalizedUsername || "brugernavn"}</p><p className="mt-5 min-h-14 text-sm leading-6 text-stone-300">{bio.trim() || "Din bio vil give besøgende en fornemmelse af din filmsmag."}</p>{usernameIsValid ? <Link href={`/u/${normalizedUsername}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-200 transition hover:text-emerald-100">Se offentlig profil <ArrowUpRight className="size-4" /></Link> : <span className="mt-6 inline-flex items-center gap-2 text-sm text-stone-500"><UserRound className="size-4" /> Vælg et gyldigt brugernavn</span>}</div></aside>
    </div>}</div></main></>;
}

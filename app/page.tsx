import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to ListnRate
        </h1>

        <p className="text-zinc-400 text-xl">
          Create. Rate. Share.
        </p>
      </main>
    </>
  );
}
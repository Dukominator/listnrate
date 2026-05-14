import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-6xl font-bold">
          Welcome to ListnRate
        </h1>

        <p className="text-zinc-400 text-xl">
          Create. Rate. Share.
        </p>

        <Button>
          Create Your First List
        </Button>
      </main>
    </>
  );
}
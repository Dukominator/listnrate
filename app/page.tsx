import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">
            Trending Movies
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-zinc-900 border-zinc-800 text-white">
              <CardHeader>
                <CardTitle>Star Wars</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-zinc-400 mb-4">
                  A long time ago in a galaxy far,
                  far away...
                </p>

                <Button>
                  View List
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
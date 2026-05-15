import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type MovieCardProps = {
  title: string;
  description: string;
};

export default function MovieCard({
  title,
  description,
}: MovieCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden hover:scale-105 transition duration-300">
      <div className="h-56 bg-zinc-800 flex items-center justify-center text-zinc-500">
        Movie Poster
      </div>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-zinc-400 mb-4">
          {description}
        </p>

        <Button className="w-full">
          View List
        </Button>
      </CardContent>
    </Card>
  );
}
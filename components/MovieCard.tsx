import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type MovieCardProps = {
  id: number;
  title: string;
  description: string;
  posterPath: string;
};

export default function MovieCard({
  id,
  title,
  description,
  posterPath,
}: MovieCardProps) {
  return (
  <Link href={`/movie/${id}`}>
    <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden hover:scale-105 transition duration-300 cursor-pointer">
      <div className="relative w-full h-80">
        <Image
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-zinc-400 mb-4 line-clamp-4">
          {description}
        </p>

        <Button className="w-full">
          View Movie
        </Button>
      </CardContent>
    </Card>
  </Link>
  );
}
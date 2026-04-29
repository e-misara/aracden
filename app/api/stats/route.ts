import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [kronikPosts, topPositive, totalCount] = await Promise.all([
    prisma.post.findMany({
      where: { isChronik: true },
      orderBy: { thumbsUp: "desc" },
      take: 5,
      select: { id: true, title: true, brand: true, model: true, thumbsUp: true },
    }),
    prisma.post.findMany({
      where: { sentimentType: "POSITIVE" },
      orderBy: { thumbsUp: "desc" },
      take: 3,
      select: { id: true, title: true, brand: true, model: true, thumbsUp: true },
    }),
    prisma.post.count(),
  ]);

  return NextResponse.json({ kronikPosts, topPositive, totalCount });
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { Category, SentimentType } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Category | null;
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const sentiment = searchParams.get("sentiment") as SentimentType | null;
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (brand) where.brand = brand;
  if (model) where.model = model;
  if (sentiment) where.sentimentType = sentiment;
  if (sort === "kronik") where.isChronik = true;

  const orderBy: Record<string, string> =
    sort === "top"
      ? { thumbsUp: "desc" }
      : sort === "comments"
      ? { viewCount: "desc" }
      : { createdAt: "desc" };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { name: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const post = await prisma.post.create({
    data: {
      userId: user.id,
      category: body.category,
      brand: body.brand,
      model: body.model,
      year: parseInt(body.year),
      fuelType: body.fuelType,
      kmUsed: body.kmUsed,
      usagePeriod: body.usagePeriod,
      sentimentType: body.sentimentType,
      title: body.title,
      body: body.body,
      tags: body.tags || [],
    },
  });

  return NextResponse.json(post, { status: 201 });
}

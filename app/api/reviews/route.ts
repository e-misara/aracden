import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (brand) where.brand = brand;
  if (model) where.model = model;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        category: true,
        brand: true,
        model: true,
        year: true,
        fuelType: true,
        kmUsed: true,
        sentimentType: true,
        isChronik: true,
        title: true,
        body: true,
        tags: true,
        thumbsUp: true,
        thumbsDown: true,
        createdAt: true,
        user: { select: { name: true, image: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, limit });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, category, brand, model, year, fuelType, kmUsed, usagePeriod, sentimentType, title, body: postBody, tags } = body;

  if (!userId || !category || !brand || !model || !year || !title || !postBody) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      userId,
      category,
      brand,
      model,
      year: parseInt(year),
      fuelType: fuelType || "Benzin",
      kmUsed: kmUsed || "",
      usagePeriod: usagePeriod || "",
      sentimentType,
      title,
      body: postBody,
      tags: tags || [],
    },
  });

  return NextResponse.json(post);
}

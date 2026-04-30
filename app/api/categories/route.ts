import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type CategoryTree = Record<
  string,
  {
    count: number;
    brands: Record<string, { count: number; models: Record<string, number> }>;
  }
>;

export async function GET() {
  const posts = await prisma.post.findMany({
    select: { category: true, brand: true, model: true },
  });

  const tree: CategoryTree = {};

  for (const post of posts) {
    if (!tree[post.category]) tree[post.category] = { count: 0, brands: {} };
    tree[post.category].count++;

    const brands = tree[post.category].brands;
    if (!brands[post.brand]) brands[post.brand] = { count: 0, models: {} };
    brands[post.brand].count++;

    brands[post.brand].models[post.model] =
      (brands[post.brand].models[post.model] || 0) + 1;
  }

  return NextResponse.json(tree);
}

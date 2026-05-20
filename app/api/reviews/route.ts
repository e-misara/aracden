import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/reviews?marka=BMW&model=3 Serisi&kasaTip=Sedan&limit=10&page=1
export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const marka = sp.get("marka") || sp.get("brand");
  const model = sp.get("model");
  const kategoriSlug = sp.get("kategori") || sp.get("category");
  const kasaTip = sp.get("kasaTip");
  const kullanici = sp.get("kullanici");
  const page = Math.max(1, parseInt(sp.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(sp.get("limit") || "10")));

  const where: {
    marka?: string;
    model?: string;
    kategoriSlug?: string;
    kasaTip?: string;
    kullanici?: string;
  } = {};
  if (marka) where.marka = marka;
  if (model) where.model = model;
  if (kategoriSlug) where.kategoriSlug = kategoriSlug;
  if (kasaTip) where.kasaTip = kasaTip;
  if (kullanici) where.kullanici = kullanici;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      orderBy: [{ izlenme: "desc" }, { tarih: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.review.count({ where }),
  ]);

  return NextResponse.json({
    reviews,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

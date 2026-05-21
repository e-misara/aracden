import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/search?q=golf — Tek sorguda marka+model otomatik tamamlama
export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const q = (sp.get("q") ?? "").trim();
  const limit = Math.min(20, Math.max(1, parseInt(sp.get("limit") ?? "10")));

  if (q.length < 2) {
    return NextResponse.json({ q, results: [] });
  }

  // ILIKE her iki alanda da
  const rows = await prisma.$queryRawUnsafe<
    Array<{ marka: string; model: string; kategori: string; total: bigint; avgpuan: number | null }>
  >(
    `
    SELECT
      "marka",
      "model",
      MAX("kategoriSlug") AS kategori,
      COUNT(*)::bigint AS total,
      AVG("puan")::float AS avgpuan
    FROM "Review"
    WHERE
      "marka" NOT IN ('Genel', 'Bilinmiyor', '') AND "marka" IS NOT NULL
      AND (
        "marka" ILIKE $1 OR
        "model" ILIKE $1 OR
        ("marka" || ' ' || "model") ILIKE $1
      )
    GROUP BY "marka", "model"
    HAVING COUNT(*) >= 1
    ORDER BY COUNT(*) DESC
    LIMIT ${limit}
    `,
    `%${q}%`
  );

  const results = rows.map((r) => ({
    marka: r.marka,
    model: r.model,
    kategori: r.kategori,
    totalReview: Number(r.total),
    avgPuan: r.avgpuan ? Math.round(r.avgpuan * 100) / 100 : null,
    url: `/${r.kategori}/${encodeURIComponent(r.marka)}/${encodeURIComponent(r.model)}`,
  }));

  return NextResponse.json({ q, total: results.length, results });
}

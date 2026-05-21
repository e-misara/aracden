import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/brand-models/[marka]?kategori=otomobil
// Marka altındaki tüm modeller için review istatistikleri.
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ marka: string }> },
) {
  const { marka: mRaw } = await ctx.params;
  const marka = decodeURIComponent(mRaw);
  const kategori = new URL(req.url).searchParams.get("kategori");

  const whereCat = kategori
    ? `WHERE "marka" = $1 AND "kategoriSlug" = $2`
    : `WHERE "marka" = $1`;
  const params = kategori ? [marka, kategori] : [marka];

  const rows = await prisma.$queryRawUnsafe<
    Array<{ model: string; total: bigint; avg: number | null; negatif: bigint; pozitif: bigint }>
  >(
    `
    SELECT
      "model",
      COUNT(*)::bigint AS total,
      AVG("puan")::float AS avg,
      COUNT(*) FILTER (WHERE "puan" <= 2.5)::bigint AS negatif,
      COUNT(*) FILTER (WHERE "puan" >= 4)::bigint AS pozitif
    FROM "Review"
    ${whereCat}
    GROUP BY "model"
    ORDER BY COUNT(*) DESC
    `,
    ...params,
  );

  const total = await prisma.review.count({
    where: { marka, ...(kategori ? { kategoriSlug: kategori } : {}) },
  });

  return NextResponse.json({
    marka,
    total,
    models: rows.map((r) => {
      const t = Number(r.total);
      const neg = Number(r.negatif);
      return {
        model: r.model,
        total: t,
        avgPuan: r.avg ? Math.round(r.avg * 100) / 100 : null,
        negatif: neg,
        pozitif: Number(r.pozitif),
        sikayetOrani: t > 0 ? Math.round((neg / t) * 1000) / 10 : 0,
      };
    }),
  });
}

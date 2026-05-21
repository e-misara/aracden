import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/model-kasa-yillar/[marka]/[model]/[kasa]
// Bir model+kasa için yıl bazlı yorum istatistikleri
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ marka: string; model: string; kasa: string }> },
) {
  const { marka: mRaw, model: modRaw, kasa: kRaw } = await ctx.params;
  const marka = decodeURIComponent(mRaw);
  const model = decodeURIComponent(modRaw);
  const kasaSlug = decodeURIComponent(kRaw).toLowerCase();

  const all = await prisma.$queryRawUnsafe<
    Array<{ kasaTip: string }>
  >(`SELECT DISTINCT "kasaTip" FROM "Review" WHERE "marka" = $1 AND "model" = $2 AND "kasaTip" IS NOT NULL`, marka, model);
  const kasa = all.find((k) => k.kasaTip.toLowerCase().replace(/\s+/g, "-") === kasaSlug)?.kasaTip;

  if (!kasa) return NextResponse.json({ marka, model, kasa: null, yillar: [] });

  const rows = await prisma.$queryRawUnsafe<
    Array<{ yil: number | null; total: bigint; avg: number | null; negatif: bigint }>
  >(
    `
    SELECT "yil", COUNT(*)::bigint AS total, AVG("puan")::float AS avg,
           COUNT(*) FILTER (WHERE "puan" <= 2.5)::bigint AS negatif
    FROM "Review"
    WHERE "marka" = $1 AND "model" = $2 AND "kasaTip" = $3 AND "yil" IS NOT NULL
    GROUP BY "yil"
    ORDER BY "yil" DESC
    `,
    marka, model, kasa,
  );

  return NextResponse.json({
    marka,
    model,
    kasa,
    yillar: rows.map((r) => {
      const t = Number(r.total);
      return {
        yil: r.yil,
        total: t,
        avgPuan: r.avg ? Math.round(r.avg * 100) / 100 : null,
        sikayetOrani: t > 0 ? Math.round((Number(r.negatif) / t) * 1000) / 10 : 0,
      };
    }),
  });
}

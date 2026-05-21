import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/model-kasalar/[marka]/[model]
// Bir model için kasaTip → yorum sayısı + ortalama puan
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ marka: string; model: string }> },
) {
  const { marka: mRaw, model: modRaw } = await ctx.params;
  const marka = decodeURIComponent(mRaw);
  const model = decodeURIComponent(modRaw);

  const rows = await prisma.$queryRawUnsafe<
    Array<{ kasa: string | null; total: bigint; avg: number | null; negatif: bigint }>
  >(
    `
    SELECT "kasaTip" AS kasa, COUNT(*)::bigint AS total, AVG("puan")::float AS avg,
           COUNT(*) FILTER (WHERE "puan" <= 2.5)::bigint AS negatif
    FROM "Review"
    WHERE "marka" = $1 AND "model" = $2
    GROUP BY "kasaTip"
    ORDER BY COUNT(*) DESC
    `,
    marka,
    model,
  );

  return NextResponse.json({
    marka,
    model,
    kasalar: rows
      .filter((r) => r.kasa)
      .map((r) => {
        const t = Number(r.total);
        return {
          kasa: r.kasa as string,
          total: t,
          avgPuan: r.avg ? Math.round(r.avg * 100) / 100 : null,
          sikayetOrani: t > 0 ? Math.round((Number(r.negatif) / t) * 1000) / 10 : 0,
        };
      }),
  });
}

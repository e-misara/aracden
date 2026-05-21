import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getModelKasalari } from "@/lib/vehicles-data";

// GET /api/model-kasalar/[marka]/[model]
// vehicles-data'da şasi kodlu kasalar varsa (BMW E46/F30) her birini yıl
// aralığında ayrı sayar; yoksa DB'deki distinct kasaTip aggregate'ini döner.
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ marka: string; model: string }> },
) {
  const { marka: mRaw, model: modRaw } = await ctx.params;
  const marka = decodeURIComponent(mRaw);
  const model = decodeURIComponent(modRaw);

  const kasalar = getModelKasalari(marka, model);

  if (kasalar.length === 0) {
    // Fallback: DB'den distinct kasaTip aggregate
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
      marka, model,
    );
    return NextResponse.json({
      marka,
      model,
      kasalar: rows.filter((r) => r.kasa).map((r) => {
        const t = Number(r.total);
        return {
          kod: r.kasa as string,
          tip: r.kasa as string,
          yillar: null,
          total: t,
          avgPuan: r.avg ? Math.round(r.avg * 100) / 100 : null,
          sikayetOrani: t > 0 ? Math.round((Number(r.negatif) / t) * 1000) / 10 : 0,
        };
      }),
    });
  }

  // vehicles-data'dan gelen kasaları sırasıyla say (max ~10 kasa, paralel)
  const stats = await Promise.all(
    kasalar.map(async (k) => {
      const params: (string | number)[] = [marka, model, k.tip];
      let yearFilter = "";
      if (k.yillar) {
        yearFilter = ` AND "yil" BETWEEN $4 AND $5`;
        params.push(k.yillar[0], k.yillar[1]);
      }
      const r = await prisma.$queryRawUnsafe<
        Array<{ total: bigint; avg: number | null; negatif: bigint }>
      >(
        `
        SELECT COUNT(*)::bigint AS total, AVG("puan")::float AS avg,
               COUNT(*) FILTER (WHERE "puan" <= 2.5)::bigint AS negatif
        FROM "Review"
        WHERE "marka" = $1 AND "model" = $2 AND "kasaTip" = $3${yearFilter}
        `,
        ...params,
      );
      const row = r[0];
      const t = Number(row?.total ?? 0);
      return {
        kod: k.kod,
        tip: k.tip,
        yillar: k.yillar ?? null,
        total: t,
        avgPuan: row?.avg ? Math.round(row.avg * 100) / 100 : null,
        sikayetOrani: t > 0 ? Math.round((Number(row.negatif) / t) * 1000) / 10 : 0,
      };
    }),
  );

  return NextResponse.json({ marka, model, kasalar: stats });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveKasa } from "@/lib/vehicles-data";

// GET /api/model-kasa-yillar/[marka]/[model]/[kasa]
// Kasa slug'ı şasi kodu (E46) ya da gövde tipi (sedan) olabilir.
// Şasi kodu ise: kasaTip=tip filtresi + üretim yılı aralığı uygulanır.
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ marka: string; model: string; kasa: string }> },
) {
  const { marka: mRaw, model: modRaw, kasa: kRaw } = await ctx.params;
  const marka = decodeURIComponent(mRaw);
  const model = decodeURIComponent(modRaw);
  const kasaSlug = decodeURIComponent(kRaw);

  // 1) Önce vehicles-data'dan (şasi kodu eşleşmesi için)
  const fromData = resolveKasa(marka, model, kasaSlug);

  // 2) Veride bulunamadıysa DB'deki distinct kasaTip listesinden eşleştir
  let kasaTip: string | null = fromData?.tip ?? null;
  if (!kasaTip) {
    const all = await prisma.$queryRawUnsafe<Array<{ kasaTip: string }>>(
      `SELECT DISTINCT "kasaTip" FROM "Review" WHERE "marka" = $1 AND "model" = $2 AND "kasaTip" IS NOT NULL`,
      marka, model,
    );
    kasaTip = all.find((k) => k.kasaTip.toLowerCase().replace(/\s+/g, "-") === kasaSlug.toLowerCase())?.kasaTip ?? null;
  }

  if (!kasaTip) {
    return NextResponse.json({
      marka, model, kasa: null, kod: fromData?.kod ?? null, tip: null, yillar: [],
    });
  }

  const yearRange = fromData?.yillar; // şasi yıl aralığı
  const params: (string | number)[] = [marka, model, kasaTip];
  let yearFilter = "";
  if (yearRange) {
    yearFilter = ` AND "yil" BETWEEN $4 AND $5`;
    params.push(yearRange[0], yearRange[1]);
  }

  const rows = await prisma.$queryRawUnsafe<
    Array<{ yil: number | null; total: bigint; avg: number | null; negatif: bigint }>
  >(
    `
    SELECT "yil", COUNT(*)::bigint AS total, AVG("puan")::float AS avg,
           COUNT(*) FILTER (WHERE "puan" <= 2.5)::bigint AS negatif
    FROM "Review"
    WHERE "marka" = $1 AND "model" = $2 AND "kasaTip" = $3 AND "yil" IS NOT NULL${yearFilter}
    GROUP BY "yil"
    ORDER BY "yil" DESC
    `,
    ...params,
  );

  return NextResponse.json({
    marka,
    model,
    kasa: kasaTip,              // geriye dönük uyumluluk
    kod: fromData?.kod ?? kasaTip,
    tip: kasaTip,
    yillar_aralik: yearRange ?? null,
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

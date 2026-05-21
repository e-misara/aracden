import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/brands?kategori=otomobil&sort=avgPuan|sikayetOrani|totalReview
export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const kategori = sp.get("kategori");
  const sort = sp.get("sort") ?? "totalReview"; // totalReview | avgPuan | sikayetOrani
  const limit = Math.min(200, Math.max(1, parseInt(sp.get("limit") ?? "100")));

  // Genel / Bilinmiyor / boş markaları her zaman filtrele
  const baseWhere = `"marka" NOT IN ('Genel', 'Bilinmiyor', '') AND "marka" IS NOT NULL`;
  const whereCat = kategori ? `WHERE ${baseWhere} AND "kategoriSlug" = $1` : `WHERE ${baseWhere}`;
  const params = kategori ? [kategori] : [];

  // Brand stats — tek SQL
  const rows = await prisma.$queryRawUnsafe<
    Array<{
      marka: string;
      totalreview: bigint;
      avgpuan: number | null;
      sikayet: bigint;
    }>
  >(
    `
    SELECT
      "marka",
      COUNT(*)::bigint AS totalreview,
      AVG("puan")::float AS avgpuan,
      COUNT(*) FILTER (WHERE "puan" < 2.5)::bigint AS sikayet
    FROM "Review"
    ${whereCat}
    GROUP BY "marka"
    HAVING COUNT(*) >= 1
    ORDER BY COUNT(*) DESC
    LIMIT ${limit}
    `,
    ...params
  );

  // Her marka için en çok yorum alan model
  const topModels = await prisma.$queryRawUnsafe<
    Array<{ marka: string; model: string; cnt: bigint }>
  >(
    `
    SELECT DISTINCT ON ("marka") "marka", "model", COUNT(*) OVER (PARTITION BY "marka", "model")::bigint AS cnt
    FROM "Review"
    ${whereCat}
    ORDER BY "marka", cnt DESC
    `,
    ...params
  );
  const topModelMap = new Map(topModels.map((r) => [r.marka, { model: r.model, count: Number(r.cnt) }]));

  // Şikayet/marka kategori dağılımı (en sık geçtiği kategori)
  const dominantCat = await prisma.$queryRawUnsafe<
    Array<{ marka: string; kategorislug: string; cnt: bigint }>
  >(
    `
    SELECT DISTINCT ON ("marka") "marka", "kategoriSlug" AS kategorislug, COUNT(*) OVER (PARTITION BY "marka", "kategoriSlug")::bigint AS cnt
    FROM "Review"
    ${whereCat}
    ORDER BY "marka", cnt DESC
    `,
    ...params
  );
  const catMap = new Map(dominantCat.map((r) => [r.marka, r.kategorislug]));

  let brands = rows.map((r) => {
    const total = Number(r.totalreview);
    const sikayet = Number(r.sikayet);
    return {
      marka: r.marka,
      totalReview: total,
      avgPuan: r.avgpuan ? Math.round(r.avgpuan * 100) / 100 : null,
      sikayetOrani: total > 0 ? Math.round((sikayet / total) * 1000) / 1000 : 0,
      sikayetSayisi: sikayet,
      kategori: catMap.get(r.marka) ?? null,
      enCokModel: topModelMap.get(r.marka)?.model ?? null,
      enCokModelSayisi: topModelMap.get(r.marka)?.count ?? null,
    };
  });

  // Sort
  if (sort === "avgPuan") {
    brands = brands.sort((a, b) => (b.avgPuan ?? 0) - (a.avgPuan ?? 0));
  } else if (sort === "sikayetOrani") {
    brands = brands.sort((a, b) => b.sikayetOrani - a.sikayetOrani);
  }

  return NextResponse.json({
    total: brands.length,
    sort,
    kategori,
    brands,
  });
}

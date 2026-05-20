/**
 * Import 1272 reviews from lib/sample-reviews.ts → PostgreSQL Review table.
 * Usage:  npx tsx scripts/import-reviews.ts
 */
import { prisma } from "../lib/prisma";
import { sampleReviews } from "../lib/sample-reviews";

async function main() {
  console.log(`İmport ediliyor: ${sampleReviews.length} review`);
  if (sampleReviews.length === 0) {
    console.log("⚠ sample-reviews.ts boş — önce sample-reviews.ts'i geri yükle veya kaynak veriyi kullan.");
    return;
  }

  // Bağlantı testi
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✓ DB bağlantısı OK");
  } catch (e) {
    console.error("✗ DB bağlantı hatası:", e);
    process.exit(1);
  }

  // Önce eski Review kayıtlarını sil (clean import)
  const existing = await prisma.review.count();
  if (existing > 0) {
    console.log(`  Mevcut ${existing} review siliniyor...`);
    await prisma.review.deleteMany({});
  }

  const batchSize = 500;
  let imported = 0;
  let failed = 0;

  for (let i = 0; i < sampleReviews.length; i += batchSize) {
    const batch = sampleReviews.slice(i, i + batchSize);
    const data = batch.map((r) => ({
      id: r.id,
      kategoriSlug: r.kategoriSlug,
      kullanici: r.kullanici,
      kullaniciAvatar: r.kullaniciAvatar ?? null,
      verified: r.verified ?? false,
      marka: r.marka,
      model: r.model,
      kasaKod: r.kasaKod ?? null,
      kasaTip: r.kasaTip ?? null,
      yil: r.yil ?? null,
      puan: r.puan,
      sinifKodu: r.sinifKodu ?? null,
      baslik: r.baslik,
      icerik: r.icerik,
      olumlu: r.olumlu ?? [],
      olumsuz: r.olumsuz ?? [],
      sentimentType: r.sentimentType ?? null,
      kaynakUrl: r.kaynakUrl ?? null,
      tarih: r.tarih ?? null,
      izlenme: r.izlenme ?? null,
      likeCount: r.likeCount ?? null,
    }));
    try {
      const res = await prisma.review.createMany({ data, skipDuplicates: true });
      imported += res.count;
      console.log(
        `  ✓ Batch ${Math.floor(i / batchSize) + 1}: ${res.count}/${batch.length} eklendi (kümülatif ${imported})`
      );
    } catch (e) {
      console.error(`  ✗ Batch ${Math.floor(i / batchSize) + 1} hata:`, e instanceof Error ? e.message : e);
      failed += batch.length;
    }
  }

  const final = await prisma.review.count();
  console.log(`\nTamamlandı: ${imported} import, ${failed} hata, DB toplam: ${final}`);

  // Hızlı sanity check
  const sample = await prisma.review.findMany({ take: 3, orderBy: { izlenme: "desc" } });
  console.log("\nÖrnek 3 (en çok izlenen):");
  for (const r of sample) {
    console.log(`  - ${r.marka} ${r.model} (${r.kullanici}) — ${r.izlenme?.toLocaleString() ?? 0} izlenme`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

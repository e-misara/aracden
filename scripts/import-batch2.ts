/**
 * Yeni batch2 review'larını DB'ye import et.
 * Usage:  node --env-file=.env --import tsx scripts/import-batch2.ts
 */
import { prisma } from "../lib/prisma";
import { readFileSync } from "fs";

type Review = {
  id: string;
  kategoriSlug: string;
  kullanici: string;
  kullaniciAvatar?: string;
  verified?: boolean;
  marka: string;
  model: string;
  kasaKod?: string;
  kasaTip?: string;
  yil?: number;
  puan: number;
  sinifKodu?: string;
  baslik: string;
  icerik: string;
  olumlu?: string[];
  olumsuz?: string[];
  sentimentType?: "COMPLAINT" | "POSITIVE" | "TIP";
  kaynakUrl?: string;
  tarih?: string;
  izlenme?: number;
  likeCount?: number;
};

const SOURCES: { label: string; path: string }[] = [
  { label: "YouTube batch2 (4 kanal)", path: "/Users/GAC-A/andmcetin-data/new-reviews-batch2.json" },
  { label: "Şikayetvar (18 marka)",    path: "/Users/GAC-A/andmcetin-data/sikayetvar-reviews.json" },
];

async function main() {
  // Bağlantı testi
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✓ DB bağlantısı OK\n");
  } catch (e) {
    console.error("✗ DB bağlantı hatası:", e);
    process.exit(1);
  }

  // Mevcut DB'deki kaynakUrl set (duplicate kontrolü)
  console.log("DB'deki mevcut kaynakUrl'ler okunuyor...");
  const existingRows = await prisma.review.findMany({
    where: { kaynakUrl: { not: null } },
    select: { kaynakUrl: true },
  });
  const existingUrls = new Set(existingRows.map((r) => r.kaynakUrl).filter((u): u is string => !!u));
  console.log(`  ${existingUrls.size} unique kaynakUrl mevcut\n`);

  let grandImported = 0;
  let grandSkipped = 0;
  const report: { label: string; total: number; imported: number; skipped_dup: number }[] = [];

  for (const src of SOURCES) {
    const raw = readFileSync(src.path, "utf-8");
    const reviews: Review[] = JSON.parse(raw);
    console.log(`📥 ${src.label}: ${reviews.length} review`);

    // Duplicate'leri ayır
    const fresh = reviews.filter((r) => !r.kaynakUrl || !existingUrls.has(r.kaynakUrl));
    const skippedDup = reviews.length - fresh.length;
    console.log(`   ${skippedDup} dup atlandı, ${fresh.length} fresh`);

    // Batch import
    let imported = 0;
    const batchSize = 500;
    for (let i = 0; i < fresh.length; i += batchSize) {
      const batch = fresh.slice(i, i + batchSize);
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
        console.log(`   ✓ Batch ${Math.floor(i / batchSize) + 1}: ${res.count}/${batch.length}`);
        // Yeni eklenenleri set'e ekle (sonraki kaynak için)
        for (const r of batch) if (r.kaynakUrl) existingUrls.add(r.kaynakUrl);
      } catch (e) {
        console.error(`   ✗ Batch ${Math.floor(i / batchSize) + 1} hata:`, e instanceof Error ? e.message : e);
      }
    }
    console.log(`   → ${src.label}: ${imported} import, ${skippedDup} dup atlandı\n`);
    report.push({ label: src.label, total: reviews.length, imported, skipped_dup: skippedDup });
    grandImported += imported;
    grandSkipped += skippedDup;
  }

  // DB sayım sorguları
  const total = await prisma.review.count();
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  YENİ İMPORT: ${grandImported}`);
  console.log(`  Duplicate atlandı: ${grandSkipped}`);
  console.log(`  DB TOPLAM: ${total} review`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  // Kullanıcı bazlı
  console.log("\nKullanıcıya göre dağılım:");
  const byUser = await prisma.review.groupBy({
    by: ["kullanici"],
    _count: true,
    orderBy: { _count: { kullanici: "desc" } },
  });
  for (const u of byUser) {
    console.log(`  ${u.kullanici.padEnd(30)} ${u._count.toString().padStart(5)}`);
  }

  // Marka bazlı top 10
  console.log("\nEn çok 10 marka:");
  const byBrand = await prisma.review.groupBy({
    by: ["marka"],
    _count: true,
    orderBy: { _count: { marka: "desc" } },
    take: 10,
  });
  for (const b of byBrand) {
    console.log(`  ${b.marka.padEnd(20)} ${b._count.toString().padStart(5)}`);
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

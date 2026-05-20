/**
 * GÖREV E — andmcetin "Detaylı yorum için..." içerikli review'ları
 * testdrives_full.json verisi ile zenginleştir.
 */
import { prisma } from "../lib/prisma";
import { readFileSync } from "fs";

type TestDrive = {
  marka: string;
  model: string;
  segment_kod: string;
  arac_yili: string;
  test_tarihi: string;
  puan: string;
  media_url: string;
};

const SEGMENT_TR: Record<string, string> = {
  "A": "şehir içi (A)",
  "B": "küçük sınıf (B)",
  "C": "kompakt (C)",
  "D": "orta sınıf (D)",
  "E": "üst sınıf (E)",
  "F": "lüks (F)",
  "J": "SUV (J)",
  "JJ": "büyük SUV (JJ)",
  "JJJ": "premium SUV (JJJ)",
  "M": "MPV/Minivan (M)",
  "S": "spor (S)",
  "T": "ticari (T)",
};

function segmentToTR(kod: string): string {
  if (!kod) return "kategorisiz";
  // "JJJ+" → "JJJ"
  const base = kod.replace(/[+\-*]+$/, "");
  return SEGMENT_TR[base] || `${base} segmenti`;
}

async function main() {
  // 1) andmcetin Review'larından "Detaylı yorum için" içerenler
  const stale = await prisma.review.findMany({
    where: {
      kullanici: "andmcetin",
      icerik: { contains: "Detaylı yorum için" },
    },
    select: { id: true, marka: true, model: true, yil: true, sinifKodu: true, baslik: true, icerik: true },
  });
  console.log(`Bulunan stale: ${stale.length}`);

  // 2) testdrives_full.json yükle
  const drives: TestDrive[] = JSON.parse(
    readFileSync("/Users/GAC-A/andmcetin-data/output/testdrives_full.json", "utf-8")
  );
  console.log(`testdrives_full: ${drives.length} kayıt`);

  // Hash: (marka, model normalize, yıl) → testdrive
  const norm = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const driveByKey: Record<string, TestDrive> = {};
  for (const d of drives) {
    const yr = (d.arac_yili || "").trim();
    const key = `${norm(d.marka)}|${norm(d.model)}|${yr}`;
    driveByKey[key] = d;
    // Model'in ilk kelimesiyle de kayıt (örn "156 1.6 TS" → "156")
    const firstWord = (d.model || "").split(/\s+/)[0];
    const keyShort = `${norm(d.marka)}|${norm(firstWord)}|${yr}`;
    if (!driveByKey[keyShort]) driveByKey[keyShort] = d;
  }

  let updated = 0;
  let nomatch = 0;
  let i = 0;
  for (const r of stale) {
    i++;
    const yr = (r.yil || "").toString();
    const key1 = `${norm(r.marka)}|${norm(r.model)}|${yr}`;
    const firstWord = (r.model || "").split(/\s+/)[0];
    const key2 = `${norm(r.marka)}|${norm(firstWord)}|${yr}`;
    const td = driveByKey[key1] || driveByKey[key2] ||
               driveByKey[`${norm(r.marka)}|${norm(r.model)}|`] ||
               driveByKey[`${norm(r.marka)}|${norm(firstWord)}|`];

    if (!td) {
      // marka+model only (yıl bağımsız)
      const candidate = drives.find(d => norm(d.marka) === norm(r.marka) && norm(d.model).startsWith(norm(firstWord)));
      if (!candidate) { nomatch++; continue; }
    }

    const matched = td || drives.find(d => norm(d.marka) === norm(r.marka) && norm(d.model).startsWith(norm(firstWord)))!;
    const segment = segmentToTR(matched.segment_kod || r.sinifKodu || "");
    const yilStr = matched.arac_yili || (r.yil ? `${r.yil}` : "—");
    const puanStr = matched.puan ? `And Çetin puanı: ${matched.puan}.` : "";
    const tarihStr = matched.test_tarihi ? `Test tarihi: ${matched.test_tarihi}.` : "";
    const platformStr = matched.media_url ? `Detaylı video: ${matched.media_url}` : "";

    const yeniIcerik = [
      `${r.marka} ${r.model} (${yilStr}), And Çetin tarafından ${segment} segmentinde değerlendirildi.`,
      puanStr,
      tarihStr,
      platformStr,
    ].filter(Boolean).join(" ").trim();

    await prisma.review.update({
      where: { id: r.id },
      data: { icerik: yeniIcerik },
    });
    updated++;
    if (i % 20 === 0) console.log(`  ${i}/${stale.length} işlendi, ${updated} güncellendi`);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  GÖREV E TOPLAM: ${updated} review güncellendi`);
  console.log(`  Eşleşmeyen: ${nomatch}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

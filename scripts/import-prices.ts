/**
 * scripts/import-prices.ts
 *
 * /Users/GAC-A/andmcetin-data/mobile-de/raw/*.json dosyalarındaki ilanları
 * Neon DB'deki VehiclePrice tablosuna yükler. URL benzersizliği ile duplicate'i
 * önler (Prisma @unique).
 *
 * Kullanım:
 *   cd aracden && npx tsx scripts/import-prices.ts [--dry-run]
 */

import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const RAW_DIR = "/Users/GAC-A/andmcetin-data/mobile-de/raw";

type Listing = {
  marka: string;
  model: string;
  yil: number | null;
  km: number | null;
  fiyat_eur: number;
  motor?: string | null;
  guc_hp?: number | null;
  vites?: string | null;
  yakit?: string | null;
  kasa?: string | null;
  renk?: string | null;
  sehir?: string | null;
  ulke?: string;
  ilan_tarihi?: string | null;
  kaynak: string;
  url: string;
};

async function main() {
  const dry = process.argv.includes("--dry-run");
  const prisma = new PrismaClient();

  let total = 0;
  let inserted = 0;
  let skipped = 0;

  const files = readdirSync(RAW_DIR).filter((f) => f.endsWith(".json"));
  if (files.length === 0) {
    console.log(`⚠ ${RAW_DIR} boş. Önce scrape-mobile-de.py çalıştır.`);
    return;
  }

  for (const file of files) {
    const path = join(RAW_DIR, file);
    const data: Listing[] = JSON.parse(readFileSync(path, "utf-8"));
    total += data.length;

    for (const it of data) {
      if (!it.yil || !it.fiyat_eur || !it.url) continue;
      if (dry) { inserted++; continue; }
      try {
        await prisma.vehiclePrice.create({
          data: {
            marka: it.marka,
            model: it.model,
            yil: it.yil,
            km: it.km ?? null,
            fiyatEur: it.fiyat_eur,
            motor: it.motor ?? null,
            gucHp: it.guc_hp ?? null,
            vites: it.vites ?? null,
            yakit: it.yakit ?? null,
            kasa: it.kasa ?? null,
            renk: it.renk ?? null,
            sehir: it.sehir ?? null,
            ulke: it.ulke ?? "DE",
            kaynak: it.kaynak,
            ilanUrl: it.url,
            ilanTarih: it.ilan_tarihi ?? null,
          },
        });
        inserted++;
      } catch (e: unknown) {
        // Duplicate URL → skip
        if (e instanceof Error && e.message.includes("Unique constraint")) skipped++;
        else throw e;
      }
    }
    console.log(`  ${file}: ${data.length} ilan işlendi`);
  }

  await prisma.$disconnect();
  console.log(`\n${dry ? "DRY-RUN " : ""}TOPLAM ${total} ilan → ${inserted} yeni, ${skipped} duplicate.`);
}

main().catch((e) => { console.error(e); process.exit(1); });

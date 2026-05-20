/**
 * marka="Genel" olan review'ları başlık/içerikten gerçek markaya eşle.
 * Usage: node --env-file=.env --import tsx scripts/fix-genel-brand.ts
 */
import { prisma } from "../lib/prisma";

// Türk pazarı geniş marka listesi
const BRANDS = [
  "Mercedes-Benz","Range Rover","Land Rover","Alfa Romeo","DS Automobiles",
  "Volkswagen","Mercedes","BMW","Audi","Porsche","Toyota","Honda","Nissan",
  "Mazda","Subaru","Suzuki","Mitsubishi","Hyundai","Kia","Renault","Peugeot",
  "Citroen","Citroën","Fiat","Ford","Opel","Skoda","Seat","Cupra","Volvo",
  "Tesla","TOGG","Chery","BYD","Dacia","Lada","Daewoo","Smart","Mini","Jeep",
  "Jaguar","Lexus","Infiniti","Saab","Rover","Abarth","Alpine","Maserati",
  "Lamborghini","Ferrari","Bentley","Aston Martin","Yamaha","Kawasaki",
  "Ducati","Aprilia","KTM","Triumph","Harley-Davidson","Royal Enfield",
  "Bajaj","Vespa","Piaggio","Kymco","SYM","Moto Guzzi","Iveco","MAN","Isuzu",
  "Scania","Volvo Trucks","Renault Trucks","Ford Trucks","Tata","BMC","Otokar",
];
// Alias normalize
const ALIAS: Record<string, string> = {
  "Mercedes": "Mercedes-Benz",
  "Citroën": "Citroen",
  "Range Rover": "Land Rover",
};
const PATTERN = new RegExp("\\b(" + BRANDS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "i");

function extractBrand(text: string): string | null {
  if (!text) return null;
  const m = PATTERN.exec(text);
  if (!m) return null;
  const found = m[1];
  return ALIAS[found] ?? found;
}

async function main() {
  await prisma.$queryRaw`SELECT 1`;
  console.log("✓ DB OK\n");

  const rows = await prisma.review.findMany({
    where: { marka: "Genel" },
    select: { id: true, baslik: true, icerik: true, kaynakUrl: true },
  });
  console.log(`  marka='Genel' kayıt: ${rows.length}`);

  let updated = 0;
  let unknown = 0;
  const updates: Record<string, number> = {};

  for (const r of rows) {
    const text = `${r.baslik ?? ""} ${r.icerik ?? ""} ${r.kaynakUrl ?? ""}`;
    const brand = extractBrand(text);
    if (brand) {
      await prisma.review.update({ where: { id: r.id }, data: { marka: brand } });
      updated++;
      updates[brand] = (updates[brand] ?? 0) + 1;
    } else {
      await prisma.review.update({ where: { id: r.id }, data: { marka: "Bilinmiyor" } });
      unknown++;
    }
  }

  console.log(`\n✓ Düzeltilen: ${updated}`);
  console.log(`○ Bilinmiyor: ${unknown}`);
  console.log("\nYeniden eşlenen markalar:");
  for (const [b, c] of Object.entries(updates).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${b}: ${c}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

/**
 * Generic andmcetin review'ları zenginleştir + boş olumlu/olumsuz doldur.
 * Usage: node --env-file=.env --import tsx scripts/enrich-reviews.ts
 */
import { prisma } from "../lib/prisma";
import { readFileSync } from "fs";

type Testdrive = {
  marka: string;
  model: string;
  segment_kod: string;
  arac_yili: string;
  test_tarihi: string;
  puan: string;
  video_id?: string;
  video_meta?: { description?: string; title?: string };
};

type Article = { no: number; title: string; content: string };

// Stopword cümleleri tespit et
const GENERIC_PATTERN = /(?:test sürüşü değerlendirmesi|Segment kodu|Detaylı yorum için video kaynağını izleyin)/;

const POS_KW = /\b(mükemmel|harika|süper|muhteşem|iyi|en güzel|tercih|tavsiy|başarılı|favori|kalite|verim|hızlı|konfor|ekonomik|şahane|premium|öner)/i;
const NEG_KW = /\b(sorun|arıza|hata|dikkat|kötü|berbat|pişman|hayal kırıklığı|kronik|şikayet|zaaf|yetersiz|titreşim|tıkırtı|yağ yak|yüksek tüket|bozuk|riskli)/i;

function decode(s: string): string {
  const map: Record<string, string> = { "&#x27;": "'", "&quot;": '"', "&amp;": "&", "&nbsp;": " " };
  let r = s;
  for (const [k, v] of Object.entries(map)) r = r.split(k).join(v);
  return r;
}

function extractRelevantSentences(marka: string, model: string, articles: Article[], maxN = 3): string[] {
  const m = (model || "").toLowerCase();
  const b = (marka || "").toLowerCase();
  if (m.length < 3 || !b) return [];
  const out: { score: number; text: string }[] = [];
  for (const a of articles) {
    const body = decode(a.content);
    const sents = body.split(/(?<=[.!?])\s+/);
    for (const s of sents) {
      if (s.length < 30 || s.length > 250) continue;
      const sl = s.toLowerCase();
      if (!sl.includes(b) || !sl.includes(m)) continue;
      if (/abone ol|youtube\.com|instagram|tiktok|her hakkı saklıdır/.test(sl)) continue;
      out.push({ score: m.length + (sl.split(m).length - 1) * 2, text: s.trim() });
    }
  }
  out.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const result: string[] = [];
  for (const { text } of out) {
    const norm = text.toLowerCase().replace(/\s+/g, " ");
    if (seen.has(norm)) continue;
    seen.add(norm);
    result.push(text);
    if (result.length >= maxN) break;
  }
  return result;
}

function findTestdriveFor(marka: string, model: string, yil: number | null, testdrives: Testdrive[]): Testdrive | null {
  // Tam eşleşme dene (marka + model contains model + yıl tolerans 2)
  const matches = testdrives.filter((t) => {
    if (t.marka !== marka) return false;
    if (!t.model.toLowerCase().includes(model.toLowerCase())) return false;
    if (yil) {
      const ty = parseInt(t.arac_yili || "0");
      if (Math.abs(ty - yil) > 3) return false;
    }
    return true;
  });
  return matches[0] || null;
}

function extractPros(text: string): string[] {
  const sents = text.split(/(?<=[.!?])\s+|\n+/);
  const out: string[] = [];
  const seen = new Set<string>();
  for (const s of sents) {
    const t = s.trim();
    if (t.length < 15 || t.length > 150) continue;
    if (POS_KW.test(t) && !seen.has(t.toLowerCase())) {
      out.push(t); seen.add(t.toLowerCase());
    }
    if (out.length >= 3) break;
  }
  return out;
}

function extractCons(text: string): string[] {
  const sents = text.split(/(?<=[.!?])\s+|\n+/);
  const out: string[] = [];
  const seen = new Set<string>();
  for (const s of sents) {
    const t = s.trim();
    if (t.length < 15 || t.length > 150) continue;
    if (NEG_KW.test(t) && !seen.has(t.toLowerCase())) {
      out.push(t); seen.add(t.toLowerCase());
    }
    if (out.length >= 3) break;
  }
  return out;
}

async function main() {
  await prisma.$queryRaw`SELECT 1`;
  console.log("✓ DB bağlantısı OK\n");

  // Kaynak veriler
  const testdrives: Testdrive[] = JSON.parse(readFileSync("/Users/GAC-A/andmcetin-data/output/testdrives_full.json", "utf-8"));
  const articles: Article[] = JSON.parse(readFileSync("/Users/GAC-A/andmcetin-data/output/articles.json", "utf-8"));
  console.log(`  Testdrive arşivi: ${testdrives.length}, Makaleler: ${articles.length}\n`);

  // 1) Generic andmcetin review'larını zenginleştir
  console.log("━━━ 1) Generic andmcetin icerik enrichment ━━━");
  const generics = await prisma.review.findMany({
    where: {
      kullanici: "andmcetin",
      icerik: { contains: "Detaylı yorum için video kaynağını izleyin" },
    },
  });
  console.log(`  ${generics.length} generic review bulundu`);

  let enriched = 0;
  for (const r of generics) {
    const sents = extractRelevantSentences(r.marka, r.model, articles, 2);
    let newIcerik: string | null = null;
    if (sents.length > 0) {
      newIcerik = sents.join(" ").slice(0, 600);
    } else {
      // Testdrive arşivinden zengin generic yap
      const td = findTestdriveFor(r.marka, r.model, r.yil, testdrives);
      if (td) {
        const segment = td.segment_kod ? `Segment kodu: ${td.segment_kod}.` : "";
        const tarih = td.test_tarihi ? ` Test tarihi: ${td.test_tarihi}.` : "";
        const puan = td.puan && /^\d+$/.test(td.puan) ? ` And Çetin puanı: ${td.puan}/10.` : "";
        newIcerik = `${td.arac_yili || r.yil} model ${r.marka} ${r.model} aracın And Mehmet Çetin tarafından test sürüşü değerlendirmesi.${tarih}${puan} ${segment}`.trim();
      }
    }
    if (newIcerik && newIcerik !== r.icerik) {
      await prisma.review.update({ where: { id: r.id }, data: { icerik: newIcerik } });
      enriched++;
    }
  }
  console.log(`  ✓ ${enriched} review zenginleştirildi (${generics.length - enriched} hala yetersiz veri)`);

  // 2) Boş olumlu/olumsuz dolu olan review'ları doldur
  console.log("\n━━━ 2) Boş olumlu/olumsuz doldur ━━━");
  const emptyPros = await prisma.review.findMany({
    where: {
      OR: [
        { olumlu: { isEmpty: true } },
        { olumsuz: { isEmpty: true } },
      ],
      // Hem icerik hem baslik dolu olanları al
      icerik: { not: "" },
    },
    select: { id: true, baslik: true, icerik: true, olumlu: true, olumsuz: true },
    take: 5000, // batch limit
  });
  console.log(`  ${emptyPros.length} review'da olumlu veya olumsuz boş`);

  let filledP = 0, filledC = 0;
  // Batch update için ID listesi tut
  for (const r of emptyPros) {
    const text = `${r.baslik} ${r.icerik}`;
    const updates: { olumlu?: string[]; olumsuz?: string[] } = {};
    if (r.olumlu.length === 0) {
      const pros = extractPros(text);
      if (pros.length > 0) { updates.olumlu = pros; filledP++; }
    }
    if (r.olumsuz.length === 0) {
      const cons = extractCons(text);
      if (cons.length > 0) { updates.olumsuz = cons; filledC++; }
    }
    if (Object.keys(updates).length > 0) {
      await prisma.review.update({ where: { id: r.id }, data: updates });
    }
  }
  console.log(`  ✓ ${filledP} review'a olumlu eklendi, ${filledC} review'a olumsuz eklendi`);

  // Toplam
  const total = await prisma.review.count();
  console.log(`\nDB toplam: ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

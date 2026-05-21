import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HASHTAGS, extractHashtags } from "@/lib/hashtags";

type Row = {
  baslik: string | null;
  icerik: string | null;
  olumlu: string[];
  olumsuz: string[];
  marka: string;
  model: string;
};

// GET /api/hashtags — Top N hashtag (default 20)
// GET /api/hashtags?tag=#DSGSorunu — o hashtag'deki review'ları döndür
export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const tag = sp.get("tag");

  if (tag) {
    // Specific hashtag — review'ları döndür
    const def = HASHTAGS.find((h) => h.tag === tag);
    if (!def) return NextResponse.json({ tag, results: [], total: 0 });

    // En basit: tüm review'ları çek, pattern ile filtrele (DB'de regex pahalı)
    // Burada Türkçe LIKE kullan, basit
    const patternStr = def.patterns.map((p) => p.source.replace(/\\\\/g, "\\")).join("|");
    const ilikeTerms = def.patterns
      .map((p) =>
        p.source
          .replace(/\\s\*/g, " ")
          .replace(/\\b/g, "")
          .replace(/\[ıi\]/g, "i")
          .replace(/\\/g, "")
      )
      .map((t) => `%${t}%`);

    const where: { OR: Array<{ baslik?: { contains: string; mode: "insensitive" }; icerik?: { contains: string; mode: "insensitive" } }> } = {
      OR: [],
    };
    for (const t of ilikeTerms.slice(0, 3)) {
      where.OR.push({ baslik: { contains: t.replace(/%/g, ""), mode: "insensitive" } });
      where.OR.push({ icerik: { contains: t.replace(/%/g, ""), mode: "insensitive" } });
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { izlenme: "desc" },
      take: 50,
    });

    return NextResponse.json({ tag, hashtag: def, total: reviews.length, results: reviews });
  }

  // Tüm hashtag'lerin count'ları (örnek 5000 review üzerinden)
  const rows: Row[] = await prisma.review.findMany({
    select: { baslik: true, icerik: true, olumlu: true, olumsuz: true, marka: true, model: true },
    take: 5000,
    orderBy: { izlenme: "desc" },
  });

  const counts: Record<string, { tag: string; label: string; emoji: string; color: string; count: number; sentiment: string }> = {};
  for (const r of rows) {
    const text = `${r.baslik ?? ""} ${r.icerik ?? ""} ${r.olumsuz.join(" ")}`;
    const tags = extractHashtags(text);
    for (const tg of tags) {
      const def = HASHTAGS.find((h) => h.tag === tg)!;
      if (!counts[tg]) counts[tg] = { tag: tg, label: def.label, emoji: def.emoji, color: def.color, count: 0, sentiment: def.sentiment };
      counts[tg].count += 1;
    }
  }

  const sorted = Object.values(counts).sort((a, b) => b.count - a.count);
  return NextResponse.json({ total: sorted.length, sampledFrom: rows.length, hashtags: sorted });
}

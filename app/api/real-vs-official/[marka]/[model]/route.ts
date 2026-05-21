import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getVehicleInfo } from "@/lib/vehicle-info";

// GET /api/real-vs-official/[marka]/[model]
// Üretici iddiası + gerçek kullanıcı ortalamaları yan yana.
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ marka: string; model: string }> },
) {
  const { marka: mRaw, model: modRaw } = await ctx.params;
  const marka = decodeURIComponent(mRaw);
  const model = decodeURIComponent(modRaw);

  const info = getVehicleInfo(marka, model);

  const reviews = await prisma.review.findMany({
    where: { marka, model },
    select: { puan: true, sentimentType: true, icerik: true, olumsuz: true },
    take: 500,
  });

  const total = reviews.length;
  const avgPuan = total > 0 ? reviews.reduce((s, r) => s + r.puan, 0) / total : null;
  const negatif = reviews.filter((r) => r.puan <= 2.5).length;
  const pozitif = reviews.filter((r) => r.puan >= 4).length;
  const sikayetOrani = total > 0 ? (negatif / total) * 100 : null;

  // Sorun kategorileri sayımı (basit regex)
  const kategoriler: Record<string, number> = {};
  const PATTERNS = [
    { label: "Şanzıman", re: /dsg|şanzıman|vites/i },
    { label: "Motor/Yağ", re: /motor[\s-]?yağ|yağ\s+yak|motor\s+arıza/i },
    { label: "Servis", re: /servis|garanti|yetkili/i },
    { label: "Yakıt", re: /yakıt|tüket/i },
    { label: "Elektrik", re: /ekran|elektrik|multimedya|donma/i },
    { label: "Fren", re: /fren|abs|balata/i },
    { label: "Süspansiyon", re: /süspansiyon|amortis|tıkır/i },
    { label: "Klima", re: /klima|koltuk|yalıtım/i },
  ];
  for (const r of reviews) {
    const text = `${r.icerik} ${r.olumsuz.join(" ")}`.toLowerCase();
    for (const p of PATTERNS) {
      if (p.re.test(text)) {
        kategoriler[p.label] = (kategoriler[p.label] ?? 0) + 1;
      }
    }
  }

  // Üreticinin bilinen sorun listesi vs. kullanıcının raporladığı sorunlar
  const matched: string[] = [];
  if (info?.bilinen_sorunlar) {
    for (const s of info.bilinen_sorunlar) {
      const re = new RegExp(s.split(/\s+/)[0], "i");
      const hit = reviews.find((r) => re.test(r.icerik) || r.olumsuz.some((o) => re.test(o)));
      if (hit) matched.push(s);
    }
  }

  return NextResponse.json({
    marka,
    model,
    official: info,
    real: {
      total,
      avgPuan,
      negatif,
      pozitif,
      sikayetOrani,
      kategoriler: Object.entries(kategoriler)
        .sort((a, b) => b[1] - a[1])
        .map(([label, count]) => ({ label, count })),
      dogrulanan_uretici_sorunlari: matched,
    },
  });
}

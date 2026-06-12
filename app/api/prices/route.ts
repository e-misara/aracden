import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EUR_TO_TL, KUR_KAYNAGI, KUR_GUNCELLEME } from "@/lib/currency";

// GET /api/prices?marka=BMW&model=3 Serisi&yil=2019
// EUR cinsinden ortalama/min/max/medyan + EUR_TO_TL ile TL karşılığı.
export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const marka = sp.get("marka");
  const model = sp.get("model");
  const yilStr = sp.get("yil");
  const ulke = sp.get("ulke"); // opsiyonel: "DE", "TR"

  if (!marka || !model) {
    return NextResponse.json({ error: "marka ve model zorunlu." }, { status: 400 });
  }

  const where: { marka: string; model: string; yil?: number; ulke?: string } = {
    marka, model,
  };
  if (yilStr && /^\d{4}$/.test(yilStr)) where.yil = parseInt(yilStr);
  if (ulke) where.ulke = ulke;

  const rows = await prisma.vehiclePrice.findMany({
    where,
    select: { fiyatEur: true, km: true, motor: true, ulke: true, yil: true },
  });

  const count = rows.length;
  if (count === 0) {
    return NextResponse.json({
      marka, model, yil: where.yil ?? null, ulke: ulke ?? null,
      ilan_sayisi: 0,
      ortalama_eur: null, min_eur: null, max_eur: null, medyan_eur: null,
      ortalama_tl: null, min_tl: null, max_tl: null, medyan_tl: null,
      kur_eur_tl: EUR_TO_TL,
      kur_kaynagi: KUR_KAYNAGI,
      kur_guncelleme: KUR_GUNCELLEME,
      medyan_km: null,
      en_populer_motor: null,
    });
  }

  const fiyatlar = rows.map((r) => r.fiyatEur).sort((a, b) => a - b);
  const ortalama = fiyatlar.reduce((s, v) => s + v, 0) / count;
  const min = fiyatlar[0];
  const max = fiyatlar[fiyatlar.length - 1];
  const medyan = fiyatlar[Math.floor(count / 2)];

  const kms = rows.map((r) => r.km).filter((k): k is number => typeof k === "number").sort((a, b) => a - b);
  const medyanKm = kms.length > 0 ? kms[Math.floor(kms.length / 2)] : null;

  const motorCount: Record<string, number> = {};
  for (const r of rows) {
    if (r.motor) motorCount[r.motor] = (motorCount[r.motor] ?? 0) + 1;
  }
  const enPopulerMotor =
    Object.entries(motorCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return NextResponse.json({
    marka, model, yil: where.yil ?? null, ulke: ulke ?? null,
    ilan_sayisi: count,
    ortalama_eur: Math.round(ortalama),
    min_eur: Math.round(min),
    max_eur: Math.round(max),
    medyan_eur: Math.round(medyan),
    ortalama_tl: Math.round(ortalama * EUR_TO_TL),
    min_tl: Math.round(min * EUR_TO_TL),
    max_tl: Math.round(max * EUR_TO_TL),
    medyan_tl: Math.round(medyan * EUR_TO_TL),
    kur_eur_tl: EUR_TO_TL,
    kur_kaynagi: KUR_KAYNAGI,
    kur_guncelleme: KUR_GUNCELLEME,
    medyan_km: medyanKm,
    en_populer_motor: enPopulerMotor,
  });
}

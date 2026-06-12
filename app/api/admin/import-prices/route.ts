import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";
import { EUR_TO_TL } from "@/lib/currency";

// POST /api/admin/import-prices
// Body: { rows: Row[], adminKey: string }
// Korumalı endpoint — ADMIN_IMPORT_KEY env değişkeniyle eşleşmeli.
type Row = {
  marka: string;
  model: string;
  yil: number;
  km?: number | null;
  fiyat_tl?: number | null;
  fiyat_eur?: number | null;
  motor?: string | null;
  guc_hp?: number | null;
  vites?: string | null;
  yakit?: string | null;
  kasa?: string | null;
  renk?: string | null;
  sehir?: string | null;
  ulke?: string | null;
  kaynak?: string | null;
  ilan_url?: string | null;
  ilan_tarih?: string | null;
};

function syntheticUrl(r: Row): string {
  const key = [r.marka, r.model, r.yil, r.km ?? "", r.sehir ?? "", r.fiyat_tl ?? r.fiyat_eur ?? ""].join("|");
  const hash = createHash("sha1").update(key).digest("hex").slice(0, 12);
  const kaynak = (r.kaynak || "anon").replace(/\s+/g, "-");
  return `manual://${kaynak}/${r.ulke || "TR"}/${hash}`;
}

function eurFromRow(r: Row): number | null {
  if (typeof r.fiyat_eur === "number") return r.fiyat_eur;
  if (typeof r.fiyat_tl === "number") return Math.round(r.fiyat_tl / EUR_TO_TL);
  return null;
}

export async function POST(req: NextRequest) {
  let body: { rows?: Row[]; adminKey?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }

  const adminKey = process.env.ADMIN_IMPORT_KEY;
  if (!adminKey || body.adminKey !== adminKey) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!Array.isArray(body.rows)) {
    return NextResponse.json({ error: "rows alanı dizi olmalı." }, { status: 400 });
  }
  if (body.rows.length > 5000) {
    return NextResponse.json({ error: "Tek istekte en fazla 5000 satır." }, { status: 400 });
  }

  let inserted = 0;
  let skippedDup = 0;
  let skippedInvalid = 0;

  for (const r of body.rows) {
    if (!r.marka || !r.model || !r.yil) { skippedInvalid++; continue; }
    const fiyatEur = eurFromRow(r);
    if (fiyatEur == null || fiyatEur <= 0) { skippedInvalid++; continue; }
    try {
      await prisma.vehiclePrice.create({
        data: {
          marka: r.marka,
          model: r.model,
          yil: r.yil,
          km: r.km ?? null,
          fiyatEur,
          motor: r.motor ?? null,
          gucHp: r.guc_hp ?? null,
          vites: r.vites ?? null,
          yakit: r.yakit ?? null,
          kasa: r.kasa ?? null,
          renk: r.renk ?? null,
          sehir: r.sehir ?? null,
          ulke: r.ulke || "TR",
          kaynak: r.kaynak || "manual",
          ilanUrl: r.ilan_url || syntheticUrl(r),
          ilanTarih: r.ilan_tarih ?? null,
        },
      });
      inserted++;
    } catch (e: unknown) {
      if (e instanceof Error && /Unique constraint/i.test(e.message)) skippedDup++;
      else throw e;
    }
  }

  return NextResponse.json({
    ok: true,
    received: body.rows.length,
    inserted,
    skipped_duplicate: skippedDup,
    skipped_invalid: skippedInvalid,
  });
}

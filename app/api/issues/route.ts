import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { getInferredKategoriSlug } from "@/lib/vehicle-info";

// POST /api/issues — kullanıcı sorun bildirimi → Review (sentimentType=USER_ISSUE)
// Hem AddIssueForm payload'ını hem dış API çağrılarını (kategori/cozuldu/kasaTip)
// kabul eder.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  const marka = (body.marka as string | undefined)?.trim();
  const model = (body.model as string | undefined)?.trim();
  const issueCategory = ((body.issueCategory ?? body.kategori) as string | undefined)?.trim();
  const aciklama = (body.aciklama as string | undefined)?.trim();

  if (!marka || !model || !aciklama || !issueCategory) {
    return NextResponse.json(
      { error: "Eksik alan: marka, model, kategori/issueCategory, aciklama zorunlu." },
      { status: 400 },
    );
  }
  if (aciklama.length < 10) return NextResponse.json({ error: "Açıklama çok kısa." }, { status: 400 });
  if (aciklama.length > 4000) return NextResponse.json({ error: "Açıklama çok uzun." }, { status: 400 });

  // kategoriSlug verilmediyse marka/model'den infer et
  const kategoriSlug =
    ((body.kategoriSlug ?? body.kategoriSlugSlug) as string | undefined) ||
    getInferredKategoriSlug(marka, model) ||
    "otomobil";

  const yilRaw = body.yil;
  const yil = typeof yilRaw === "number" ? yilRaw : typeof yilRaw === "string" ? parseInt(yilRaw) || null : null;

  const km = body.km != null ? String(body.km) : "";
  const kasaTip = (body.kasaTip as string | undefined)?.trim() || null;

  // durum: hem "cozuldu" boolean'ı hem "durum" string'i kabul edilir
  const durum = body.cozuldu === true
    ? "Çözüldü"
    : body.cozuldu === false
      ? "Devam Ediyor"
      : ((body.durum as string | undefined) ?? "Devam Ediyor");

  const baslik = `${issueCategory} sorunu`;
  const trailer = [
    km ? `${km} km'de` : null,
    durum !== "Devam Ediyor" ? `Durum: ${durum}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const icerik = trailer ? `${aciklama}\n\n${trailer}` : aciklama;

  const review = await prisma.review.create({
    data: {
      id: randomUUID(),
      kategoriSlug,
      kullanici: "AraçDen Kullanıcısı",
      verified: false,
      marka,
      model,
      kasaTip,
      kasaKod: kasaTip,
      yil,
      puan: 2.0,
      baslik,
      icerik,
      olumlu: [],
      olumsuz: [issueCategory],
      sentimentType: "USER_ISSUE",
      tarih: new Date().toISOString().slice(0, 10),
    },
  });

  return NextResponse.json({ ok: true, id: review.id });
}

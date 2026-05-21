import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

// POST /api/issues — Kullanıcının bildirdiği sorun Review olarak saklanır.
export async function POST(req: NextRequest) {
  let body: {
    kategoriSlug?: string;
    marka?: string;
    model?: string;
    yil?: number;
    issueCategory?: string;
    km?: string;
    aciklama?: string;
    durum?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  const { kategoriSlug, marka, model, yil, issueCategory, km, aciklama, durum } = body;

  if (!kategoriSlug || !marka || !model || !aciklama || !issueCategory) {
    return NextResponse.json({ error: "Eksik alan." }, { status: 400 });
  }
  if (aciklama.length < 10) {
    return NextResponse.json({ error: "Açıklama çok kısa." }, { status: 400 });
  }
  if (aciklama.length > 4000) {
    return NextResponse.json({ error: "Açıklama çok uzun." }, { status: 400 });
  }

  const baslik = `${issueCategory} sorunu`;
  const trailer = [
    km ? `${km} km'de` : null,
    durum && durum !== "Devam Ediyor" ? `Durum: ${durum}` : null,
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
      yil: typeof yil === "number" ? yil : null,
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

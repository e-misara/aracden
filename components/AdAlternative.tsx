"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Brand = {
  marka: string;
  totalReview: number;
  avgPuan: number | null;
  sikayetOrani: number;
  kategori: string | null;
  enCokModel: string | null;
};

interface Props {
  marka: string;           // şikayet edilen marka
  problem?: string;        // örn "DSG Şanzıman"
  kategori?: string;       // otomobil, arazi-suv vb.
}

/**
 * Şikayet edilen marka için aynı kategoride yüksek puanlı alternatif öner.
 * Reklam alanı olarak işaretli (data-ad-slot="kronik-alternative").
 */
export default function AdAlternative({ marka, problem, kategori }: Props) {
  const [alt, setAlt] = useState<Brand | null>(null);

  useEffect(() => {
    const sp = new URLSearchParams({ sort: "avgPuan", limit: "20" });
    if (kategori) sp.set("kategori", kategori);
    fetch(`/api/brands?${sp}`)
      .then((r) => r.json())
      .then((d) => {
        const candidates: Brand[] = (d.brands ?? []).filter(
          (b: Brand) =>
            b.marka !== marka &&
            (b.avgPuan ?? 0) >= 4 &&
            b.totalReview >= 30 &&
            b.sikayetOrani < 0.4
        );
        if (candidates[0]) setAlt(candidates[0]);
      })
      .catch(() => {});
  }, [marka, kategori]);

  if (!alt) return null;

  return (
    <div
      data-ad-slot="kronik-alternative"
      className="my-4 bg-gradient-to-br from-[#0090ff]/10 to-transparent border border-[#0090ff]/30 rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono-num text-[#0090ff] uppercase tracking-widest">
          💡 ALTERNATİF ÖNERİ
        </span>
        <span className="text-[9px] font-mono-num text-[#4a4a5e] uppercase">Sponsorlu</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#0090ff]/20 border border-[#0090ff]/40 flex items-center justify-center text-xl flex-shrink-0">
          🏆
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-base">{alt.marka}</div>
          <div className="text-xs text-[#8b8b9e]">
            {problem ? `${problem} sorunu yaşıyorsan` : "Aynı segmentte"} —{" "}
            <span className="text-[#0090ff]">{alt.marka}</span> ortalama{" "}
            <span className="font-mono-num text-[#ffd60a]">★{(alt.avgPuan ?? 0).toFixed(1)}</span>{" "}
            puan, sadece <span className="font-mono-num text-[#00d68f]">%{(alt.sikayetOrani * 100).toFixed(0)}</span> şikayet.
          </div>
          {alt.enCokModel && (
            <div className="text-[10px] font-mono-num text-[#4a4a5e] mt-1">
              ↳ En çok yorumlanan: {alt.enCokModel}
            </div>
          )}
        </div>
        <Link
          href={`/${alt.kategori ?? "otomobil"}/${encodeURIComponent(alt.marka)}`}
          className="flex-shrink-0 bg-[#0090ff] hover:bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-md transition-colors"
        >
          İncele →
        </Link>
      </div>
    </div>
  );
}

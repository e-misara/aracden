"use client";

import { useEffect, useState } from "react";

type Brand = {
  marka: string;
  totalReview: number;
  avgPuan: number | null;
  sikayetOrani: number;
  enCokModel: string | null;
};

const TIP_COLORS = ["text-[#ff2d55]", "text-[#ffd60a]", "text-[#00d68f]"];

export default function Ticker() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch("/api/brands?limit=25&sort=totalReview")
      .then((r) => r.json())
      .then((d) => setBrands(d.brands ?? []))
      .catch(() => {});
  }, []);

  if (brands.length === 0) {
    return (
      <div className="w-full bg-[#12121a] border-b border-[#1e1e2e] h-9 flex items-center px-4 text-xs text-[#4a4a5e] font-mono-num">
        ● VERİ YÜKLENİYOR…
      </div>
    );
  }

  // Çift kopya — kesintisiz akış için
  const items = [...brands, ...brands];

  return (
    <div className="w-full bg-[#12121a] border-b border-[#1e1e2e] overflow-hidden">
      <div className="ticker-track py-2.5 text-xs">
        {items.map((b, i) => {
          const puan = b.avgPuan ?? 0;
          const sikayet = b.sikayetOrani * 100;
          const sikayetColor =
            sikayet > 50 ? "text-[#ff2d55]" : sikayet > 30 ? "text-[#ffd60a]" : "text-[#00d68f]";
          const dotColor =
            puan >= 4 ? "text-[#00d68f]" : puan >= 3 ? "text-[#ffd60a]" : "text-[#ff2d55]";
          return (
            <span key={i} className="inline-flex items-center gap-2 px-5 border-l border-[#1e1e2e] first:border-l-0">
              <span className={`text-[10px] ${dotColor}`}>●</span>
              <span className="font-semibold uppercase tracking-wide text-white">{b.marka}</span>
              {b.enCokModel && <span className="text-[#8b8b9e]">{b.enCokModel}</span>}
              <span className="font-mono-num text-[#8b8b9e]">{b.totalReview.toLocaleString("tr-TR")}</span>
              <span className="font-mono-num text-[#ffd60a]">★ {puan.toFixed(1)}</span>
              <span className={`font-mono-num ${sikayetColor}`}>%{sikayet.toFixed(0)}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

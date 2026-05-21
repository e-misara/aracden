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
  title: string;
  emoji: string;
  sort: "totalReview" | "avgPuan" | "sikayetOrani";
  filter?: "elektrik" | "yerli" | "popular";
  minReview?: number;
}

export default function EnlerHorizontal({ title, emoji, sort, filter, minReview = 30 }: Props) {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch(`/api/brands?sort=${sort}&limit=30`)
      .then((r) => r.json())
      .then((d) => {
        let arr: Brand[] = (d.brands ?? []).filter((b: Brand) => b.totalReview >= minReview);
        if (filter === "elektrik") {
          arr = arr.filter((b) => ["Tesla", "BYD", "TOGG", "BMW", "Audi", "Mercedes-Benz", "Volkswagen"].includes(b.marka));
        }
        if (filter === "yerli") {
          arr = arr.filter((b) => ["Fiat", "Dacia", "TOGG", "Renault"].includes(b.marka));
        }
        setBrands(arr.slice(0, 10));
      });
  }, [sort, filter, minReview]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span>{title}</span>
        </h3>
        <Link href="/enler" className="text-xs text-[#ff6b00] hover:underline whitespace-nowrap">
          Tümü →
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "thin" }}>
        {brands.length === 0
          ? [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-40 h-32 bg-[#12121a] border border-[#1e1e2e] rounded-xl animate-pulse" />
            ))
          : brands.map((b, i) => {
              const puan = b.avgPuan ?? 0;
              const sikayet = b.sikayetOrani * 100;
              const sikayetColor = sikayet > 50 ? "text-[#ff2d55]" : sikayet > 30 ? "text-[#ffd60a]" : "text-[#00d68f]";
              return (
                <Link
                  key={b.marka}
                  href={`/${b.kategori ?? "otomobil"}/${encodeURIComponent(b.marka)}`}
                  className="flex-shrink-0 w-40 bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-xl p-3 transition-colors group"
                >
                  <div className="text-[10px] font-mono-num text-[#4a4a5e] mb-1">#{i + 1}</div>
                  <div className="font-semibold text-white group-hover:text-[#ff6b00] transition-colors truncate text-sm">
                    {b.marka}
                  </div>
                  {b.enCokModel && (
                    <div className="text-[10px] text-[#8b8b9e] truncate mt-0.5">↳ {b.enCokModel}</div>
                  )}
                  <div className="mt-2 pt-2 border-t border-[#1e1e2e] flex items-center justify-between text-[10px]">
                    <span className="font-mono-num text-[#ffd60a]">★{puan.toFixed(1)}</span>
                    <span className={`font-mono-num ${sikayetColor}`}>%{sikayet.toFixed(0)}</span>
                  </div>
                  <div className="text-[10px] font-mono-num text-[#4a4a5e] mt-1 text-center">
                    {b.totalReview.toLocaleString("tr-TR")} review
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

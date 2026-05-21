"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Brand = {
  marka: string;
  totalReview: number;
  avgPuan: number | null;
  sikayetOrani: number;
  sikayetSayisi: number;
  kategori: string | null;
  enCokModel: string | null;
};

type TrendItem = {
  emoji: string;
  text: string;
  url: string;
  color: string;
};

/**
 * "Bu Hafta Konuşulanlar" — DB istatistiklerinden otomatik üretilen 4 trend.
 */
export default function WeeklyTrending() {
  const [items, setItems] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // En çok şikayet + en yüksek puanlı + en çok review markaları
    Promise.all([
      fetch("/api/brands?sort=sikayetOrani&limit=15").then((r) => r.json()),
      fetch("/api/brands?sort=avgPuan&limit=15").then((r) => r.json()),
      fetch("/api/brands?sort=totalReview&limit=15").then((r) => r.json()),
    ])
      .then(([sikayet, puan, pop]) => {
        const sikayetArr: Brand[] = (sikayet.brands ?? []).filter((b: Brand) => b.totalReview >= 50);
        const puanArr: Brand[] = (puan.brands ?? []).filter((b: Brand) => b.totalReview >= 100);
        const popArr: Brand[] = pop.brands ?? [];

        const trends: TrendItem[] = [];
        const used = new Set<string>();
        const add = (b: Brand | undefined, t: TrendItem | null | undefined) => {
          if (!b || !t || used.has(b.marka)) return;
          used.add(b.marka);
          trends.push(t);
        };

        const en1 = sikayetArr[0];
        add(en1, en1 && {
          emoji: "😤",
          text: `${en1.marka}${en1.enCokModel ? ` ${en1.enCokModel}` : ""} %${(en1.sikayetOrani * 100).toFixed(0)} şikayet oranıyla gündemde`,
          url: `/${en1.kategori ?? "otomobil"}/${encodeURIComponent(en1.marka)}`,
          color: "#ff2d55",
        });

        const en2 = puanArr[0];
        add(en2, en2 && {
          emoji: "🏆",
          text: `${en2.marka} ★${(en2.avgPuan ?? 0).toFixed(1)} ile zirvede — fiyat/performans lideri`,
          url: `/${en2.kategori ?? "otomobil"}/${encodeURIComponent(en2.marka)}`,
          color: "#ffd60a",
        });

        // En çok şikayet edilen elektrikli (Tesla, BYD vs)
        const elektrik = sikayetArr.find((b) => ["Tesla", "BYD", "TOGG"].includes(b.marka));
        add(elektrik, elektrik && {
          emoji: "⚡",
          text: `${elektrik.marka} Türkiye'nin en şikayetli elektrikli — ${elektrik.sikayetSayisi} negatif yorum`,
          url: `/${elektrik.kategori ?? "otomobil"}/${encodeURIComponent(elektrik.marka)}`,
          color: "#0090ff",
        });

        // Türk ikonu
        const yerli =
          popArr.find((b) => b.marka === "Fiat") ||
          popArr.find((b) => b.marka === "Dacia") ||
          popArr.find((b) => b.marka === "TOGG");
        add(yerli, yerli && {
          emoji: yerli.marka === "Fiat" ? "🇹🇷" : yerli.marka === "TOGG" ? "🇹🇷" : "💪",
          text: `${yerli.marka}${yerli.enCokModel ? ` ${yerli.enCokModel}` : ""} ${
            yerli.marka === "Dacia" ? "yine zirvede" : yerli.marka === "Fiat" ? "Türkiye'nin favorisi olmaya devam" : "yerli üretici izleniyor"
          }`,
          url: `/${yerli.kategori ?? "otomobil"}/${encodeURIComponent(yerli.marka)}`,
          color: "#ff6b00",
        });

        // Eksik kaldıysa popüler ile doldur
        for (const b of popArr) {
          if (trends.length >= 4) break;
          if (used.has(b.marka)) continue;
          trends.push({
            emoji: "📈",
            text: `${b.marka}${b.enCokModel ? ` ${b.enCokModel}` : ""} ${b.totalReview.toLocaleString("tr-TR")} review ile öne çıkıyor`,
            url: `/${b.kategori ?? "otomobil"}/${encodeURIComponent(b.marka)}`,
            color: "#8b8b9e",
          });
        }

        setItems(trends.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#1e1e2e] flex items-center justify-between">
        <span className="font-semibold text-white flex items-center gap-2">
          🔥 <span>Bu Hafta Konuşulanlar</span>
        </span>
        <span className="text-[10px] font-mono-num text-[#4a4a5e]">canlı</span>
      </div>
      <div className="divide-y divide-[#1e1e2e]/50">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="px-4 py-3 h-14 bg-[#12121a] animate-pulse" />
          ))
        ) : items.length === 0 ? (
          <div className="px-4 py-6 text-xs text-center text-[#4a4a5e]">Henüz veri yok.</div>
        ) : (
          items.map((t, i) => (
            <Link
              key={i}
              href={t.url}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a26] transition-colors group"
            >
              <span className="text-xl flex-shrink-0">{t.emoji}</span>
              <span className="text-sm text-white group-hover:text-[#ff6b00] transition-colors">
                {t.text}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

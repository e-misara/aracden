"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";

type Brand = {
  marka: string;
  totalReview: number;
  sikayetOrani: number;
  sikayetSayisi: number;
  avgPuan: number | null;
  kategori: string | null;
  enCokModel: string | null;
};

type HashtagCount = {
  tag: string;
  label: string;
  emoji: string;
  color: string;
  count: number;
  sentiment: string;
};

type Review = {
  id: string;
  marka: string;
  model: string;
  baslik: string;
  icerik: string;
  olumsuz: string[];
  puan: number;
  kullanici: string;
  tarih: string;
};

// Anahtar kelime → kategorize sorun
const PROBLEM_BUCKETS = [
  { label: "Şanzıman / DSG", patterns: [/dsg/i, /şanzıman/i, /vites/i] },
  { label: "Motor / Yağ", patterns: [/motor[\s-]?yağ/i, /yağ\s+yak/i, /motor\s+arıza/i] },
  { label: "Servis / Garanti", patterns: [/servis/i, /garanti/i, /yetkili/i] },
  { label: "Yakıt Tüketimi", patterns: [/yakıt/i, /tüket/i, /lpg/i] },
  { label: "Elektrik / Ekran", patterns: [/ekran/i, /elektrik/i, /multimedya/i, /donma/i] },
  { label: "Fren / ABS", patterns: [/fren/i, /\babs\b/i, /balata/i] },
  { label: "Süspansiyon", patterns: [/süspansiyon/i, /amortis/i, /tıkır/i, /titreşim/i] },
  { label: "Klima / Konfor", patterns: [/klima/i, /koltuk/i, /yalıtım/i, /sızdır/i] },
];

function categorizeProblems(reviews: Review[]) {
  const counts: Record<string, number> = {};
  for (const r of reviews) {
    const text = `${r.baslik} ${r.icerik} ${r.olumsuz.join(" ")}`.toLowerCase();
    for (const bucket of PROBLEM_BUCKETS) {
      if (bucket.patterns.some((p) => p.test(text))) {
        counts[bucket.label] = (counts[bucket.label] ?? 0) + 1;
      }
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export default function KronikPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [topBrands, setTopBrands] = useState<Brand[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<HashtagCount[]>([]);

  useEffect(() => {
    fetch("/api/brands?sort=sikayetOrani&limit=30")
      .then((r) => r.json())
      .then((d) => {
        const arr: Brand[] = (d.brands ?? []).filter((b: Brand) => b.totalReview >= 50);
        setTopBrands(arr.slice(0, 30));
        if (arr[0]) setSelectedBrand(arr[0].marka);
      });
    fetch("/api/hashtags")
      .then((r) => r.json())
      .then((d) => setHashtags(d.hashtags ?? []));
  }, []);

  useEffect(() => {
    if (!selectedBrand) return;
    setLoading(true);
    // Sadece şikayet review'larını çek (puan < 2.5 olanlar)
    fetch(`/api/reviews?marka=${encodeURIComponent(selectedBrand)}&limit=50`)
      .then((r) => r.json())
      .then((d) => {
        const negative = (d.reviews ?? []).filter((r: Review) => r.puan <= 2.5);
        setReviews(negative);
      })
      .finally(() => setLoading(false));
  }, [selectedBrand]);

  const problems = categorizeProblems(reviews);
  const maxCount = problems[0]?.[1] ?? 1;
  const selectedBrandData = topBrands.find((b) => b.marka === selectedBrand);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Ticker />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono-num text-[#ff2d55] uppercase tracking-[0.25em]">
            <span className="w-2 h-2 rounded-full bg-[#ff2d55] animate-pulse"></span>
            KRONİK SORUN RADARI · CANLI
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            🚨 Markaların <span className="text-[#ff2d55]">Karanlık Yüzü</span>
          </h1>
          <p className="text-[#8b8b9e] max-w-2xl">
            Düşük puanlı yorumlardan otomatik çıkarılan sorun kategorileri.
            Marka seçin, dert haritasını görün.
          </p>
        </div>

        {/* Hashtag bulutu */}
        {hashtags.length > 0 && (
          <div className="mb-8 bg-[#12121a] border border-[#1e1e2e] rounded-md p-5">
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-3">
              EN POPÜLER HASHTAG'LER
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.slice(0, 20).map((h) => {
                const maxCount = hashtags[0]?.count ?? 1;
                const scale = Math.max(0.85, Math.min(1.4, 0.85 + (h.count / maxCount) * 0.6));
                return (
                  <span
                    key={h.tag}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs"
                    style={{
                      borderColor: `${h.color}50`,
                      backgroundColor: `${h.color}15`,
                      color: h.color,
                      fontSize: `${scale * 0.75}rem`,
                    }}
                  >
                    <span>{h.emoji}</span>
                    <span className="font-semibold">{h.label}</span>
                    <span className="font-mono-num opacity-70">{h.count}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Brand selector */}
          <div className="lg:col-span-4">
            <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-4">
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-3">
                EN ŞİKAYET EDİLEN 30 MARKA
              </div>
              <div className="space-y-1 max-h-[600px] overflow-y-auto">
                {topBrands.map((b) => {
                  const active = b.marka === selectedBrand;
                  const sikayet = b.sikayetOrani * 100;
                  return (
                    <button
                      key={b.marka}
                      onClick={() => setSelectedBrand(b.marka)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center justify-between ${
                        active
                          ? "bg-[#ff2d55]/10 border border-[#ff2d55]/30 text-white"
                          : "hover:bg-[#1a1a26] text-[#8b8b9e] hover:text-white"
                      }`}
                    >
                      <span className="font-semibold truncate">{b.marka}</span>
                      <span className="font-mono-num text-xs text-[#ff2d55]">
                        %{sikayet.toFixed(0)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Radar / problem chart */}
          <div className="lg:col-span-8">
            <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-6">
              {selectedBrand ? (
                <>
                  <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#1e1e2e]">
                    <div>
                      <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-1">
                        SORUN DAĞILIMI
                      </div>
                      <h2 className="text-2xl font-bold text-white">{selectedBrand}</h2>
                      {selectedBrandData && (
                        <div className="text-xs text-[#8b8b9e] mt-1 font-mono-num">
                          {selectedBrandData.totalReview.toLocaleString("tr-TR")} review · ★{(selectedBrandData.avgPuan ?? 0).toFixed(1)} · {reviews.length} negatif yorum
                        </div>
                      )}
                    </div>
                    {selectedBrandData?.enCokModel && (
                      <span className="text-xs text-[#8b8b9e] font-mono-num">
                        ↳ {selectedBrandData.enCokModel}
                      </span>
                    )}
                  </div>

                  {loading ? (
                    <div className="text-center py-12 text-[#4a4a5e] text-sm">Yükleniyor…</div>
                  ) : problems.length === 0 ? (
                    <div className="text-center py-12 text-[#4a4a5e] text-sm">
                      Bu marka için kategorize edilebilir sorun bulunamadı.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {problems.map(([label, count]) => {
                        const pct = (count / maxCount) * 100;
                        const color =
                          pct > 70 ? "#ff2d55" : pct > 40 ? "#ff6b00" : "#ffd60a";
                        return (
                          <div key={label}>
                            <div className="flex items-center justify-between mb-1 text-xs">
                              <span className="text-white font-semibold">{label}</span>
                              <span className="font-mono-num text-[#8b8b9e]">
                                {count} mention
                              </span>
                            </div>
                            <div className="h-2.5 bg-[#1a1a26] rounded-full overflow-hidden">
                              <div
                                className="h-full transition-all duration-500"
                                style={{ width: `${pct}%`, backgroundColor: color }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Örnek şikayet review'ları */}
                  {reviews.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[#1e1e2e]">
                      <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-3">
                        SON 3 ŞİKAYET ÖRNEĞİ
                      </div>
                      <div className="space-y-2">
                        {reviews.slice(0, 3).map((r) => (
                          <div key={r.id} className="bg-[#0a0a0f] border border-[#1e1e2e] rounded p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-white">
                                {r.marka} {r.model}
                              </span>
                              <span className="text-[10px] font-mono-num text-[#ff2d55]">★{r.puan.toFixed(1)}</span>
                            </div>
                            <p className="text-xs text-[#8b8b9e] line-clamp-2">{r.icerik || r.baslik}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 text-[#4a4a5e]">
                  Sol panelden marka seçin.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

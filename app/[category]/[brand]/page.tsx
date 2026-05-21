"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import AdSlot from "@/components/AdSlot";
import { slugToCategory, CATEGORY_LABEL, CATEGORY_EMOJI } from "@/lib/categories";
import { getVehicleImage } from "@/lib/vehicle-images";

type ModelStat = {
  model: string;
  total: number;
  avgPuan: number | null;
  negatif: number;
  pozitif: number;
  sikayetOrani: number;
};

const SORT_OPTIONS = [
  { value: "total", label: "EN ÇOK YORUM" },
  { value: "puan", label: "EN İYİ PUAN" },
  { value: "sikayet", label: "EN ÇOK ŞİKAYET" },
];

export default function BrandPage() {
  const { category: catSlug, brand: brandParam } = useParams<{ category: string; brand: string }>();
  const brand = decodeURIComponent(brandParam);
  const categoryKey = slugToCategory(catSlug);

  const [models, setModels] = useState<ModelStat[]>([]);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("total");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryKey) return;
    setLoading(true);
    fetch(`/api/brand-models/${encodeURIComponent(brand)}?kategori=${catSlug}`)
      .then((r) => r.json())
      .then((d) => {
        setModels(d.models ?? []);
        setTotal(d.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [categoryKey, brand, catSlug]);

  if (!categoryKey) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-[#8b8b9e]">
          Kategori bulunamadı.
        </div>
      </div>
    );
  }

  const sorted = [...models].sort((a, b) => {
    if (sort === "puan") return (b.avgPuan ?? 0) - (a.avgPuan ?? 0);
    if (sort === "sikayet") return b.sikayetOrani - a.sikayetOrani;
    return b.total - a.total;
  });

  const avgPuanBrand = models.length > 0
    ? models.reduce((s, m) => s + (m.avgPuan ?? 0) * m.total, 0) / Math.max(1, models.reduce((s, m) => s + m.total, 0))
    : 0;
  const totalNegatif = models.reduce((s, m) => s + m.negatif, 0);
  const sikayetOraniBrand = total > 0 ? (totalNegatif / total) * 100 : 0;

  return (
    <div className="min-h-screen">
      <Navbar />
      <Ticker />

      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#4a4a5e] flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-[#ff6b00]">Ana Sayfa</Link>
          <span>›</span>
          <Link href={`/${catSlug}`} className="hover:text-[#ff6b00]">
            {CATEGORY_EMOJI[categoryKey]} {CATEGORY_LABEL[categoryKey]}
          </Link>
          <span>›</span>
          <span className="text-white font-semibold">{brand}</span>
        </nav>

        {/* Brand header */}
        <div className="mb-6">
          <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">
            {CATEGORY_LABEL[categoryKey]} · MARKA
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{brand}</h1>
          <div className="text-sm text-[#8b8b9e] mt-2 font-mono-num">
            {total.toLocaleString("tr-TR")} review · {models.length} model
          </div>
        </div>

        {/* Brand score card */}
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-5 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">PUAN ORT.</div>
              <div className="text-3xl font-mono-num font-semibold text-[#ffd60a]">
                ★ {avgPuanBrand.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">ŞİKAYET</div>
              <div
                className={`text-3xl font-mono-num font-semibold ${
                  sikayetOraniBrand > 50 ? "text-[#ff2d55]" : sikayetOraniBrand > 30 ? "text-[#ffd60a]" : "text-[#00d68f]"
                }`}
              >
                %{sikayetOraniBrand.toFixed(0)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">MODEL</div>
              <div className="text-3xl font-mono-num font-semibold text-white">{models.length}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">YORUM</div>
              <div className="text-3xl font-mono-num font-semibold text-white">
                {total.toLocaleString("tr-TR")}
              </div>
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest">
            MODELLER ({models.length})
          </div>
          <div className="flex gap-1">
            {SORT_OPTIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => setSort(s.value)}
                className={`text-[10px] font-mono-num px-3 py-1.5 rounded border transition-colors ${
                  sort === s.value
                    ? "bg-[#ff6b00] border-[#ff6b00] text-white"
                    : "bg-[#0a0a0f] border-[#1e1e2e] text-[#8b8b9e] hover:border-[#ff6b00]/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-44 bg-[#12121a] rounded-md animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-12 text-center text-[#4a4a5e]">
            Bu marka için bu kategoride henüz veri yok.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sorted.map((m) => {
              const sik = m.sikayetOrani;
              const sikColor = sik > 50 ? "#ff2d55" : sik > 30 ? "#ffd60a" : "#00d68f";
              return (
                <Link
                  key={m.model}
                  href={`/${catSlug}/${encodeURIComponent(brand)}/${encodeURIComponent(m.model)}`}
                  className="bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-md overflow-hidden transition-colors group"
                >
                  <div className="aspect-video bg-[#0a0a0f] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getVehicleImage(brand, m.model, "Sedan", catSlug)}
                      alt={`${brand} ${m.model}`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="font-bold text-white text-base mb-2">{m.model}</div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono-num">
                      <div>
                        <div className="text-[#4a4a5e] uppercase">PUAN</div>
                        <div className="text-[#ffd60a] text-sm">★ {(m.avgPuan ?? 0).toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-[#4a4a5e] uppercase">ŞİKAYET</div>
                        <div className="text-sm" style={{ color: sikColor }}>%{sik.toFixed(0)}</div>
                      </div>
                      <div>
                        <div className="text-[#4a4a5e] uppercase">YORUM</div>
                        <div className="text-white text-sm">{m.total.toLocaleString("tr-TR")}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Ad bar */}
        <div className="mt-8">
          <AdSlot slot={`brand-${brand}-banner`} size="728x90" label="REKLAM" />
        </div>
      </section>
    </div>
  );
}

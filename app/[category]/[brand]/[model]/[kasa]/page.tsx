"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import ReviewSection from "@/components/ReviewSection";
import AdSlot from "@/components/AdSlot";
import { slugToCategory, CATEGORY_LABEL, CATEGORY_EMOJI } from "@/lib/categories";

type YilStat = { yil: number; total: number; avgPuan: number | null; sikayetOrani: number };

export default function KasaPage() {
  const { category: catSlug, brand: brandParam, model: modelParam, kasa: kasaParam } =
    useParams<{ category: string; brand: string; model: string; kasa: string }>();
  const brand = decodeURIComponent(brandParam);
  const model = decodeURIComponent(modelParam);
  const kasaSlug = decodeURIComponent(kasaParam);
  const categoryKey = slugToCategory(catSlug);

  const [resolvedKasa, setResolvedKasa] = useState<string | null>(null);
  const [resolvedKod, setResolvedKod] = useState<string | null>(null);
  const [yillar, setYillar] = useState<YilStat[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [avgPuan, setAvgPuan] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/model-kasa-yillar/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(kasaSlug)}`)
      .then((r) => r.json())
      .then((d) => {
        setResolvedKasa(d.tip ?? d.kasa);
        setResolvedKod(d.kod ?? d.kasa);
        setYillar(d.yillar ?? []);
        const t = (d.yillar ?? []).reduce((s: number, y: YilStat) => s + y.total, 0);
        setTotal(t);
        if (t > 0) {
          const weighted = (d.yillar ?? []).reduce(
            (s: number, y: YilStat) => s + (y.avgPuan ?? 0) * y.total,
            0,
          );
          setAvgPuan(weighted / t);
        }
      })
      .finally(() => setLoaded(true));
  }, [brand, model, kasaSlug]);

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

  const titleLabel = resolvedKod ?? kasaSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const tipLabel = resolvedKasa;
  const hasKod = resolvedKod && resolvedKasa && resolvedKod !== resolvedKasa;

  return (
    <div className="min-h-screen">
      <Navbar />
      <Ticker />

      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#4a4a5e] flex items-center gap-2 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#ff6b00]">Ana Sayfa</Link>
          <span>›</span>
          <Link href={`/${catSlug}`} className="hover:text-[#ff6b00]">
            {CATEGORY_EMOJI[categoryKey]} {CATEGORY_LABEL[categoryKey]}
          </Link>
          <span>›</span>
          <Link href={`/${catSlug}/${encodeURIComponent(brand)}`} className="hover:text-[#ff6b00]">{brand}</Link>
          <span>›</span>
          <Link href={`/${catSlug}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}`} className="hover:text-[#ff6b00]">{model}</Link>
          <span>›</span>
          <span className="text-white font-semibold">{titleLabel}</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">
            {brand} · {model} · KASA
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-mono-num">{titleLabel}</h1>
          {hasKod && (
            <div className="text-base text-[#8b8b9e] mt-1">{tipLabel} kasası</div>
          )}
          <div className="text-sm text-[#8b8b9e] mt-2 font-mono-num">
            {loaded
              ? `${(total ?? 0).toLocaleString("tr-TR")} review · ${yillar.length} yıl`
              : "yükleniyor…"}
          </div>
        </div>

        {/* Score */}
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-5 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase mb-1">PUAN</div>
              <div className="text-3xl font-mono-num font-semibold text-[#ffd60a]">
                {loaded && avgPuan != null ? `★ ${avgPuan.toFixed(1)}` : "—"}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase mb-1">REVIEW</div>
              <div className="text-3xl font-mono-num font-semibold text-white">
                {loaded ? (total ?? 0).toLocaleString("tr-TR") : "—"}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase mb-1">MODEL YILI</div>
              <div className="text-3xl font-mono-num font-semibold text-white">
                {yillar.length > 0 ? `${yillar[yillar.length - 1].yil}-${yillar[0].yil}` : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Yıl grid */}
        {yillar.length > 0 && (
          <div className="mb-6">
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">
              MODEL YILLARI ({yillar.length})
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {yillar.map((y) => {
                const sik = y.sikayetOrani;
                const color = sik > 50 ? "#ff2d55" : sik > 30 ? "#ffd60a" : "#00d68f";
                return (
                  <Link
                    key={y.yil}
                    href={`/${catSlug}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(kasaSlug)}/${y.yil}`}
                    className="bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-md p-3 text-center transition-colors"
                  >
                    <div className="font-mono-num font-bold text-white text-lg">{y.yil}</div>
                    <div className="text-[10px] font-mono-num text-[#8b8b9e]">
                      ★ {(y.avgPuan ?? 0).toFixed(1)}
                    </div>
                    <div className="text-[10px] font-mono-num" style={{ color }}>
                      %{sik.toFixed(0)} şikayet
                    </div>
                    <div className="text-[10px] font-mono-num text-[#4a4a5e]">{y.total} review</div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ReviewSection
              kategoriSlug={catSlug}
              marka={brand}
              model={model}
              kasaKod={resolvedKod ?? titleLabel}
              yil={0}
              filterKasaTip={resolvedKasa ?? undefined}
            />
          </div>
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32">
              <AdSlot slot={`kasa-${brand}-${model}-${kasaSlug}`} size="300x600" label="YETKİLİ BAYİ" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

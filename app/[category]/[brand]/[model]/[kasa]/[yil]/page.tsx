"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import ReviewSection from "@/components/ReviewSection";
import AdSlot from "@/components/AdSlot";
import { slugToCategory, CATEGORY_LABEL, CATEGORY_EMOJI } from "@/lib/categories";

export default function YilPage() {
  const { category: catSlug, brand: bRaw, model: mRaw, kasa: kRaw, yil: yRaw } =
    useParams<{ category: string; brand: string; model: string; kasa: string; yil: string }>();
  const brand = decodeURIComponent(bRaw);
  const model = decodeURIComponent(mRaw);
  const kasaSlug = decodeURIComponent(kRaw);
  const yil = parseInt(yRaw, 10);
  const categoryKey = slugToCategory(catSlug);

  const [resolvedKasa, setResolvedKasa] = useState<string | null>(null);
  const [resolvedKod, setResolvedKod] = useState<string | null>(null);
  const [stats, setStats] = useState<{ total: number; avgPuan: number | null; sikayetOrani: number }>({
    total: 0,
    avgPuan: null,
    sikayetOrani: 0,
  });

  useEffect(() => {
    fetch(`/api/model-kasa-yillar/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(kasaSlug)}`)
      .then((r) => r.json())
      .then((d) => {
        setResolvedKasa(d.tip ?? d.kasa);
        setResolvedKod(d.kod ?? d.kasa);
        const y = (d.yillar ?? []).find((x: { yil: number }) => x.yil === yil);
        if (y) setStats({ total: y.total, avgPuan: y.avgPuan, sikayetOrani: y.sikayetOrani });
      });
  }, [brand, model, kasaSlug, yil]);

  if (!categoryKey || isNaN(yil)) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-[#8b8b9e]">
          Sayfa bulunamadı.
        </div>
      </div>
    );
  }

  const kasaLabel = resolvedKod ?? kasaSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const sikColor =
    stats.sikayetOrani > 50 ? "#ff2d55" : stats.sikayetOrani > 30 ? "#ffd60a" : "#00d68f";

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
          <Link href={`/${catSlug}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(kasaSlug)}`} className="hover:text-[#ff6b00]">{kasaLabel}</Link>
          <span>›</span>
          <span className="text-white font-semibold">{yil}</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">
            {brand} · {model} · {kasaLabel} · MODEL YILI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-mono-num">{yil}</h1>
          <div className="text-sm text-[#8b8b9e] mt-2 font-mono-num">
            {stats.total.toLocaleString("tr-TR")} review
          </div>
        </div>

        {/* Score */}
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-5 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase mb-1">PUAN</div>
              <div className="text-3xl font-mono-num font-semibold text-[#ffd60a]">
                ★ {(stats.avgPuan ?? 0).toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase mb-1">ŞİKAYET</div>
              <div className="text-3xl font-mono-num font-semibold" style={{ color: sikColor }}>
                %{stats.sikayetOrani.toFixed(0)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase mb-1">REVIEW</div>
              <div className="text-3xl font-mono-num font-semibold text-white">
                {stats.total.toLocaleString("tr-TR")}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ReviewSection
              kategoriSlug={catSlug}
              marka={brand}
              model={model}
              kasaKod={resolvedKasa ?? kasaLabel}
              yil={yil}
              filterKasaTip={resolvedKasa ?? undefined}
              filterYil={yil}
            />
          </div>
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32">
              <AdSlot slot={`yil-${brand}-${model}-${yil}`} size="300x600" label="2. EL İLANI" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

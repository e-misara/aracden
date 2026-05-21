"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import ReviewSection from "@/components/ReviewSection";
import AdSlot from "@/components/AdSlot";
import ShareButton from "@/components/ShareButton";
import ManufacturerCard from "@/components/ManufacturerCard";
import AddIssueForm from "@/components/AddIssueForm";
import { slugToCategory, CATEGORY_LABEL, CATEGORY_EMOJI } from "@/lib/categories";
import { getVehicleImage } from "@/lib/vehicle-images";
import { getPersonality, TIP_RENKLERI } from "@/lib/vehicle-personalities";
import { getVehicleInfo } from "@/lib/vehicle-info";
import { getModelKasalari } from "@/lib/vehicles-data";

type ApiReview = {
  id: string;
  marka: string;
  model: string;
  baslik: string;
  icerik: string;
  olumsuz: string[];
  puan: number;
};

const PROBLEM_BUCKETS = [
  { label: "Şanzıman/DSG", emoji: "⚙️", patterns: [/dsg/i, /şanzıman/i, /vites/i] },
  { label: "Motor/Yağ", emoji: "🔧", patterns: [/motor[\s-]?yağ/i, /yağ\s+yak/i, /motor\s+arıza/i] },
  { label: "Servis/Garanti", emoji: "🏢", patterns: [/servis/i, /garanti/i, /yetkili/i] },
  { label: "Yakıt Tüketimi", emoji: "⛽", patterns: [/yakıt/i, /tüket/i] },
  { label: "Elektrik/Ekran", emoji: "💻", patterns: [/ekran/i, /elektrik/i, /multimedya/i, /donma/i] },
  { label: "Fren/ABS", emoji: "🛑", patterns: [/fren/i, /\babs\b/i, /balata/i] },
  { label: "Süspansiyon", emoji: "🔩", patterns: [/süspansiyon/i, /amortis/i, /tıkır/i, /titreşim/i] },
  { label: "Klima/Konfor", emoji: "❄️", patterns: [/klima/i, /koltuk/i, /yalıtım/i, /sızdır/i] },
];

function categorizeProblems(reviews: ApiReview[]) {
  const counts: Record<string, { count: number; emoji: string }> = {};
  for (const r of reviews) {
    const text = `${r.baslik} ${r.icerik} ${r.olumsuz.join(" ")}`.toLowerCase();
    for (const b of PROBLEM_BUCKETS) {
      if (b.patterns.some((p) => p.test(text))) {
        if (!counts[b.label]) counts[b.label] = { count: 0, emoji: b.emoji };
        counts[b.label].count += 1;
      }
    }
  }
  return Object.entries(counts).sort((a, b) => b[1].count - a[1].count);
}

export default function ModelPage() {
  const { category: catSlug, brand: brandParam, model: modelParam } = useParams<{
    category: string;
    brand: string;
    model: string;
  }>();
  const brand = decodeURIComponent(brandParam);
  const model = decodeURIComponent(modelParam);
  const categoryKey = slugToCategory(catSlug);

  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [total, setTotal] = useState(0);
  const [avgPuan, setAvgPuan] = useState<number | null>(null);
  const [sikayetSay, setSikayetSay] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [kasaStats, setKasaStats] = useState<Array<{ kasa: string; total: number; avgPuan: number | null; sikayetOrani: number }>>([]);

  const personality = getPersonality(brand, model);
  const tipColors = personality ? TIP_RENKLERI[personality.tip] : null;
  const vehicleInfo = getVehicleInfo(brand, model);
  const kasalarFromData = getModelKasalari(brand, model);

  useEffect(() => {
    fetch(`/api/model-kasalar/${encodeURIComponent(brand)}/${encodeURIComponent(model)}`)
      .then((r) => r.json())
      .then((d) => setKasaStats(d.kasalar ?? []));
  }, [brand, model]);

  useEffect(() => {
    if (!categoryKey) return;
    // İstatistik için tüm review'lar (problem analizi)
    fetch(`/api/reviews?marka=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&limit=50`)
      .then((r) => r.json())
      .then((d) => {
        const arr: ApiReview[] = d.reviews ?? [];
        setReviews(arr);
        setTotal(d.total ?? arr.length);
        if (arr.length > 0) {
          const avg = arr.reduce((s, r) => s + r.puan, 0) / arr.length;
          setAvgPuan(avg);
          setSikayetSay(arr.filter((r) => r.puan <= 2.5).length);
        }
      });
  }, [categoryKey, brand, model]);

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

  const heroImage = !imgError ? getVehicleImage(brand, model, "Sedan", catSlug) : `/images/ph-otomobil.jpg`;
  const problems = categorizeProblems(reviews);
  const maxCount = problems[0]?.[1].count ?? 1;
  const sikayetOrani = total > 0 ? (sikayetSay / Math.min(total, reviews.length)) * 100 : 0;

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
          <Link href={`/${catSlug}/${encodeURIComponent(brand)}`} className="hover:text-[#ff6b00]">{brand}</Link>
          <span>›</span>
          <span className="text-white font-semibold">{model}</span>
        </nav>

        {/* Hero: 3D car card + meta — scroll reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 scroll-reveal">
          {/* 3D Image card */}
          <div className="lg:col-span-5 card-3d scroll-parallax">
            <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md overflow-hidden">
              <div className="aspect-video bg-[#0a0a0f] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage}
                  alt={`${brand} ${model}`}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            </div>
          </div>

          {/* Meta + Personality */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">
                {CATEGORY_LABEL[categoryKey]} · {brand}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{model}</h1>
              <div className="text-sm text-[#8b8b9e] mt-2 font-mono-num">
                {total.toLocaleString("tr-TR")} review · {reviews.length} analiz edilen
              </div>
            </div>

            {personality && tipColors && (
              <div className={`${tipColors.bg} ${tipColors.border} border rounded-md p-4`}>
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{personality.emoji}</div>
                  <div className="flex-1">
                    <div className={`text-xs font-mono-num ${tipColors.text} uppercase tracking-widest mb-1`}>
                      KARAKTER · {personality.tip.toUpperCase()}
                    </div>
                    <div className="font-bold text-white text-lg">{personality.karakter}</div>
                    <div className="text-sm text-[#8b8b9e] italic mt-1">"{personality.slogan}"</div>
                  </div>
                </div>
              </div>
            )}

            <Link
              href="/write"
              className="inline-flex items-center gap-2 bg-[#ff6b00] hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
            >
              + Kendi Deneyimini Ekle
            </Link>
          </div>
        </div>

        {/* Bloomberg-style score card */}
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-5 mb-6">
          <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[#1e1e2e]">
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest">
              SKOR KARTI · {brand.toUpperCase()} {model.toUpperCase()}
            </div>
            <span className="text-[10px] font-mono-num text-[#4a4a5e]">
              {total.toLocaleString("tr-TR")} REVIEW
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">PUAN</div>
              <div className="text-3xl font-mono-num font-semibold text-[#ffd60a]">
                ★ {(avgPuan ?? 0).toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">ŞİKAYET</div>
              <div
                className={`text-3xl font-mono-num font-semibold ${
                  sikayetOrani > 50 ? "text-[#ff2d55]" : sikayetOrani > 30 ? "text-[#ffd60a]" : "text-[#00d68f]"
                }`}
              >
                %{sikayetOrani.toFixed(0)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">NEGATİF</div>
              <div className="text-3xl font-mono-num font-semibold text-[#ff2d55]">{sikayetSay}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">POZİTİF</div>
              <div className="text-3xl font-mono-num font-semibold text-[#00d68f]">
                {reviews.filter((r) => r.puan >= 4).length}
              </div>
            </div>
          </div>

          {/* Top problems */}
          {problems.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">
                EN ÇOK BAHSEDİLEN SORUNLAR
              </div>
              <div className="space-y-2">
                {problems.slice(0, 5).map(([label, { count, emoji }]) => {
                  const pct = (count / maxCount) * 100;
                  const color = pct > 70 ? "#ff2d55" : pct > 40 ? "#ff6b00" : "#ffd60a";
                  return (
                    <div key={label} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-44 flex-shrink-0">
                        <span>{emoji}</span>
                        <span className="text-xs text-white">{label}</span>
                      </div>
                      <div className="flex-1 h-2 bg-[#1a1a26] rounded-full overflow-hidden">
                        <div className="h-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                      </div>
                      <span className="text-xs font-mono-num text-[#8b8b9e] w-12 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* KATMAN 1: Üretici iddiası */}
        {vehicleInfo && <ManufacturerCard info={vehicleInfo} />}

        {/* Kasa seçimi (gövde tipi) */}
        {(kasalarFromData.length > 0 || kasaStats.length > 0) && (
          <div className="mb-6">
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">
              KASA / GÖVDE TİPİ
            </div>
            <div className="flex flex-wrap gap-2">
              {(kasalarFromData.length > 0
                ? kasalarFromData.map((k) => k.kod)
                : kasaStats.map((k) => k.kasa)
              ).map((kasa) => {
                const stat = kasaStats.find((s) => s.kasa === kasa);
                const slug = kasa.toLowerCase().replace(/\s+/g, "-");
                return (
                  <Link
                    key={kasa}
                    href={`/${catSlug}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(slug)}`}
                    className="bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-md px-4 py-3 transition-colors min-w-[110px]"
                  >
                    <div className="text-sm font-bold text-white">{kasa}</div>
                    <div className="text-[10px] font-mono-num text-[#8b8b9e] mt-1">
                      {stat ? (
                        <>★ {(stat.avgPuan ?? 0).toFixed(1)} · {stat.total} review</>
                      ) : (
                        <span className="text-[#4a4a5e]">veri yok</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* KATMAN 3: Sorun bildir CTA */}
        <div className="mb-6">
          {!showIssue ? (
            <button
              onClick={() => setShowIssue(true)}
              className="w-full bg-[#12121a] border border-dashed border-[#1e1e2e] hover:border-[#ff6b00] rounded-md py-4 text-sm text-[#8b8b9e] hover:text-white transition-colors"
            >
              📣 Bu araçta yaşadığın bir sorunu bildir
            </button>
          ) : (
            <div className="space-y-2">
              <AddIssueForm
                kategoriSlug={catSlug}
                marka={brand}
                model={model}
                onSubmit={() => {
                  setTimeout(() => setShowIssue(false), 1500);
                }}
              />
              <button
                onClick={() => setShowIssue(false)}
                className="text-xs text-[#4a4a5e] hover:text-[#8b8b9e]"
              >
                ← Kapat
              </button>
            </div>
          )}
        </div>

        {/* KATMAN 2: Gerçek kullanıcı deneyimleri */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ReviewSection
              kategoriSlug={catSlug}
              marka={brand}
              model={model}
              kasaKod="Sedan"
              yil={0}
            />

            {/* Paylaş bandı */}
            <div className="mt-8 pt-6 border-t border-[#1e1e2e] flex items-center justify-between flex-wrap gap-3">
              <div className="text-sm text-[#8b8b9e]">
                Bu arabayı arkadaşına sor:
              </div>
              <ShareButton
                text={`${brand} ${model} hakkında ${total} kişinin yorumunu gördüm — almadan önce bak!`}
                url={`/${catSlug}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}`}
                twitterText={`${brand} ${model} ★${(avgPuan ?? 0).toFixed(1)} (${total} review) #AraçDen #${brand.replace(/[- ]/g, "")}`}
              />
            </div>
          </div>

          {/* Sağ sidebar reklam */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              <AdSlot slot={`model-sidebar-${brand}`} size="300x600" label="YETKİLİ BAYİ" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

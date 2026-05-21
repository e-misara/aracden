"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import AdSlot from "@/components/AdSlot";
import WeeklyTrending from "@/components/WeeklyTrending";
import EnlerHorizontal from "@/components/EnlerHorizontal";
import ShareButton from "@/components/ShareButton";
import { ALL_CATEGORIES } from "@/lib/categories";
import { getSourceMeta } from "@/lib/source-types";

type SearchResult = { marka: string; model: string; kategori: string; totalReview: number; avgPuan: number | null; url: string };
type RecentReview = { id: string; marka: string; model: string; kullanici: string; puan: number; baslik: string; icerik: string; tarih: string; kategoriSlug: string; sentimentType?: string; verified?: boolean };

export default function Home() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [total, setTotal] = useState(15037);
  const [recentReviews, setRecentReviews] = useState<RecentReview[]>([]);
  const [trending, setTrending] = useState<SearchResult | null>(null);
  const [trendingLoading, setTrendingLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/reviews?limit=8").then((r) => r.json()),
      fetch("/api/brands?limit=5&sort=totalReview").then((r) => r.json()),
    ])
      .then(([reviewsRes, brandsRes]) => {
        if (cancelled) return;
        if (reviewsRes?.total) setTotal(reviewsRes.total);
        setRecentReviews(reviewsRes?.reviews ?? []);
        const top = brandsRes?.brands?.[0];
        if (top?.enCokModel) {
          setTrending({
            marka: top.marka,
            model: top.enCokModel,
            kategori: top.kategori ?? "otomobil",
            totalReview: top.totalReview,
            avgPuan: top.avgPuan,
            url: `/${top.kategori ?? "otomobil"}/${encodeURIComponent(top.marka)}/${encodeURIComponent(top.enCokModel)}`,
          });
        }
      })
      .finally(() => { if (!cancelled) setTrendingLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (q.trim().length < 2) { setSearchResults([]); return; }
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q.trim())}&limit=8`).then(r => r.json()).then(d => setSearchResults(d.results ?? []));
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  const handleSearch = () => {
    if (searchResults.length > 0) router.push(searchResults[0].url);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Ticker />

      {/* HERO */}
      <section className="relative bg-radial-orange border-b border-[#1e1e2e]">
        <div className="max-w-5xl mx-auto px-4 py-20 md:py-28 text-center scroll-reveal">
          <div className="text-5xl mb-6">🚗</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-2">
            <span className="text-white">Almadan önce </span>
            <span className="text-[#ff6b00]">sor.</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#8b8b9e] mb-6">
            Aldıktan sonra <span className="text-[#00d68f]">paylaş.</span>
          </h2>
          <p className="text-sm md:text-base text-[#4a4a5e] mb-8 font-mono-num">
            <span className="text-white font-semibold">{total.toLocaleString("tr-TR")}</span> gerçek deneyim · 80+ marka · 170+ recall
          </p>

          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="🔍 Hangi arabayı düşünüyorsun?"
                className="w-full bg-[#12121a] border-2 border-[#1e1e2e] focus:border-[#ff6b00] rounded-xl pl-5 pr-32 py-4 text-base text-white placeholder-[#4a4a5e] outline-none transition-colors"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff6b00] hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Araştır →
              </button>
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#12121a] border border-[#1e1e2e] rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto text-left">
                  {searchResults.map((r, i) => (
                    <Link key={i} href={r.url} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#1a1a26] transition-colors border-b border-[#1e1e2e] last:border-b-0">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{r.marka} · {r.model}</div>
                        <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase">{r.kategori}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono-num text-[#8b8b9e]">{r.totalReview}</div>
                        {r.avgPuan != null && <div className="text-xs font-mono-num text-[#ffd60a]">★{r.avgPuan.toFixed(1)}</div>}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Kategori shortcuts */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {ALL_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-full text-xs text-[#8b8b9e] hover:text-white transition-colors"
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-[10px] font-mono-num text-[#4a4a5e]">
            scroll ↓
          </div>
        </div>
      </section>

      {/* BU HAFTA KONUŞULANLAR + BU HAFTANIN ARACI (2 kolon) */}
      <section className="border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-reveal">
          <div className="lg:col-span-2">
            <WeeklyTrending />
          </div>
          <div>
            {trendingLoading && (
              <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5 h-full animate-pulse">
                <div className="h-3 w-24 bg-[#1e1e2e] rounded mb-3" />
                <div className="h-7 w-40 bg-[#1e1e2e] rounded mb-2" />
                <div className="h-3 w-32 bg-[#1e1e2e] rounded" />
              </div>
            )}
            {!trendingLoading && trending && (
              <div className="bg-gradient-to-br from-[#ff6b00]/20 to-transparent border border-[#ff6b00]/40 rounded-xl p-5 h-full">
                <div className="text-[10px] font-mono-num text-[#ff6b00] uppercase tracking-widest mb-2">
                  ⭐ BU HAFTANIN ARACI
                </div>
                <Link href={trending.url} className="block group">
                  <div className="text-2xl font-bold text-white group-hover:text-[#ff6b00] transition-colors">
                    {trending.marka} {trending.model}
                  </div>
                  <div className="text-sm text-[#8b8b9e] mt-1">
                    {trending.totalReview.toLocaleString("tr-TR")} kişi konuştu
                    {trending.avgPuan != null && (
                      <> · <span className="font-mono-num text-[#ffd60a]">★{trending.avgPuan.toFixed(1)}</span></>
                    )}
                  </div>
                  <div className="text-xs text-[#8b8b9e] mt-3 leading-relaxed">
                    Türkiye'nin en çok yorumlanan modeli — gerçek sahip deneyimleri burada.
                  </div>
                  <div className="mt-4 text-[#ff6b00] text-sm font-semibold">İncele →</div>
                </Link>
                <ShareButton
                  className="mt-4"
                  text={`Bu hafta ${trending.marka} ${trending.model} konuşuluyor — ${trending.totalReview} kişi yorumladı`}
                  url={trending.url}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* REKLAM #1 — Hero Leaderboard */}
      <section className="border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <AdSlot slot="hero-leaderboard" size="728x90" label="REKLAM" />
        </div>
      </section>

      {/* ENLER SHOWCASE — 3 yatay liste */}
      <section className="border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 scroll-reveal">
          <EnlerHorizontal title="En Güvenilir 10 Araç" emoji="🏆" sort="avgPuan" minReview={50} />
          <EnlerHorizontal title="En Çok Şikayet Eden 10 Araç" emoji="😤" sort="sikayetOrani" minReview={50} />
          <EnlerHorizontal title="Türkiye'nin En Çok İncelenen 10 Markası" emoji="🇹🇷" sort="totalReview" />
        </div>
      </section>

      {/* REKLAM + SON YORUMLAR (2 kolon) */}
      <section className="border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sağ Sidebar Reklam */}
          <aside className="hidden lg:block lg:col-span-1 order-2">
            <div className="sticky top-32">
              <AdSlot slot="home-sidebar-300x250" size="300x250" />
              <AdSlot slot="home-sidebar-300x600" size="300x600" />
            </div>
          </aside>

          {/* Son Yorumlar Feed */}
          <div className="lg:col-span-3 order-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white flex items-center gap-2">
                💬 <span>Az önce paylaşıldı</span>
              </h2>
              <span className="text-[10px] font-mono-num text-[#4a4a5e]">canlı akış</span>
            </div>

            <div className="space-y-2.5">
              {recentReviews.length === 0
                ? [1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-28 bg-[#12121a] border border-[#1e1e2e] rounded-xl animate-pulse" />
                  ))
                : recentReviews.map((r) => {
                    const sentColor =
                      r.puan <= 2.5 ? "text-[#ff2d55]" : r.puan >= 4 ? "text-[#00d68f]" : "text-[#ffd60a]";
                    const src = getSourceMeta(r.kullanici, r.sentimentType);
                    const url = `/${r.kategoriSlug}/${encodeURIComponent(r.marka)}/${encodeURIComponent(r.model)}`;
                    return (
                      <Link
                        key={r.id}
                        href={url}
                        className="block bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-xl p-4 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                            style={{ backgroundColor: `${src.color}22`, border: `1px solid ${src.color}55` }}
                          >
                            {src.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs font-semibold" style={{ color: src.color }}>{src.label}</span>
                              <span className="text-[10px] text-[#4a4a5e]">·</span>
                              <span className="text-xs font-semibold text-[#ff6b00]">{r.marka} {r.model}</span>
                              <span className={`text-xs font-mono-num ${sentColor} ml-auto`}>★{r.puan.toFixed(1)}</span>
                            </div>
                            {r.baslik && (
                              <div className="text-sm font-semibold text-white line-clamp-1 mb-1">{r.baslik}</div>
                            )}
                            <p className="text-xs text-[#8b8b9e] line-clamp-2">{r.icerik}</p>
                            <div className="text-[10px] font-mono-num text-[#4a4a5e] mt-2">{r.tarih}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-[10px] font-mono-num text-[#4a4a5e]">
        AraçDen v3 · {total.toLocaleString("tr-TR")} review · Neon · Vercel
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import { ALL_CATEGORIES } from "@/lib/categories";

type Stats = {
  total: number;
  brands: number;
  recalls: number;
  complaintRate: number;
};

type TopBrand = {
  marka: string;
  totalReview: number;
  avgPuan: number | null;
  sikayetOrani: number;
  kategori: string | null;
  enCokModel: string | null;
};

type SearchResult = {
  marka: string;
  model: string;
  kategori: string;
  totalReview: number;
  avgPuan: number | null;
  url: string;
};

export default function Home() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [stats, setStats] = useState<Stats>({ total: 12485, brands: 80, recalls: 170, complaintRate: 0.38 });
  const [topBrands, setTopBrands] = useState<TopBrand[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch("/api/brands?limit=12&sort=totalReview")
      .then((r) => r.json())
      .then((d) => {
        const brands: TopBrand[] = d.brands ?? [];
        setTopBrands(brands.slice(0, 12));
        const totalRev = brands.reduce((a, b) => a + b.totalReview, 0);
        const avgComplaint =
          brands.length > 0 ? brands.reduce((a, b) => a + b.sikayetOrani, 0) / brands.length : 0.38;
        setStats((s) => ({
          ...s,
          total: totalRev > 0 ? Math.max(s.total, totalRev) : s.total,
          brands: d.total ?? s.brands,
          complaintRate: avgComplaint,
        }));
      })
      .catch(() => {});

    // Toplam review için ayrı sorgu (kesin sayı)
    fetch("/api/reviews?limit=1")
      .then((r) => r.json())
      .then((d) => {
        if (d.total) setStats((s) => ({ ...s, total: d.total }));
      })
      .catch(() => {});
  }, []);

  // Debounce search query
  useEffect(() => {
    if (q.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q.trim())}&limit=8`)
        .then((r) => r.json())
        .then((d) => setSearchResults(d.results ?? []))
        .catch(() => setSearchResults([]));
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  const handleSearch = () => {
    if (searchResults.length > 0) {
      router.push(searchResults[0].url);
    } else if (q.trim()) {
      router.push(`/otomobil`);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Ticker />

      {/* Hero */}
      <section className="relative bg-radial-orange border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono-num text-[#ff6b00] uppercase tracking-[0.25em]">
              <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse"></span>
              ARAÇ İSTİHBARATI · CANLI
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
              Almadan önce <span className="text-[#ff6b00]">araştır.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8b8b9e] mb-8 max-w-xl">
              <span className="font-mono-num text-white">{stats.total.toLocaleString("tr-TR")}</span> gerçek deneyim · 27 kaynak · 5 kategori
            </p>

            {/* Search */}
            <div className="flex gap-2 max-w-xl relative">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Marka, model veya sorun ara..."
                  className="w-full bg-[#12121a] border border-[#1e1e2e] focus:border-[#ff6b00] rounded-md px-4 py-3.5 text-sm text-white placeholder-[#4a4a5e] outline-none transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4a5e] text-xs font-mono-num">⌘K</span>

                {/* Dropdown */}
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#12121a] border border-[#1e1e2e] rounded-md shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                    {searchResults.map((r, i) => (
                      <Link
                        key={i}
                        href={r.url}
                        className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#1a1a26] transition-colors border-b border-[#1e1e2e] last:border-b-0"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white truncate">
                            {r.marka} <span className="text-[#8b8b9e]">·</span> {r.model}
                          </div>
                          <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide">
                            {r.kategori}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-mono-num text-[#8b8b9e]">
                            {r.totalReview} review
                          </div>
                          {r.avgPuan != null && (
                            <div className="text-xs font-mono-num text-[#ffd60a]">
                              ★ {r.avgPuan.toFixed(1)}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="bg-[#ff6b00] hover:bg-orange-600 text-white font-semibold px-6 rounded-md text-sm transition-colors"
              >
                Araştır →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Kartları */}
      <section className="border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "REVIEW", value: stats.total.toLocaleString("tr-TR"), sub: "↑ canlı", color: "text-white", subColor: "text-[#00d68f]" },
              { label: "KAYNAK", value: "27", sub: "aktif", color: "text-white", subColor: "text-[#8b8b9e]" },
              { label: "MARKA", value: stats.brands.toLocaleString("tr-TR"), sub: "Türk pazarı", color: "text-white", subColor: "text-[#8b8b9e]" },
              { label: "ŞİKAYET", value: `%${(stats.complaintRate * 100).toFixed(0)}`, sub: "ortalama", color: "text-[#ff2d55]", subColor: "text-[#8b8b9e]" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-4 hover:border-[#2e2e4e] transition-colors"
              >
                <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-1">
                  {s.label}
                </div>
                <div className={`text-2xl md:text-3xl font-mono-num font-semibold ${s.color}`}>{s.value}</div>
                <div className={`text-xs mt-1 ${s.subColor}`}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-xs font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-6">
            KATEGORİ KEŞFİ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-md p-6 transition-all hover:bg-[#1a1a26]"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <div className="font-semibold text-white group-hover:text-[#ff6b00] transition-colors">
                  {cat.label}
                </div>
                <div className="text-xs text-[#4a4a5e] mt-1">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top markalar grid */}
      {topBrands.length > 0 && (
        <section className="border-b border-[#1e1e2e]">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xs font-mono-num text-[#4a4a5e] uppercase tracking-widest">
                EN ÇOK İNCELENEN 12 MARKA
              </h2>
              <Link href="/enler" className="text-xs text-[#ff6b00] hover:underline">
                Tümünü gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {topBrands.map((b) => {
                const puan = b.avgPuan ?? 0;
                const sikayet = b.sikayetOrani * 100;
                const sikayetColor = sikayet > 50 ? "text-[#ff2d55]" : sikayet > 30 ? "text-[#ffd60a]" : "text-[#00d68f]";
                return (
                  <Link
                    key={b.marka}
                    href={`/${b.kategori ?? "otomobil"}/${encodeURIComponent(b.marka)}`}
                    className="card-3d bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-md p-4 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-white">{b.marka}</div>
                      <span className="text-[10px] font-mono-num text-[#4a4a5e]">{b.kategori ?? "—"}</span>
                    </div>
                    {b.enCokModel && (
                      <div className="text-xs text-[#8b8b9e] mb-3 truncate">↳ {b.enCokModel}</div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono-num text-[#8b8b9e]">
                        {b.totalReview.toLocaleString("tr-TR")} review
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-num text-[#ffd60a]">★{puan.toFixed(1)}</span>
                        <span className={`font-mono-num ${sikayetColor}`}>%{sikayet.toFixed(0)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-[#4a4a5e]">
        <span className="font-mono-num">AraçDen Terminal v2 · Neon PostgreSQL · Vercel</span>
      </footer>
    </div>
  );
}

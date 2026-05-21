"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import { slugToCategory, CATEGORY_LABEL, CATEGORY_EMOJI } from "@/lib/categories";

type Review = {
  id: string;
  marka: string;
  model: string;
  kasaKod?: string;
  kasaTip?: string;
  yil?: number;
  puan: number;
  baslik: string;
  icerik: string;
  kullanici: string;
  tarih: string;
  verified?: boolean;
  sentimentType?: string;
  olumlu?: string[];
  olumsuz?: string[];
};

type Brand = { marka: string; totalReview: number; avgPuan: number | null; sikayetOrani: number; enCokModel: string | null };

const PAGE_SIZE = 20;
const SORT_OPTIONS = [
  { value: "newest", label: "En Yeni" },
  { value: "top", label: "En Çok İzlenen" },
];

export default function CategoryPage() {
  const { category: catSlug } = useParams<{ category: string }>();
  const categoryKey = slugToCategory(catSlug);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<string>("newest");

  // Filtreler
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedKullanici, setSelectedKullanici] = useState<string[]>([]);
  const [minPuan, setMinPuan] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile

  // Marka listesi
  useEffect(() => {
    if (!catSlug) return;
    fetch(`/api/brands?kategori=${catSlug}&limit=200&sort=totalReview`)
      .then((r) => r.json())
      .then((d) => setBrands(d.brands ?? []));
  }, [catSlug]);

  // Review listesi
  useEffect(() => {
    if (!catSlug) return;
    setLoading(true);
    const sp = new URLSearchParams({
      kategori: catSlug,
      limit: String(PAGE_SIZE),
      page: String(page),
    });
    if (selectedBrands.length === 1) sp.set("marka", selectedBrands[0]);
    fetch(`/api/reviews?${sp}`)
      .then((r) => r.json())
      .then((d) => {
        let arr: Review[] = d.reviews ?? [];
        // Client-side filtreler (multi-marka, kullanıcı, puan)
        if (selectedBrands.length > 1) {
          arr = arr.filter((r) => selectedBrands.includes(r.marka));
        }
        if (selectedKullanici.length > 0) {
          arr = arr.filter((r) => selectedKullanici.includes(r.kullanici));
        }
        if (minPuan > 0) {
          arr = arr.filter((r) => r.puan >= minPuan);
        }
        setReviews(arr);
        setTotal(d.total ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [catSlug, page, sort, selectedBrands, selectedKullanici, minPuan]);

  const uniqueKullanici = useMemo(() => {
    const set = new Set<string>();
    reviews.forEach((r) => r.kullanici && set.add(r.kullanici));
    return Array.from(set).sort();
  }, [reviews]);

  const toggleBrand = (b: string) => {
    setSelectedBrands((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]));
    setPage(1);
  };
  const toggleKullanici = (k: string) => {
    setSelectedKullanici((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
    setPage(1);
  };

  if (!categoryKey) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-[#8b8b9e]">Kategori bulunamadı.</div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Filtre paneli (hem desktop sidebar hem mobile drawer)
  const FilterPanel = (
    <div className="space-y-4">
      <FilterGroup title="MARKA" count={brands.length}>
        <div className="max-h-72 overflow-y-auto -mr-1 pr-1 space-y-0.5">
          {brands.map((b) => (
            <label key={b.marka} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#1a1a26] cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.marka)}
                onChange={() => toggleBrand(b.marka)}
                className="accent-[#ff6b00]"
              />
              <span className="text-xs text-white flex-1 truncate">{b.marka}</span>
              <span className="text-[10px] font-mono-num text-[#4a4a5e]">{b.totalReview}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="MİN. PUAN">
        <div className="flex gap-1">
          {[0, 2, 3, 4, 4.5].map((p) => (
            <button
              key={p}
              onClick={() => { setMinPuan(p); setPage(1); }}
              className={`flex-1 text-xs py-1.5 rounded border transition-colors ${
                minPuan === p
                  ? "border-[#ff6b00] bg-[#ff6b00]/10 text-[#ff6b00]"
                  : "border-[#1e1e2e] text-[#8b8b9e] hover:border-[#2e2e4e]"
              }`}
            >
              {p === 0 ? "Tümü" : `★${p}+`}
            </button>
          ))}
        </div>
      </FilterGroup>

      {uniqueKullanici.length > 0 && (
        <FilterGroup title="KAYNAK" count={uniqueKullanici.length}>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {uniqueKullanici.slice(0, 20).map((k) => (
              <label key={k} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#1a1a26] cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={selectedKullanici.includes(k)}
                  onChange={() => toggleKullanici(k)}
                  className="accent-[#ff6b00]"
                />
                <span className="text-[11px] text-white flex-1 truncate">{k}</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      )}

      {(selectedBrands.length > 0 || selectedKullanici.length > 0 || minPuan > 0) && (
        <button
          onClick={() => { setSelectedBrands([]); setSelectedKullanici([]); setMinPuan(0); setPage(1); }}
          className="w-full text-xs py-2 rounded border border-[#ff2d55]/30 text-[#ff2d55] hover:bg-[#ff2d55]/10 transition-colors"
        >
          Filtreleri Temizle
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <Ticker />

      <section className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#4a4a5e] flex items-center gap-2 mb-4">
          <Link href="/" className="hover:text-[#ff6b00]">Ana Sayfa</Link>
          <span>›</span>
          <span className="text-white font-semibold">{CATEGORY_EMOJI[categoryKey]} {CATEGORY_LABEL[categoryKey]}</span>
        </nav>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-md px-4 py-2 text-sm text-white transition-colors"
          >
            🔍 Filtrele
            {(selectedBrands.length + selectedKullanici.length + (minPuan > 0 ? 1 : 0)) > 0 && (
              <span className="ml-2 text-xs font-mono-num text-[#ff6b00]">
                ({selectedBrands.length + selectedKullanici.length + (minPuan > 0 ? 1 : 0)})
              </span>
            )}
          </button>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="bg-[#12121a] border border-[#1e1e2e] rounded-md px-3 py-2 text-xs text-white outline-none"
          >
            {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SOL — Filtre Paneli (desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-4">
              <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-4">
                {FilterPanel}
              </div>
            </div>
          </aside>

          {/* SAĞ — Liste */}
          <main className="lg:col-span-9">
            {/* Sort + sayım (desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-4 pb-3 border-b border-[#1e1e2e]">
              <div className="text-xs font-mono-num text-[#8b8b9e]">
                <span className="text-white font-semibold">{total.toLocaleString("tr-TR")}</span> review
                {selectedBrands.length > 0 && <span> · {selectedBrands.length} marka seçili</span>}
              </div>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="bg-[#12121a] border border-[#1e1e2e] rounded-md px-3 py-1.5 text-xs text-white outline-none"
              >
                {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            {/* Review listesi */}
            <div className="space-y-2.5">
              {loading ? (
                [1,2,3,4,5,6].map(i => <div key={i} className="h-28 bg-[#12121a] border border-[#1e1e2e] rounded-xl animate-pulse" />)
              ) : reviews.length === 0 ? (
                <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-12 text-center text-[#8b8b9e] text-sm">
                  Bu filtrelerle review bulunamadı.
                </div>
              ) : reviews.map((r) => (
                <ReviewCard key={r.id} review={r} catSlug={catSlug} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-[#1e1e2e]">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 border border-[#1e1e2e] hover:border-[#ff6b00] rounded text-xs text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Önceki
                </button>
                <span className="text-xs font-mono-num text-[#8b8b9e]">
                  Sayfa {page} / {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1.5 border border-[#1e1e2e] hover:border-[#ff6b00] rounded text-xs text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Sonraki →
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#0a0a0f] border-l border-[#1e1e2e] overflow-y-auto">
            <div className="sticky top-0 bg-[#0a0a0f] border-b border-[#1e1e2e] px-4 py-3 flex items-center justify-between z-10">
              <span className="font-semibold text-white">Filtrele</span>
              <button onClick={() => setDrawerOpen(false)} className="text-[#8b8b9e] hover:text-white text-xl leading-none">✕</button>
            </div>
            <div className="p-4">{FilterPanel}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2 flex items-center justify-between">
        <span>{title}</span>
        {count != null && <span className="font-normal text-[#4a4a5e]">{count}</span>}
      </div>
      {children}
    </div>
  );
}

function ReviewCard({ review, catSlug }: { review: Review; catSlug: string }) {
  const sentColor = review.puan <= 2.5 ? "text-[#ff2d55]" : review.puan >= 4 ? "text-[#00d68f]" : "text-[#ffd60a]";
  const initial = (review.kullanici || "?")[0].toUpperCase();
  return (
    <Link
      href={`/${catSlug}/${encodeURIComponent(review.marka)}/${encodeURIComponent(review.model)}`}
      className="block bg-[#12121a] border border-[#1e1e2e] hover:border-[#ff6b00] rounded-xl p-4 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#1a1a26] border border-[#1e1e2e] flex items-center justify-center text-sm font-bold text-[#ff6b00] flex-shrink-0">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-semibold text-white">{review.kullanici}</span>
            {review.verified && <span className="text-[#ff6b00] text-[10px]">✓</span>}
            <span className="text-[10px] text-[#4a4a5e]">·</span>
            <span className="text-xs font-semibold text-[#ff6b00]">{review.marka} {review.model}</span>
            {review.yil != null && review.yil > 0 && <span className="text-xs text-[#4a4a5e]">({review.yil})</span>}
            <span className={`text-xs font-mono-num ${sentColor} ml-auto flex-shrink-0`}>★{review.puan.toFixed(1)}</span>
          </div>
          {review.baslik && <div className="text-sm font-semibold text-white line-clamp-1 mb-1">{review.baslik}</div>}
          <p className="text-xs text-[#8b8b9e] line-clamp-2">{review.icerik}</p>
          <div className="text-[10px] font-mono-num text-[#4a4a5e] mt-2">{review.tarih}</div>
        </div>
      </div>
    </Link>
  );
}

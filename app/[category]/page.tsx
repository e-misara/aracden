"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CategorySidebar from "@/components/CategorySidebar";
import PostCard, { PostCardPost } from "@/components/PostCard";
import FilterPanel from "@/components/FilterPanel";
import ReviewSection from "@/components/ReviewSection";
import { getVehicleImage } from "@/lib/vehicle-images";
import { slugToCategory, CATEGORY_LABEL, CATEGORY_EMOJI } from "@/lib/categories";
import type { CategoryTree } from "@/app/api/categories/route";

interface Selection {
  marka: string;
  model: string;
  kasaTip: string;
  motor?: string;
}

export default function CategoryPage() {
  const { category: catSlug } = useParams<{ category: string }>();
  const categoryKey = slugToCategory(catSlug);

  const [tree, setTree] = useState<CategoryTree>({});
  const [posts, setPosts] = useState<PostCardPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [secim, setSecim] = useState<Selection | null>(null);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setTree);
  }, []);

  useEffect(() => {
    if (!categoryKey) return;
    setLoading(true);
    fetch(`/api/posts?category=${categoryKey}&sort=${sort}&page=${page}`)
      .then((r) => r.json())
      .then((d) => { setPosts(d.posts ?? []); setTotal(d.total ?? 0); setLoading(false); });
  }, [categoryKey, sort, page]);

  if (!categoryKey) return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500">Kategori bulunamadı.</div>
    </div>
  );

  const catData = tree[categoryKey];
  const brands = catData ? Object.entries(catData.brands).sort((a, b) => b[1].count - a[1].count) : [];
  const phSlug = catSlug === "arazi-suv" ? "suv" : catSlug === "minivan-panelvan" ? "minivan" : catSlug;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-5">
        <CategorySidebar />

        <main className="flex-1 min-w-0 space-y-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 flex items-center gap-1">
            <Link href="/" className="hover:text-[#FF6000]">Ana Sayfa</Link>
            <span>›</span>
            <span className="text-[#333] font-semibold">{CATEGORY_EMOJI[categoryKey]} {CATEGORY_LABEL[categoryKey]}</span>
          </nav>

          {/* Filter panel */}
          <FilterPanel
            key={catSlug}
            kategoriSlug={catSlug}
            withUrl
            onSelect={(marka, model, kasaTip, motor) => setSecim({ marka, model, kasaTip, motor })}
          />

          {/* Seçim sonucu */}
          {secim && (
            <div className="space-y-4">
              {/* Araç başlık kartı */}
              <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-64 h-44 flex-shrink-0 bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getVehicleImage(secim.marka, secim.model, secim.kasaTip, catSlug)}
                      alt={`${secim.marka} ${secim.model} ${secim.kasaTip}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `/images/ph-${phSlug}.jpg`; }}
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{CATEGORY_LABEL[categoryKey]}</p>
                    <h1 className="text-xl font-extrabold text-[#333] mt-0.5">{secim.marka} {secim.model}</h1>
                    <p className="text-sm text-gray-400 mt-0.5">{secim.kasaTip}{secim.motor ? ` · ${secim.motor}` : ""}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/${catSlug}/${encodeURIComponent(secim.marka)}/${encodeURIComponent(secim.model)}`}
                        className="px-4 py-1.5 border border-[#FF6000] text-[#FF6000] rounded text-xs font-semibold hover:bg-orange-50"
                      >
                        Tüm Yorumlar
                      </Link>
                      <Link href="/write" className="px-4 py-1.5 bg-[#FF6000] text-white rounded text-xs font-semibold hover:bg-orange-700">
                        + Deneyim Yaz
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yorumlar */}
              <ReviewSection
                kategoriSlug={catSlug}
                marka={secim.marka}
                model={secim.model}
                kasaKod={secim.kasaTip}
                yil={0}
              />
            </div>
          )}

          {/* Marka grid — sadece seçim yokken */}
          {!secim && brands.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Markalar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {brands.map(([brand, data]) => (
                  <Link
                    key={brand}
                    href={`/${catSlug}/${encodeURIComponent(brand)}`}
                    className="bg-white border border-[#E0E0E0] rounded p-3 hover:border-[#FF6000] hover:shadow-sm transition-all group"
                  >
                    <div className="font-bold text-sm text-[#333] group-hover:text-[#FF6000]">{brand}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {Object.keys(data.models).length} model · {data.count} deneyim
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sample reviews kategoriye göre — seçim yokken */}
          {!secim && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Tüm Deneyimler ({total})
                </h2>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1); }}
                  className="text-xs border border-[#E0E0E0] rounded px-2 py-1 focus:outline-none"
                >
                  <option value="newest">En Yeni</option>
                  <option value="top">En Çok Beğeni</option>
                </select>
              </div>

              {/* DB posts */}
              {loading ? (
                <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />)}</div>
              ) : posts.length === 0 ? (
                <div className="bg-white border border-[#E0E0E0] rounded p-8 text-center text-gray-400 text-sm">
                  Bu kategoride henüz deneyim paylaşılmamış.
                </div>
              ) : posts.map((p) => <PostCard key={p.id} post={p} />)}

              {total > 10 && (
                <div className="flex justify-center gap-2 mt-4">
                  <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border border-[#E0E0E0] rounded text-sm disabled:opacity-40 hover:bg-gray-100">← Önceki</button>
                  <span className="px-3 py-1 text-sm text-gray-500">Sayfa {page} / {Math.ceil(total / 10)}</span>
                  <button disabled={page >= Math.ceil(total / 10)} onClick={() => setPage(page + 1)} className="px-3 py-1 border border-[#E0E0E0] rounded text-sm disabled:opacity-40 hover:bg-gray-100">Sonraki →</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

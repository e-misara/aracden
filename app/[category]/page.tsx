"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CategorySidebar from "@/components/CategorySidebar";
import PostCard, { PostCardPost } from "@/components/PostCard";
import { slugToCategory, CATEGORY_LABEL, CATEGORY_EMOJI, carImageUrl } from "@/lib/categories";
import type { CategoryTree } from "@/app/api/categories/route";

export default function CategoryPage() {
  const { category: catSlug } = useParams<{ category: string }>();
  const categoryKey = slugToCategory(catSlug);

  const [tree, setTree] = useState<CategoryTree>({});
  const [posts, setPosts] = useState<PostCardPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setTree);
  }, []);

  useEffect(() => {
    if (!categoryKey) return;
    setLoading(true);
    fetch(`/api/posts?category=${categoryKey}&sort=${sort}&page=${page}`)
      .then((r) => r.json())
      .then((d) => { setPosts(d.posts); setTotal(d.total); setLoading(false); });
  }, [categoryKey, sort, page]);

  if (!categoryKey) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500">Kategori bulunamadı.</div>
    </div>
  );

  const catData = tree[categoryKey];
  const brands = catData ? Object.entries(catData.brands).sort((a, b) => b[1].count - a[1].count) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-5">
        <CategorySidebar />

        <main className="flex-1 min-w-0 space-y-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 flex items-center gap-1">
            <Link href="/" className="hover:text-[#d0021b]">Ana Sayfa</Link>
            <span>›</span>
            <span className="text-gray-700 font-semibold">{CATEGORY_EMOJI[categoryKey]} {CATEGORY_LABEL[categoryKey]}</span>
            {catData && <span className="ml-1 text-gray-400">({catData.count} deneyim)</span>}
          </nav>

          {/* Brand cards */}
          {brands.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Markalar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {brands.map(([brand, data]) => (
                  <Link
                    key={brand}
                    href={`/${catSlug}/${encodeURIComponent(brand)}`}
                    className="bg-white border border-gray-200 rounded p-3 hover:border-[#d0021b] hover:shadow-sm transition-all group"
                  >
                    <div className="font-bold text-sm text-gray-800 group-hover:text-[#d0021b]">{brand}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {Object.keys(data.models).length} model · {data.count} deneyim
                    </div>
                    <div className="text-xs text-gray-400 mt-1 truncate">
                      {Object.keys(data.models).slice(0, 3).join(", ")}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Posts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Tüm Deneyimler ({total})
              </h2>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none"
              >
                <option value="newest">En Yeni</option>
                <option value="top">En Çok Beğeni</option>
                <option value="kronik">Kronik</option>
              </select>
            </div>

            {loading ? (
              <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />)}</div>
            ) : posts.length === 0 ? (
              <div className="bg-white border rounded p-8 text-center text-gray-400">Bu kategoride henüz deneyim yok.</div>
            ) : (
              <div className="space-y-2">
                {posts.map((p) => <PostCard key={p.id} post={p} />)}
              </div>
            )}

            {total > 10 && (
              <div className="flex justify-center gap-2 mt-4">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded text-sm disabled:opacity-40 hover:bg-gray-100">← Önceki</button>
                <span className="px-3 py-1 text-sm text-gray-500">Sayfa {page} / {Math.ceil(total / 10)}</span>
                <button disabled={page >= Math.ceil(total / 10)} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded text-sm disabled:opacity-40 hover:bg-gray-100">Sonraki →</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

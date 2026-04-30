"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CategorySidebar from "@/components/CategorySidebar";
import PostCard, { PostCardPost } from "@/components/PostCard";
import { slugToCategory, CATEGORY_LABEL, CATEGORY_EMOJI, SENTIMENT_LABEL, carImageUrl } from "@/lib/categories";

export default function ModelPage() {
  const { category: catSlug, brand: brandParam, model: modelParam } = useParams<{
    category: string; brand: string; model: string;
  }>();
  const brand = decodeURIComponent(brandParam);
  const model = decodeURIComponent(modelParam);
  const categoryKey = slugToCategory(catSlug);

  const [posts, setPosts] = useState<PostCardPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [sentimentFilter, setSentimentFilter] = useState("");
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!categoryKey) return;
    setLoading(true);
    const params = new URLSearchParams({
      category: categoryKey,
      brand,
      sort,
      page: String(page),
    });
    if (sentimentFilter) params.set("sentiment", sentimentFilter);

    fetch(`/api/posts?${params}`)
      .then((r) => r.json())
      .then((d) => {
        // filter by model client-side since API doesn't support model filter yet
        const filtered = d.posts.filter((p: PostCardPost) => p.model === model);
        setPosts(filtered);
        setTotal(filtered.length);
        setLoading(false);
      });
  }, [categoryKey, brand, model, sort, page, sentimentFilter]);

  if (!categoryKey) return null;

  const counts = {
    COMPLAINT: posts.filter((p) => p.sentimentType === "COMPLAINT").length,
    POSITIVE: posts.filter((p) => p.sentimentType === "POSITIVE").length,
    TIP: posts.filter((p) => p.sentimentType === "TIP").length,
  };

  const kronik = posts.filter((p) => p.isChronik).length;
  const avgUp = posts.length ? Math.round(posts.reduce((s, p) => s + p.thumbsUp, 0) / posts.length) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-5">
        <CategorySidebar />

        <main className="flex-1 min-w-0 space-y-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-[#d0021b]">Ana Sayfa</Link>
            <span>›</span>
            <Link href={`/${catSlug}`} className="hover:text-[#d0021b]">{CATEGORY_EMOJI[categoryKey]} {CATEGORY_LABEL[categoryKey]}</Link>
            <span>›</span>
            <Link href={`/${catSlug}/${encodeURIComponent(brand)}`} className="hover:text-[#d0021b]">{brand}</Link>
            <span>›</span>
            <span className="text-gray-700 font-semibold">{model}</span>
          </nav>

          {/* Model header card */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Car image */}
              <div className="sm:w-64 h-44 sm:h-auto bg-gray-100 flex-shrink-0 overflow-hidden">
                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={carImageUrl(brand, model)}
                    alt={`${brand} ${model}`}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    {CATEGORY_EMOJI[categoryKey]}
                  </div>
                )}
              </div>

              {/* Model info */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{CATEGORY_LABEL[categoryKey]}</p>
                    <h1 className="text-xl font-extrabold text-gray-900">{brand} {model}</h1>
                  </div>
                  <Link
                    href="/write"
                    className="bg-[#d0021b] text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-red-700 whitespace-nowrap"
                  >
                    + Deneyim Yaz
                  </Link>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  <div className="bg-gray-50 rounded p-2 text-center">
                    <p className="text-lg font-extrabold text-gray-800">{total}</p>
                    <p className="text-xs text-gray-400">Deneyim</p>
                  </div>
                  <div className="bg-red-50 rounded p-2 text-center">
                    <p className="text-lg font-extrabold text-red-600">{counts.COMPLAINT}</p>
                    <p className="text-xs text-gray-400">Şikayet</p>
                  </div>
                  <div className="bg-green-50 rounded p-2 text-center">
                    <p className="text-lg font-extrabold text-green-600">{counts.POSITIVE}</p>
                    <p className="text-xs text-gray-400">Olumlu</p>
                  </div>
                  <div className="bg-orange-50 rounded p-2 text-center">
                    <p className="text-lg font-extrabold text-orange-500">{counts.TIP}</p>
                    <p className="text-xs text-gray-400">İpucu</p>
                  </div>
                </div>

                {kronik > 0 && (
                  <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                    ⚠️ {kronik} kronik sorun tespit edildi
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filter + sort bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 font-medium">Filtrele:</span>
            {["", "COMPLAINT", "POSITIVE", "TIP"].map((s) => (
              <button
                key={s}
                onClick={() => { setSentimentFilter(s); setPage(1); }}
                className={`text-xs px-3 py-1 rounded border transition-colors ${
                  sentimentFilter === s
                    ? "bg-[#d0021b] text-white border-[#d0021b]"
                    : "bg-white text-gray-600 border-gray-300 hover:border-[#d0021b] hover:text-[#d0021b]"
                }`}
              >
                {s === "" ? "Tümü" : SENTIMENT_LABEL[s]}
              </button>
            ))}
            <div className="ml-auto">
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none"
              >
                <option value="newest">En Yeni</option>
                <option value="top">En Çok Beğeni</option>
              </select>
            </div>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />)}</div>
          ) : posts.length === 0 ? (
            <div className="bg-white border rounded p-8 text-center">
              <p className="text-gray-400 mb-3">Bu model için deneyim bulunamadı.</p>
              <Link href="/write" className="bg-[#d0021b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-700">
                İlk deneyimi sen yaz
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {posts.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

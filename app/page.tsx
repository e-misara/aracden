"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";

const BRANDS = ["TOGG", "Renault", "Honda", "Volkswagen", "Dacia", "Hyundai", "BMW", "Toyota", "Ford", "Skoda", "Mitsubishi", "Yamaha"];
const FUEL_TYPES = ["Benzin", "Dizel", "Elektrik", "Hibrit"];
const SENTIMENT_FILTERS = [
  { value: "COMPLAINT", label: "Şikayet" },
  { value: "POSITIVE", label: "Olumlu" },
  { value: "TIP", label: "İpucu" },
];

type Post = {
  id: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  fuelType: string;
  kmUsed: string;
  sentimentType: string;
  isChronik: boolean;
  title: string;
  body: string;
  tags: string[];
  thumbsUp: number;
  thumbsDown: number;
  createdAt: string;
  user: { name: string };
  _count: { comments: number };
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [sort, setSort] = useState("newest");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [selectedSentiments, setSelectedSentiments] = useState<string[]>([]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ sort, page: String(page) });
    if (activeCategory) params.set("category", activeCategory);
    if (selectedBrands.length === 1) params.set("brand", selectedBrands[0]);
    if (selectedSentiments.length === 1) params.set("sentiment", selectedSentiments[0]);

    const res = await fetch(`/api/posts?${params}`);
    const data = await res.json();
    setPosts(data.posts);
    setTotal(data.total);
    setLoading(false);
  }, [sort, page, activeCategory, selectedBrands, selectedSentiments]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Category subnav */}
      <div className="bg-[#d0021b] border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 flex gap-0 items-center">
          {[
            { label: "Tümü", value: "" },
            { label: "🚗 Otomobil", value: "OTOMOBIL" },
            { label: "🚙 SUV", value: "SUV" },
            { label: "🏍️ Motosiklet", value: "MOTOSIKLET" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setActiveCategory(tab.value); setPage(1); }}
              className={`px-5 py-2 text-sm font-bold transition-colors ${
                activeCategory === tab.value
                  ? "bg-white text-[#d0021b]"
                  : "text-white hover:bg-red-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 py-1">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="text-xs bg-red-700 text-white border border-red-500 rounded px-2 py-1"
            >
              <option value="newest">En Yeni</option>
              <option value="top">En Çok Beğeni</option>
              <option value="comments">En Çok Görüntülenen</option>
              <option value="kronik">Kronik</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-6">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 space-y-4">
          <div className="bg-white border border-gray-200 rounded p-3">
            <h3 className="font-bold text-sm text-gray-700 mb-2 border-b pb-1">Marka</h3>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-1 rounded">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                    className="accent-[#d0021b]"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-3">
            <h3 className="font-bold text-sm text-gray-700 mb-2 border-b pb-1">Yakıt Tipi</h3>
            <div className="space-y-1">
              {FUEL_TYPES.map((fuel) => (
                <label key={fuel} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-1 rounded">
                  <input
                    type="checkbox"
                    checked={selectedFuels.includes(fuel)}
                    onChange={() => toggleFilter(selectedFuels, setSelectedFuels, fuel)}
                    className="accent-[#d0021b]"
                  />
                  {fuel}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-3">
            <h3 className="font-bold text-sm text-gray-700 mb-2 border-b pb-1">Deneyim Türü</h3>
            <div className="space-y-1">
              {SENTIMENT_FILTERS.map((s) => (
                <label key={s.value} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-1 rounded">
                  <input
                    type="checkbox"
                    checked={selectedSentiments.includes(s.value)}
                    onChange={() => toggleFilter(selectedSentiments, setSelectedSentiments, s.value)}
                    className="accent-[#d0021b]"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">{total} sonuç bulundu</p>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white border rounded h-28 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white border rounded p-8 text-center text-gray-500">
              Henüz paylaşım yok.
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {total > 10 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border rounded text-sm disabled:opacity-40 hover:bg-gray-100"
              >
                ← Önceki
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">
                Sayfa {page} / {Math.ceil(total / 10)}
              </span>
              <button
                disabled={page >= Math.ceil(total / 10)}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border rounded text-sm disabled:opacity-40 hover:bg-gray-100"
              >
                Sonraki →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PostCard, { PostCardPost } from "@/components/PostCard";

type Stats = {
  kronikPosts: { id: string; title: string; brand: string; model: string; thumbsUp: number }[];
  topPositive: { id: string; title: string; brand: string; model: string; thumbsUp: number }[];
  totalCount: number;
};

const CAT_CARDS = [
  { slug: "otomobil", label: "Otomobil", emoji: "🚗", desc: "Binek araç deneyimleri", bg: "bg-blue-50 border-blue-200" },
  { slug: "motosiklet", label: "Motosiklet", emoji: "🏍️", desc: "Motosiklet deneyimleri", bg: "bg-orange-50 border-orange-200" },
  { slug: "ticari", label: "Ticari Araç", emoji: "🚚", desc: "Ticari araç deneyimleri", bg: "bg-green-50 border-green-200" },
];

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<PostCardPost[]>([]);

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats);
    fetch("/api/posts?sort=newest&limit=5")
      .then((r) => r.json())
      .then((d) => setRecent(d.posts));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-[#d0021b] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-extrabold">Araç Deneyim Platformu</h1>
          <p className="text-red-200 text-sm mt-1">
            {stats?.totalCount ?? "—"} gerçek kullanıcı deneyimi · Şikayetler · Övgüler · İpuçları
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Category cards */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Kategoriler</h2>
          <div className="grid grid-cols-3 gap-4">
            {CAT_CARDS.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`border rounded-lg p-5 flex items-center gap-4 hover:shadow-md transition-shadow ${cat.bg}`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <p className="font-bold text-gray-800">{cat.label}</p>
                  <p className="text-xs text-gray-500">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent posts */}
          <div className="col-span-2 space-y-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Son Deneyimler</h2>
            {recent.length === 0 ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />)}
              </div>
            ) : (
              recent.map((post) => <PostCard key={post.id} post={post} />)
            )}
            <Link href="/otomobil" className="block text-center text-sm text-[#d0021b] font-semibold hover:underline mt-2">
              Tüm deneyimleri gör →
            </Link>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Kronik */}
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-2">
                🔴 Kronik Sorunlar
              </div>
              <div className="divide-y divide-gray-100">
                {stats?.kronikPosts.map((p) => (
                  <Link key={p.id} href={`/post/${p.id}`} className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50 group">
                    <span className="text-red-500 font-bold text-xs mt-0.5">▲</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-700 group-hover:text-[#d0021b] line-clamp-2 leading-snug">
                        {p.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.brand} {p.model} · 👍 {p.thumbsUp}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/kronik" className="block text-center text-xs text-[#d0021b] font-semibold py-2 border-t hover:bg-red-50">
                Tüm kronik sorunlar →
              </Link>
            </div>

            {/* Top positive */}
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="bg-green-600 text-white text-xs font-bold px-3 py-2">
                ✅ En Beğenilen Deneyimler
              </div>
              <div className="divide-y divide-gray-100">
                {stats?.topPositive.map((p) => (
                  <Link key={p.id} href={`/post/${p.id}`} className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50 group">
                    <span className="text-green-500 font-bold text-xs mt-0.5">▲</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-700 group-hover:text-green-700 line-clamp-2 leading-snug">
                        {p.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.brand} {p.model} · 👍 {p.thumbsUp}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/en-iyiler" className="block text-center text-xs text-green-700 font-semibold py-2 border-t hover:bg-green-50">
                En iyi deneyimler →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

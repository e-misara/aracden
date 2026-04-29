"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";

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

export default function EnIyilerPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts?sentiment=POSITIVE&sort=top&limit=50")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-green-500 rounded" />
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">En İyiler</h1>
            <p className="text-sm text-gray-500">En çok beğenilen olumlu deneyimler</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white border rounded h-28 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white border rounded p-8 text-center text-gray-500">
            Henüz olumlu deneyim paylaşılmamış.
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post, idx) => (
              <div key={post.id} className="relative">
                <div className="absolute -left-6 top-4 text-lg font-black text-gray-300 w-5 text-right">
                  {idx + 1}
                </div>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type Post = {
  id: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  fuelType: string;
  kmUsed: string;
  usagePeriod: string;
  sentimentType: string;
  isChronik: boolean;
  title: string;
  body: string;
  tags: string[];
  thumbsUp: number;
  thumbsDown: number;
  viewCount: number;
  createdAt: string;
  user: { id: string; name: string; image: string | null };
  comments: Comment[];
};

type Comment = {
  id: string;
  body: string;
  createdAt: string;
  user: { id: string; name: string; image: string | null };
};

const SENTIMENT_LABEL: Record<string, string> = {
  COMPLAINT: "Şikayet",
  POSITIVE: "Olumlu",
  TIP: "İpucu",
};

const SENTIMENT_COLOR: Record<string, string> = {
  COMPLAINT: "text-red-600 bg-red-50 border-red-200",
  POSITIVE: "text-green-600 bg-green-50 border-green-200",
  TIP: "text-orange-600 bg-orange-50 border-orange-200",
};

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentBody, setCommentBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<{ id: string; title: string; sentimentType: string }[]>([]);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
        // fetch related
        if (data.brand && data.model) {
          fetch(`/api/posts?brand=${data.brand}&page=1`)
            .then((r) => r.json())
            .then((d) => setRelatedPosts(d.posts.filter((p: { id: string }) => p.id !== id).slice(0, 5)));
        }
      });
  }, [id]);

  const handleVote = async (type: string) => {
    if (!session) { router.push("/auth/login"); return; }
    const res = await fetch(`/api/posts/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    const data = await res.json();
    setPost((p) => p ? { ...p, thumbsUp: data.thumbsUp, thumbsDown: data.thumbsDown } : p);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) { router.push("/auth/login"); return; }
    setSubmitting(true);
    const res = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: commentBody }),
    });
    const comment = await res.json();
    setPost((p) => p ? { ...p, comments: [...p.comments, comment] } : p);
    setCommentBody("");
    setSubmitting(false);
  };

  const handleAnalyze = async () => {
    if (!post) return;
    setAnalyzing(true);
    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand: post.brand, model: post.model }),
    });
    const data = await res.json();
    setAnalysis(data.analysis);
    setAnalyzing(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-40 bg-gray-200 rounded" />
      </div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-gray-500">Gönderi bulunamadı.</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs font-semibold px-2 py-1 rounded border ${SENTIMENT_COLOR[post.sentimentType]}`}>
              {SENTIMENT_LABEL[post.sentimentType]}
            </span>
            {post.isChronik && (
              <span className="text-xs font-semibold px-2 py-1 rounded border text-red-700 bg-red-50 border-red-200">
                KRONİK
              </span>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {/* Car specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {[
              { label: "Marka / Model", value: `${post.brand} ${post.model}` },
              { label: "Yıl", value: post.year },
              { label: "Yakıt", value: post.fuelType },
              { label: "KM", value: post.kmUsed },
              { label: "Kullanım Süresi", value: post.usagePeriod },
              { label: "Görüntülenme", value: post.viewCount },
            ].map((spec) => (
              <div key={spec.label} className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">{spec.label}</p>
                <p className="font-semibold text-sm text-gray-800">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-4">
            {post.body}
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Vote buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleVote("up")}
              className="flex items-center gap-1 px-4 py-2 border border-green-300 text-green-700 rounded hover:bg-green-50 font-semibold text-sm"
            >
              👍 {post.thumbsUp}
            </button>
            <button
              onClick={() => handleVote("down")}
              className="flex items-center gap-1 px-4 py-2 border border-red-300 text-red-700 rounded hover:bg-red-50 font-semibold text-sm"
            >
              👎 {post.thumbsDown}
            </button>
            <span className="text-xs text-gray-400 ml-2">
              {post.user.name} · {new Date(post.createdAt).toLocaleDateString("tr-TR")}
            </span>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">🤖 AI Analizi — {post.brand} {post.model}</h2>
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="text-sm bg-[#d0021b] text-white px-4 py-1.5 rounded hover:bg-red-700 disabled:opacity-60"
            >
              {analyzing ? "Analiz ediliyor…" : "Analiz Et"}
            </button>
          </div>
          {analysis ? (
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{analysis}</div>
          ) : (
            <p className="text-sm text-gray-400">Bu araç için kullanıcı deneyimlerini analiz etmek için butona tıklayın.</p>
          )}
        </div>

        {/* Comments */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-gray-800 mb-4">
            💬 Yorumlar ({post.comments.length})
          </h2>

          {post.comments.length === 0 && (
            <p className="text-sm text-gray-400 mb-4">Henüz yorum yok. İlk yorumu siz yapın!</p>
          )}

          <div className="space-y-4 mb-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-700">{comment.user.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{comment.body}</p>
              </div>
            ))}
          </div>

          {session ? (
            <form onSubmit={handleComment} className="space-y-2">
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                required
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b] resize-none"
                placeholder="Yorumunuzu yazın…"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#d0021b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
              >
                {submitting ? "Gönderiliyor…" : "Yorum Yap"}
              </button>
            </form>
          ) : (
            <p className="text-sm text-gray-500">
              Yorum yapmak için{" "}
              <Link href={`/auth/login?callbackUrl=/post/${id}`} className="text-[#d0021b] font-semibold hover:underline">
                giriş yapın
              </Link>
              .
            </p>
          )}
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-bold text-gray-800 mb-3">
              İlgili Gönderiler — {post.brand} {post.model}
            </h2>
            <div className="space-y-2">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/post/${rp.id}`} className="block text-sm text-[#d0021b] hover:underline">
                  {rp.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

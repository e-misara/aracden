import Link from "next/link";
import {
  SENTIMENT_LABEL,
  SENTIMENT_BORDER,
  SENTIMENT_COLOR,
  CATEGORY_EMOJI,
  categoryToSlug,
} from "@/lib/categories";

export interface PostCardPost {
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
}

export default function PostCard({ post }: { post: PostCardPost }) {
  const excerpt = post.body.length > 160 ? post.body.slice(0, 160) + "…" : post.body;
  const date = new Date(post.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const catSlug = categoryToSlug(post.category);

  return (
    <Link href={`/post/${post.id}`}>
      <div
        className={`bg-white border border-gray-200 border-l-4 ${SENTIMENT_BORDER[post.sentimentType]} hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex`}
      >
        {/* Main content */}
        <div className="flex-1 p-3 min-w-0">
          {/* Breadcrumb + badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <Link
              href={`/${catSlug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-gray-400 hover:text-[#d0021b]"
            >
              {CATEGORY_EMOJI[post.category]} {post.category === "OTOMOBIL" ? "Otomobil" : post.category === "SUV" ? "Arazi/SUV" : "Motosiklet"}
            </Link>
            <span className="text-gray-300 text-xs">›</span>
            <Link
              href={`/${catSlug}/${encodeURIComponent(post.brand)}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-gray-400 hover:text-[#d0021b] font-medium"
            >
              {post.brand}
            </Link>
            <span className="text-gray-300 text-xs">›</span>
            <Link
              href={`/${catSlug}/${encodeURIComponent(post.brand)}/${encodeURIComponent(post.model)}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-gray-500 hover:text-[#d0021b] font-semibold"
            >
              {post.model}
            </Link>
            <span className="text-gray-300 text-xs">·</span>
            <span className="text-xs text-gray-400">{post.year} · {post.fuelType} · {post.kmUsed}</span>

            <div className="ml-auto flex items-center gap-1">
              {post.isChronik && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-red-600 text-white">
                  KRONİK
                </span>
              )}
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${SENTIMENT_COLOR[post.sentimentType]}`}>
                {SENTIMENT_LABEL[post.sentimentType]}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-2">
            {excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right panel — sahibinden ilan sahibi style */}
        <div className="w-28 flex-shrink-0 border-l border-gray-100 p-3 flex flex-col items-center justify-between bg-gray-50">
          <div className="text-center">
            <div className="w-9 h-9 rounded-full bg-[#d0021b] text-white flex items-center justify-center text-sm font-bold mx-auto mb-1">
              {post.user.name.charAt(0).toUpperCase()}
            </div>
            <p className="text-xs font-semibold text-gray-700 leading-tight text-center break-words">
              {post.user.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{date}</p>
          </div>
          <div className="text-center space-y-0.5 mt-2">
            <div className="text-xs text-gray-500">👍 {post.thumbsUp} · 👎 {post.thumbsDown}</div>
            <div className="text-xs text-gray-400">💬 {post._count.comments} yorum</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

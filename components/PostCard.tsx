import Link from "next/link";

const CATEGORY_EMOJI: Record<string, string> = {
  OTOMOBIL: "🚗",
  SUV: "🚙",
  MOTOSIKLET: "🏍️",
};

const SENTIMENT_BORDER: Record<string, string> = {
  COMPLAINT: "border-l-red-500",
  POSITIVE: "border-l-green-500",
  TIP: "border-l-orange-400",
};

const SENTIMENT_LABEL: Record<string, string> = {
  COMPLAINT: "Şikayet",
  POSITIVE: "Olumlu",
  TIP: "İpucu",
};

interface PostCardProps {
  post: {
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
}

export default function PostCard({ post }: PostCardProps) {
  const excerpt = post.body.length > 140 ? post.body.slice(0, 140) + "…" : post.body;

  return (
    <Link href={`/post/${post.id}`}>
      <div
        className={`bg-white border border-gray-200 border-l-4 ${SENTIMENT_BORDER[post.sentimentType]} rounded p-4 hover:shadow-md transition-shadow cursor-pointer`}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">{CATEGORY_EMOJI[post.category]}</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
              <span className="font-bold text-gray-700">
                {post.brand} {post.model}
              </span>
              <span>{post.year}</span>
              <span>·</span>
              <span>{post.fuelType}</span>
              <span>·</span>
              <span>{post.kmUsed}</span>
              {post.isChronik && (
                <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-xs font-semibold">
                  KRONİK
                </span>
              )}
              <span
                className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                  post.sentimentType === "COMPLAINT"
                    ? "bg-red-100 text-red-700"
                    : post.sentimentType === "POSITIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {SENTIMENT_LABEL[post.sentimentType]}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">
              {post.title}
            </h3>
            <p className="text-gray-600 text-xs line-clamp-2">{excerpt}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>👍 {post.thumbsUp}</span>
              <span>👎 {post.thumbsDown}</span>
              <span>💬 {post._count.comments}</span>
              <span className="ml-auto">{post.user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

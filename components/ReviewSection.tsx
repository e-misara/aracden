"use client";

import { useEffect, useState } from "react";
import { sampleReviews, type SampleReview } from "@/lib/sample-reviews";
import { SENTIMENT_COLOR, SENTIMENT_LABEL } from "@/lib/categories";
import ExperienceForm from "./ExperienceForm";

interface ReviewSectionProps {
  kategoriSlug: string;
  marka: string;
  model: string;
  kasaKod: string;
  yil: number;
}

function StarRating({ puan }: { puan: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= puan ? "text-[#FF6000]" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewSection({ kategoriSlug, marka, model, kasaKod, yil }: ReviewSectionProps) {
  const [dbReviews, setDbReviews] = useState<SampleReview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/reviews?category=${encodeURIComponent(kategoriSlug)}&brand=${encodeURIComponent(marka)}&model=${encodeURIComponent(model)}`)
      .then((r) => r.json())
      .catch(() => ({ posts: [] }))
      .finally(() => setLoading(false));
  }, [kategoriSlug, marka, model]);

  // Merge sample reviews (filtered) with DB reviews
  const localReviews = sampleReviews.filter(
    (r) => r.marka === marka && r.model === model && r.kasaKod === kasaKod
  );
  const allReviews = [...localReviews, ...dbReviews];

  return (
    <div className="mt-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#333]">
          Kullanıcı Deneyimleri
          {allReviews.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400">({allReviews.length})</span>
          )}
        </h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-1.5 bg-[#FF6000] text-white text-xs font-bold rounded hover:bg-orange-700 transition-colors"
        >
          {showForm ? "İptal" : "+ Deneyim Paylaş"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <ExperienceForm
          kategoriSlug={kategoriSlug}
          marka={marka}
          model={model}
          kasaKod={kasaKod}
          yil={yil}
          onSubmit={() => setShowForm(false)}
        />
      )}

      {/* Reviews */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : allReviews.length === 0 ? (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-8 text-center">
          <p className="text-gray-400 text-sm mb-3">Bu araç için henüz deneyim paylaşılmamış.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#FF6000] text-white text-sm font-semibold rounded hover:bg-orange-700"
          >
            İlk deneyimi sen paylaş
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {allReviews.map((r) => (
            <div key={r.id} className="bg-white border border-[#E0E0E0] rounded-lg p-4">
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FF6000] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {r.kullanici[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#333]">{r.kullanici}</p>
                    <p className="text-xs text-gray-400">{r.tarih}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StarRating puan={r.puan} />
                  <span className={`text-xs px-2 py-0.5 rounded border ${SENTIMENT_COLOR[r.sentimentType]}`}>
                    {SENTIMENT_LABEL[r.sentimentType]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h4 className="text-sm font-bold text-[#333] mb-1">{r.baslik}</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{r.icerik}</p>

              {/* Pros / Cons */}
              <div className="grid grid-cols-2 gap-3">
                {r.olumlu.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-green-600 mb-1">✅ Olumlu</p>
                    <ul className="space-y-0.5">
                      {r.olumlu.map((o, i) => (
                        <li key={i} className="text-xs text-gray-500">• {o}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {r.olumsuz.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-red-500 mb-1">❌ Olumsuz</p>
                    <ul className="space-y-0.5">
                      {r.olumsuz.map((o, i) => (
                        <li key={i} className="text-xs text-gray-500">• {o}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { SampleReview } from "@/lib/sample-reviews";
import { SENTIMENT_COLOR, SENTIMENT_LABEL } from "@/lib/categories";
import { getSourceMeta } from "@/lib/source-types";
import ExperienceForm from "./ExperienceForm";

interface ReviewSectionProps {
  kategoriSlug: string;
  marka: string;
  model: string;
  kasaKod: string;
  yil: number;
}

const PAGE_SIZE = 10;

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
  const [reviews, setReviews] = useState<SampleReview[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      marka,
      model,
      kategori: kategoriSlug,
      limit: String(PAGE_SIZE),
      page: String(page),
    });
    // İlk yüklemede kasaTip filtresi uygulamıyoruz; daha geniş kalsın.
    fetch(`/api/reviews?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setReviews(d.reviews ?? []);
        setTotal(d.total ?? 0);
      })
      .catch(() => {
        setReviews([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [kategoriSlug, marka, model, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mt-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#333]">
          Kullanıcı Deneyimleri
          {total > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400">({total})</span>
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
      ) : reviews.length === 0 ? (
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
        <>
          <div className="space-y-3">
            {reviews.map((r) => {
              const src = getSourceMeta(r.kullanici, r.sentimentType, r.verified);
              return (
              <div key={r.id} className="bg-white border border-[#E0E0E0] rounded-lg p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                      style={{ backgroundColor: `${src.color}22`, border: `1px solid ${src.color}55` }}
                    >
                      {src.emoji}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#333]" style={{ color: src.color }}>
                        {src.label}
                      </p>
                      <p className="text-xs text-gray-400">{r.tarih}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StarRating puan={r.puan} />
                    {r.sentimentType && SENTIMENT_LABEL[r.sentimentType] && (
                      <span className={`text-xs px-2 py-0.5 rounded border ${SENTIMENT_COLOR[r.sentimentType]}`}>
                        {SENTIMENT_LABEL[r.sentimentType]}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#333] mb-1">{r.baslik}</h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{r.icerik}</p>

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

                {r.kaynakUrl && (
                  <a
                    href={r.kaynakUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs text-[#FF6000] hover:underline"
                  >
                    Kaynak: izle ↗
                  </a>
                )}
              </div>
            );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border border-[#E0E0E0] rounded text-xs disabled:opacity-40 hover:bg-gray-100"
              >
                ← Önceki
              </button>
              <span className="text-xs text-gray-500">
                Sayfa {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border border-[#E0E0E0] rounded text-xs disabled:opacity-40 hover:bg-gray-100"
              >
                Sonraki →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

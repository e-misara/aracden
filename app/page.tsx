"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FilterPanel from "@/components/FilterPanel";
import ReviewSection from "@/components/ReviewSection";
import { ALL_CATEGORIES } from "@/lib/categories";
import { getVehicleImage } from "@/lib/vehicle-images";

interface Selection {
  marka: string;
  model: string;
  kasaTip: string;
  motor?: string;
}

export default function Home() {
  const [aktifKategori, setAktifKategori] = useState("otomobil");
  const [secim, setSecim] = useState<Selection | null>(null);

  const handleKategoriDegis = (slug: string) => {
    setAktifKategori(slug);
    setSecim(null);
  };

  const handleSecim = (marka: string, model: string, kasaTip: string, motor?: string) => {
    setSecim({ marka, model, kasaTip, motor });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />

      {/* Kategori sekmeleri */}
      <div className="bg-white border-b border-[#E0E0E0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleKategoriDegis(cat.slug)}
                className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  aktifKategori === cat.slug
                    ? "border-[#FF6000] text-[#FF6000]"
                    : "border-transparent text-[#333] hover:text-[#FF6000] hover:border-orange-200"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ana içerik */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sol: Filtre paneli */}
          <div className="lg:col-span-1 space-y-4">
            <FilterPanel
              key={aktifKategori}
              kategoriSlug={aktifKategori}
              onSelect={handleSecim}
            />

            {/* Hızlı istatistik kutusu */}
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-4">
              <h3 className="text-xs font-bold text-[#333] uppercase tracking-wide mb-3">Nasıl Çalışır?</h3>
              <ol className="space-y-2 text-xs text-gray-500">
                <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#FF6000] text-white flex items-center justify-center flex-shrink-0 font-bold">1</span>Kategori seç</li>
                <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#FF6000] text-white flex items-center justify-center flex-shrink-0 font-bold">2</span>Marka → Model → Kasa seç</li>
                <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#FF6000] text-white flex items-center justify-center flex-shrink-0 font-bold">3</span>Gerçek kullanıcı yorumlarını oku</li>
                <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#FF6000] text-white flex items-center justify-center flex-shrink-0 font-bold">4</span>Kendi deneyimini paylaş</li>
              </ol>
            </div>
          </div>

          {/* Sağ: Araç kartı + yorumlar */}
          <div className="lg:col-span-2">
            {!secim ? (
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-12 text-center">
                <div className="text-5xl mb-4">
                  {ALL_CATEGORIES.find((c) => c.slug === aktifKategori)?.emoji ?? "🚗"}
                </div>
                <h2 className="text-lg font-bold text-[#333] mb-2">
                  {ALL_CATEGORIES.find((c) => c.slug === aktifKategori)?.label} araç seçin
                </h2>
                <p className="text-sm text-gray-400">
                  Soldaki filtreden marka, model ve yıl seçerek gerçek kullanıcı yorumlarına ulaşın.
                </p>
              </div>
            ) : (
              <div>
                {/* Araç kart başlığı */}
                <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden mb-4">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-72 h-44 flex-shrink-0 overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getVehicleImage(secim.marka, secim.model, secim.kasaTip, aktifKategori)}
                        alt={`${secim.marka} ${secim.model} ${secim.kasaTip}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const slug = aktifKategori === "arazi-suv" ? "suv" : aktifKategori === "minivan-panelvan" ? "minivan" : aktifKategori;
                          (e.target as HTMLImageElement).src = `/images/ph-${slug}.jpg`;
                        }}
                      />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                            {ALL_CATEGORIES.find((c) => c.slug === aktifKategori)?.label}
                          </p>
                          <h1 className="text-xl font-extrabold text-[#333] mt-0.5">
                            {secim.marka} {secim.model}
                          </h1>
                          <p className="text-sm text-gray-400 mt-0.5">
                            {secim.kasaTip}{secim.motor ? ` · ${secim.motor}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Yorum bölümü */}
                <ReviewSection
                  kategoriSlug={aktifKategori}
                  marka={secim.marka}
                  model={secim.model}
                  kasaKod={secim.kasaTip}
                  yil={0}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

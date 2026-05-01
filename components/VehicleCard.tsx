"use client";

import Link from "next/link";
import { getVehicleImage } from "@/lib/vehicle-images";

interface VehicleCardProps {
  kategoriSlug: string;
  marka: string;
  model: string;
  kasaKod: string;
  kasaYillar: [number, number];
  yorumSayisi?: number;
  ortalamaPuan?: number;
}

export default function VehicleCard({
  kategoriSlug,
  marka,
  model,
  kasaKod,
  kasaYillar,
  yorumSayisi = 0,
  ortalamaPuan = 0,
}: VehicleCardProps) {
  const imgUrl = getVehicleImage(marka, model, kasaKod, kategoriSlug);
  const href = `/${kategoriSlug}/${encodeURIComponent(marka)}/${encodeURIComponent(model)}`;

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgUrl}
        alt={`${marka} ${model} ${kasaKod}`}
        className="w-full h-44 object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `/images/ph-${kategoriSlug === "arazi-suv" ? "suv" : kategoriSlug === "minivan-panelvan" ? "minivan" : kategoriSlug}.jpg`;
        }}
      />
      <div className="p-3">
        <p className="text-xs text-gray-400 font-medium">{kasaKod}</p>
        <h3 className="font-bold text-[#333] text-sm mt-0.5">{marka} {model}</h3>
        <p className="text-xs text-gray-400">{kasaYillar[0]} – {kasaYillar[1]}</p>

        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          {ortalamaPuan > 0 && (
            <span className="flex items-center gap-0.5">
              ⭐ <span className="font-semibold">{ortalamaPuan.toFixed(1)}</span>
            </span>
          )}
          {yorumSayisi > 0 && <span>{yorumSayisi} yorum</span>}
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            href={href}
            className="flex-1 text-center py-1.5 border border-[#FF6000] text-[#FF6000] rounded text-xs font-semibold hover:bg-orange-50 transition-colors"
          >
            Yorumları Gör
          </Link>
          <Link
            href="/write"
            className="flex-1 text-center py-1.5 bg-[#FF6000] text-white rounded text-xs font-semibold hover:bg-orange-700 transition-colors"
          >
            + Deneyim Yaz
          </Link>
        </div>
      </div>
    </div>
  );
}

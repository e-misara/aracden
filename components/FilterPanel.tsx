"use client";

import { useState, useMemo } from "react";
import { KATEGORILER } from "@/lib/vehicles-data";
import { getVehicleImage } from "@/lib/vehicle-images";

interface FilterPanelProps {
  kategoriSlug: string;
  onSelect: (marka: string, model: string, yil: number, kasaKod: string) => void;
}

export default function FilterPanel({ kategoriSlug, onSelect }: FilterPanelProps) {
  const [seciliMarka, setSeciliMarka] = useState("");
  const [seciliModel, setSeciliModel] = useState("");
  const [seciliYil, setSeciliYil] = useState("");

  const kategori = KATEGORILER.find((k) => k.slug === kategoriSlug);
  const markalar = kategori?.markalar ?? [];

  const markaObj = markalar.find((m) => m.ad === seciliMarka);
  const modeller = markaObj?.modeller ?? [];

  const modelObj = modeller.find((m) => m.ad === seciliModel);

  const yillar = useMemo(() => {
    if (!modelObj) return [];
    const set = new Set<number>();
    modelObj.kasalar.forEach((k) => {
      for (let y = k.yillar[0]; y <= k.yillar[1]; y++) set.add(y);
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [modelObj]);

  const kasaResim = useMemo(() => {
    if (!seciliMarka || !seciliModel || !seciliYil || !modelObj) return null;
    const yil = parseInt(seciliYil);
    const kasa = modelObj.kasalar.find((k) => yil >= k.yillar[0] && yil <= k.yillar[1]);
    if (!kasa) return null;
    return {
      kasa,
      url: getVehicleImage(seciliMarka, seciliModel, kasa.kod, kategoriSlug),
    };
  }, [seciliMarka, seciliModel, seciliYil, modelObj, kategoriSlug]);

  // Auto-trigger when all three are selected
  const handleYilChange = (yil: string) => {
    setSeciliYil(yil);
    if (!yil || !seciliMarka || !seciliModel || !modelObj) return;
    const yilNum = parseInt(yil);
    const kasa = modelObj.kasalar.find((k) => yilNum >= k.yillar[0] && yilNum <= k.yillar[1]);
    if (kasa) onSelect(seciliMarka, seciliModel, yilNum, kasa.kod);
  };

  const selectClass = "border border-[#E0E0E0] rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#FF6000] text-[#333]";

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 space-y-4">
      {/* Dropdowns */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold text-[#333] mb-1">Marka</label>
          <select
            value={seciliMarka}
            onChange={(e) => { setSeciliMarka(e.target.value); setSeciliModel(""); setSeciliYil(""); }}
            className={selectClass + " w-full"}
          >
            <option value="">Marka seçin</option>
            {markalar.map((m) => <option key={m.ad} value={m.ad}>{m.ad}</option>)}
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold text-[#333] mb-1">Model</label>
          <select
            value={seciliModel}
            onChange={(e) => { setSeciliModel(e.target.value); setSeciliYil(""); }}
            disabled={!seciliMarka}
            className={selectClass + " w-full disabled:bg-gray-50 disabled:text-gray-400"}
          >
            <option value="">Model seçin</option>
            {modeller.map((m) => <option key={m.ad} value={m.ad}>{m.ad}</option>)}
          </select>
        </div>

        <div className="flex-1 min-w-[110px]">
          <label className="block text-xs font-semibold text-[#333] mb-1">Yıl</label>
          <select
            value={seciliYil}
            onChange={(e) => handleYilChange(e.target.value)}
            disabled={!seciliModel}
            className={selectClass + " w-full disabled:bg-gray-50 disabled:text-gray-400"}
          >
            <option value="">Yıl seçin</option>
            {yillar.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Kasa resmi önizleme */}
      {kasaResim && (
        <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
          <div className="bg-[#F5F5F5] px-3 py-1.5 flex items-center gap-2 border-b border-[#E0E0E0]">
            <span className="text-xs font-semibold text-[#333]">{seciliMarka} {seciliModel}</span>
            <span className="text-xs text-gray-400">
              • {kasaResim.kasa.kod} ({kasaResim.kasa.yillar[0]}–{kasaResim.kasa.yillar[1]})
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={kasaResim.url}
            alt={`${seciliMarka} ${seciliModel} ${kasaResim.kasa.kod}`}
            className="w-full h-52 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `/images/ph-${kategoriSlug === "arazi-suv" ? "suv" : kategoriSlug === "minivan-panelvan" ? "minivan" : kategoriSlug}.jpg`;
            }}
          />
        </div>
      )}
    </div>
  );
}

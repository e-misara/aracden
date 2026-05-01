"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { vehiclesData, type SahibindenMarka } from "@/lib/vehicles-data";
import { getVehicleImage } from "@/lib/vehicle-images";

interface FilterPanelProps {
  kategoriSlug: string;
  onSelect: (marka: string, model: string, kasaTip: string, motor?: string) => void;
  withUrl?: boolean;
}

function getMarkalar(slug: string): SahibindenMarka[] {
  switch (slug) {
    case "otomobil":        return vehiclesData.otomobil.markalar;
    case "arazi-suv":       return vehiclesData.araziSuv.markalar;
    case "motosiklet":      return vehiclesData.motosiklet.markalar;
    case "minivan-panelvan":return vehiclesData.minivanPanelvan.markalar;
    default:                return [];
  }
}

export default function FilterPanel({ kategoriSlug, onSelect, withUrl = false }: FilterPanelProps) {
  const router = useRouter();

  const [seciliAltKat,  setSeciliAltKat]  = useState("");
  const [seciliMarka,   setSeciliMarka]   = useState("");
  const [seciliModel,   setSeciliModel]   = useState("");
  const [seciliKasaTip, setSeciliKasaTip] = useState("");
  const [seciliMotor,   setSeciliMotor]   = useState("");

  const isTicari = kategoriSlug === "ticari";
  const ticariAltKats = isTicari ? vehiclesData.ticariAraclar.altKategoriler : [];
  const ticariAltKatObj = ticariAltKats.find((k) => k.slug === seciliAltKat);

  const markalar = isTicari ? (ticariAltKatObj?.markalar ?? []) : getMarkalar(kategoriSlug);
  const markaObj   = markalar.find((m) => m.marka === seciliMarka);
  const modeller   = markaObj?.modeller ?? [];
  const modelObj   = modeller.find((m) => m.model === seciliModel);
  const kasaTipleri = modelObj?.kasaTipleri ?? [];
  const kasaTipObj  = kasaTipleri.find((k) => k.tip === seciliKasaTip);
  const motorlar    = kasaTipObj?.motorlar ?? [];

  const resetFrom = (level: "altkat" | "marka" | "model" | "kasa") => {
    if (level === "altkat") { setSeciliMarka(""); setSeciliModel(""); setSeciliKasaTip(""); setSeciliMotor(""); }
    if (level === "marka")  { setSeciliModel(""); setSeciliKasaTip(""); setSeciliMotor(""); }
    if (level === "model")  { setSeciliKasaTip(""); setSeciliMotor(""); }
    if (level === "kasa")   { setSeciliMotor(""); }
  };

  const handleMarkaChange = (marka: string) => {
    setSeciliMarka(marka);
    resetFrom("marka");
    if (withUrl) router.push(marka ? `/${kategoriSlug}/${encodeURIComponent(marka)}` : `/${kategoriSlug}`);
  };

  const handleModelChange = (model: string) => {
    setSeciliModel(model);
    resetFrom("model");
    if (withUrl && seciliMarka && model) {
      router.push(`/${kategoriSlug}/${encodeURIComponent(seciliMarka)}/${encodeURIComponent(model)}`);
    }
  };

  const handleKasaTipChange = (tip: string) => {
    setSeciliKasaTip(tip);
    resetFrom("kasa");
    if (!tip) return;
    const kasa = modelObj?.kasaTipleri.find((k) => k.tip === tip);
    if (!kasa?.motorlar?.length) {
      // No motors → trigger immediately
      onSelect(seciliMarka, seciliModel, tip, undefined);
    }
  };

  const handleMotorChange = (motor: string) => {
    setSeciliMotor(motor);
    if (motor) onSelect(seciliMarka, seciliModel, seciliKasaTip, motor);
  };

  const phSlug = kategoriSlug === "arazi-suv" ? "suv" : kategoriSlug === "minivan-panelvan" ? "minivan" : kategoriSlug;
  const showPreview = !!(seciliMarka && seciliModel && seciliKasaTip);
  const imageUrl = showPreview
    ? getVehicleImage(seciliMarka, seciliModel, seciliKasaTip, kategoriSlug)
    : null;

  const sc = "border border-[#E0E0E0] rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#FF6000] text-[#333]";
  const disabled = sc + " disabled:bg-gray-50 disabled:text-gray-400";

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 space-y-4">
      <div className="flex flex-wrap gap-3 items-end">

        {/* Ticari: alt kategori seçimi */}
        {isTicari && (
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-semibold text-[#333] mb-1">Araç Türü</label>
            <select
              value={seciliAltKat}
              onChange={(e) => { setSeciliAltKat(e.target.value); resetFrom("altkat"); }}
              className={sc + " w-full"}
            >
              <option value="">Tür seçin</option>
              {ticariAltKats.map((k) => (
                <option key={k.slug} value={k.slug}>
                  {k.ad} ({k.ilanSayisi.toLocaleString("tr-TR")} ilan)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Marka */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold text-[#333] mb-1">Marka</label>
          <select
            value={seciliMarka}
            onChange={(e) => handleMarkaChange(e.target.value)}
            disabled={isTicari && !seciliAltKat}
            className={disabled + " w-full"}
          >
            <option value="">Marka seçin</option>
            {markalar.map((m) => <option key={m.marka} value={m.marka}>{m.marka}</option>)}
          </select>
        </div>

        {/* Model */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold text-[#333] mb-1">Model</label>
          <select
            value={seciliModel}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={!seciliMarka}
            className={disabled + " w-full"}
          >
            <option value="">Model seçin</option>
            {modeller.map((m) => <option key={m.model} value={m.model}>{m.model}</option>)}
          </select>
        </div>

        {/* Kasa Tipi */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-xs font-semibold text-[#333] mb-1">Kasa</label>
          <select
            value={seciliKasaTip}
            onChange={(e) => handleKasaTipChange(e.target.value)}
            disabled={!seciliModel}
            className={disabled + " w-full"}
          >
            <option value="">Kasa seçin</option>
            {kasaTipleri.map((k) => <option key={k.tip} value={k.tip}>{k.tip}</option>)}
          </select>
        </div>

        {/* Motor — sadece seçili kasanın motorları varsa göster */}
        {motorlar.length > 0 && (
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-[#333] mb-1">Motor</label>
            <select
              value={seciliMotor}
              onChange={(e) => handleMotorChange(e.target.value)}
              className={sc + " w-full"}
            >
              <option value="">Motor seçin</option>
              {motorlar.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Araç önizleme */}
      {showPreview && imageUrl && (
        <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
          <div className="bg-[#F5F5F5] px-3 py-1.5 flex items-center gap-2 border-b border-[#E0E0E0] flex-wrap">
            <span className="text-xs font-semibold text-[#333]">{seciliMarka} {seciliModel}</span>
            <span className="text-xs text-gray-400">• {seciliKasaTip}</span>
            {seciliMotor && <span className="text-xs text-gray-400">• {seciliMotor}</span>}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`${seciliMarka} ${seciliModel} ${seciliKasaTip}`}
            className="w-full h-52 object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = `/images/ph-${phSlug}.jpg`; }}
          />
        </div>
      )}
    </div>
  );
}

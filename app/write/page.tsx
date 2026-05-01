"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { KATEGORILER } from "@/lib/vehicles-data";
import { getVehicleImage } from "@/lib/vehicle-images";

const FUEL_TYPES = ["Benzin", "Dizel", "Elektrik", "Hibrit", "LPG"];

const CATEGORY_MAP: Record<string, string> = {
  otomobil: "OTOMOBIL",
  "arazi-suv": "ARAZI_SUV",
  motosiklet: "MOTOSIKLET",
  "minivan-panelvan": "MINIVAN",
  ticari: "TICARI",
};

export default function WritePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    kategoriSlug: "",
    brand: "",
    model: "",
    year: "",
    fuelType: "",
    kmUsed: "",
    usagePeriod: "",
    sentimentType: "",
    title: "",
    body: "",
    tags: "",
  });
  const [enhancing, setEnhancing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/write");
    }
  }, [status, router]);

  if (status === "loading" || !session) return null;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const kategoriObj = KATEGORILER.find((k) => k.slug === form.kategoriSlug);
  const markalar = kategoriObj?.markalar ?? [];
  const markaObj = markalar.find((m) => m.ad === form.brand);
  const modeller = markaObj?.modeller ?? [];
  const modelObj = modeller.find((m) => m.ad === form.model);

  const yillar = useMemo(() => {
    if (!modelObj) return [];
    const set = new Set<number>();
    modelObj.kasalar.forEach((k) => {
      for (let y = k.yillar[0]; y <= k.yillar[1]; y++) set.add(y);
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [modelObj]);

  const kasaResim = useMemo(() => {
    if (!form.brand || !form.model || !form.year || !modelObj) return null;
    const yil = parseInt(form.year);
    const kasa = modelObj.kasalar.find((k) => yil >= k.yillar[0] && yil <= k.yillar[1]);
    if (!kasa) return null;
    return { kasa, url: getVehicleImage(form.brand, form.model, kasa.kod, form.kategoriSlug) };
  }, [form.brand, form.model, form.year, form.kategoriSlug, modelObj]);

  const handleEnhance = async () => {
    setEnhancing(true);
    const res = await fetch("/api/ai-edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: form.body }),
    });
    const data = await res.json();
    if (data.edited) set("body", data.edited);
    setEnhancing(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const tags = form.tags.split(/[\s,]+/).filter(Boolean);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: CATEGORY_MAP[form.kategoriSlug] ?? "OTOMOBIL",
        brand: form.brand,
        model: form.model,
        year: parseInt(form.year),
        fuelType: form.fuelType,
        kmUsed: form.kmUsed,
        usagePeriod: form.usagePeriod,
        sentimentType: form.sentimentType,
        title: form.title,
        body: form.body,
        tags,
      }),
    });
    const post = await res.json();
    router.push(`/post/${post.id}`);
  };

  const stepTitle = ["Kategori", "Araç", "Deneyim Türü", "İçerik"];
  const inputClass = "w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF6000]";

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {stepTitle.map((title, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-[#FF6000] text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? "text-[#FF6000]" : "text-gray-400"}`}>
                {title}
              </span>
              {i < 3 && <div className="flex-1 h-px bg-gray-200 w-8" />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
          {/* Step 1: Kategori */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold mb-4 text-[#333]">Kategori Seçin</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {KATEGORILER.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => { set("kategoriSlug", cat.slug); set("brand", ""); set("model", ""); set("year", ""); setStep(2); }}
                    className={`border-2 rounded-lg p-4 text-center font-semibold transition-colors ${
                      form.kategoriSlug === cat.slug
                        ? "border-[#FF6000] bg-orange-50 text-[#FF6000]"
                        : "border-[#E0E0E0] hover:border-[#FF6000] hover:bg-orange-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.emoji}</div>
                    <div className="text-xs">{cat.ad}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Araç */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4 text-[#333]">Araç Bilgileri</h2>

              <div>
                <label className="block text-xs font-semibold text-[#333] mb-1">Marka</label>
                <select value={form.brand} onChange={(e) => { set("brand", e.target.value); set("model", ""); set("year", ""); }} className={inputClass}>
                  <option value="">Marka seçin</option>
                  {markalar.map((m) => <option key={m.ad} value={m.ad}>{m.ad}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333] mb-1">Model</label>
                <select value={form.model} onChange={(e) => { set("model", e.target.value); set("year", ""); }} disabled={!form.brand} className={inputClass + " disabled:bg-gray-50 disabled:text-gray-400"}>
                  <option value="">Model seçin</option>
                  {modeller.map((m) => <option key={m.ad} value={m.ad}>{m.ad}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333] mb-1">Yıl</label>
                <select value={form.year} onChange={(e) => set("year", e.target.value)} disabled={!form.model} className={inputClass + " disabled:bg-gray-50 disabled:text-gray-400"}>
                  <option value="">Yıl seçin</option>
                  {yillar.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* Kasa önizleme */}
              {kasaResim && (
                <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
                  <div className="bg-[#F5F5F5] px-3 py-1.5 flex items-center gap-2 border-b border-[#E0E0E0]">
                    <span className="text-xs font-semibold text-[#333]">{form.brand} {form.model}</span>
                    <span className="text-xs text-gray-400">• {kasaResim.kasa.kod} ({kasaResim.kasa.yillar[0]}–{kasaResim.kasa.yillar[1]})</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={kasaResim.url} alt={`${form.brand} ${form.model} ${kasaResim.kasa.kod}`} className="w-full h-44 object-cover"
                    onError={(e) => { const slug = form.kategoriSlug === "arazi-suv" ? "suv" : form.kategoriSlug === "minivan-panelvan" ? "minivan" : form.kategoriSlug; (e.target as HTMLImageElement).src = `/images/ph-${slug}.jpg`; }}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1">Yakıt Tipi</label>
                  <select value={form.fuelType} onChange={(e) => set("fuelType", e.target.value)} className={inputClass}>
                    <option value="">Seçin</option>
                    {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1">KM</label>
                  <input type="text" value={form.kmUsed} onChange={(e) => set("kmUsed", e.target.value)} className={inputClass} placeholder="Örn: 25.000 km" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#333] mb-1">Kullanım Süresi</label>
                  <input type="text" value={form.usagePeriod} onChange={(e) => set("usagePeriod", e.target.value)} className={inputClass} placeholder="Örn: 2 yıl 3 ay" />
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <button onClick={() => setStep(1)} className="px-4 py-2 border border-[#E0E0E0] rounded text-sm hover:bg-gray-50">← Geri</button>
                <button onClick={() => setStep(3)} disabled={!form.brand || !form.model || !form.year || !form.fuelType}
                  className="px-4 py-2 bg-[#FF6000] text-white rounded text-sm font-semibold hover:bg-orange-700 disabled:opacity-40">
                  Devam →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Deneyim türü */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold mb-4 text-[#333]">Deneyim Türünüzü Seçin</h2>
              <div className="space-y-3">
                {[
                  { value: "COMPLAINT", emoji: "😤", label: "Şikayet", desc: "Araçla ilgili bir sorun veya hayal kırıklığı." },
                  { value: "POSITIVE", emoji: "😊", label: "Olumlu Deneyim", desc: "Araçtan memnunsunuz, paylaşmak istiyorsunuz." },
                  { value: "TIP", emoji: "💡", label: "İpucu", desc: "Diğer kullanıcılara faydalı bir bilgi paylaşın." },
                ].map((s) => (
                  <button key={s.value} onClick={() => { set("sentimentType", s.value); setStep(4); }}
                    className={`w-full text-left border-2 rounded-lg p-4 transition-colors ${
                      form.sentimentType === s.value ? "border-[#FF6000] bg-orange-50" : "border-[#E0E0E0] hover:border-gray-300"
                    }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm text-[#333]">{s.label}</p>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="mt-4 px-4 py-2 border border-[#E0E0E0] rounded text-sm hover:bg-gray-50">← Geri</button>
            </div>
          )}

          {/* Step 4: İçerik */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4 text-[#333]">Deneyiminizi Yazın</h2>
              <div>
                <label className="block text-xs font-semibold text-[#333] mb-1">Başlık</label>
                <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} placeholder="Deneyiminizi özetleyen bir başlık" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#333]">Deneyiminiz</label>
                  <button onClick={handleEnhance} disabled={enhancing || !form.body}
                    className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 disabled:opacity-40">
                    {enhancing ? "Düzenleniyor…" : "✨ AI ile Düzenle"}
                  </button>
                </div>
                <textarea value={form.body} onChange={(e) => set("body", e.target.value)} rows={6}
                  className={inputClass + " resize-none"} placeholder="Deneyiminizi detaylı anlatın…" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#333] mb-1">
                  Etiketler <span className="text-gray-400">(boşluk veya virgülle ayırın)</span>
                </label>
                <input type="text" value={form.tags} onChange={(e) => set("tags", e.target.value)} className={inputClass} placeholder="Örn: Motor Yakit Servis" />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="px-4 py-2 border border-[#E0E0E0] rounded text-sm hover:bg-gray-50">← Geri</button>
                <button onClick={handleSubmit} disabled={submitting || !form.title || !form.body}
                  className="px-6 py-2 bg-[#FF6000] text-white rounded font-semibold text-sm hover:bg-orange-700 disabled:opacity-40">
                  {submitting ? "Gönderiliyor…" : "Paylaş"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

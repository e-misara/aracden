"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const BRANDS = ["TOGG", "Renault", "Honda", "Volkswagen", "Dacia", "Hyundai", "BMW", "Toyota", "Ford", "Skoda", "Mitsubishi", "Yamaha", "Diğer"];
const FUEL_TYPES = ["Benzin", "Dizel", "Elektrik", "Hibrit", "LPG"];
const YEARS = Array.from({ length: 15 }, (_, i) => 2025 - i);

export default function WritePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    category: "",
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

  const handleEnhance = async () => {
    setEnhancing(true);
    const res = await fetch("/api/ai/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, body: form.body }),
    });
    const data = await res.json();
    if (data.enhanced) set("body", data.enhanced);
    setEnhancing(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const tags = form.tags.split(/[\s,]+/).filter(Boolean);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tags }),
    });
    const post = await res.json();
    router.push(`/post/${post.id}`);
  };

  const stepTitle = ["Kategori", "Araç Bilgileri", "Deneyim Türü", "İçerik"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {stepTitle.map((title, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step > i + 1
                    ? "bg-green-500 text-white"
                    : step === i + 1
                    ? "bg-[#d0021b] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? "text-[#d0021b]" : "text-gray-400"}`}>
                {title}
              </span>
              {i < 3 && <div className="flex-1 h-px bg-gray-200 w-8" />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* Step 1: Category */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Kategori Seçin</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "OTOMOBIL", label: "🚗 Otomobil" },
                  { value: "SUV", label: "🚙 SUV" },
                  { value: "MOTOSIKLET", label: "🏍️ Motosiklet" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => { set("category", cat.value); setStep(2); }}
                    className={`border-2 rounded-lg p-4 text-center font-semibold transition-colors ${
                      form.category === cat.value
                        ? "border-[#d0021b] bg-red-50 text-[#d0021b]"
                        : "border-gray-200 hover:border-[#d0021b] hover:bg-red-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.label.split(" ")[0]}</div>
                    <div className="text-sm">{cat.label.split(" ").slice(1).join(" ")}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Car details */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Araç Bilgileri</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marka</label>
                  <select value={form.brand} onChange={(e) => set("brand", e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]">
                    <option value="">Seçiniz</option>
                    {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input type="text" value={form.model} onChange={(e) => set("model", e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]" placeholder="Örn: T10X" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yıl</label>
                  <select value={form.year} onChange={(e) => set("year", e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]">
                    <option value="">Seçiniz</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yakıt Tipi</label>
                  <select value={form.fuelType} onChange={(e) => set("fuelType", e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]">
                    <option value="">Seçiniz</option>
                    {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">KM</label>
                  <input type="text" value={form.kmUsed} onChange={(e) => set("kmUsed", e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]" placeholder="Örn: 25000 km" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kullanım Süresi</label>
                  <input type="text" value={form.usagePeriod} onChange={(e) => set("usagePeriod", e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]" placeholder="Örn: 1 yıl 6 ay" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <button onClick={() => setStep(1)} className="px-4 py-2 border rounded text-sm hover:bg-gray-50">← Geri</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!form.brand || !form.model || !form.year || !form.fuelType}
                  className="px-4 py-2 bg-[#d0021b] text-white rounded text-sm font-semibold hover:bg-red-700 disabled:opacity-40"
                >
                  Devam →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Sentiment */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Deneyim Türünüzü Seçin</h2>
              <div className="space-y-3">
                {[
                  { value: "COMPLAINT", emoji: "😤", label: "Şikayet", desc: "Araçla ilgili bir sorun veya hayal kırıklığı yaşadınız." },
                  { value: "POSITIVE", emoji: "😊", label: "Olumlu Deneyim", desc: "Araçtan memnunsunuz ve deneyiminizi paylaşmak istiyorsunuz." },
                  { value: "TIP", emoji: "💡", label: "İpucu", desc: "Diğer kullanıcılara faydalı bir bilgi paylaşmak istiyorsunuz." },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => { set("sentimentType", s.value); setStep(4); }}
                    className={`w-full text-left border-2 rounded-lg p-4 transition-colors ${
                      form.sentimentType === s.value
                        ? "border-[#d0021b] bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm">{s.label}</p>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="mt-4 px-4 py-2 border rounded text-sm hover:bg-gray-50">← Geri</button>
            </div>
          )}

          {/* Step 4: Content */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">İçeriğinizi Yazın</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]"
                  placeholder="Deneyiminizi özetleyen bir başlık"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Deneyiminiz</label>
                  <button
                    onClick={handleEnhance}
                    disabled={enhancing || !form.body}
                    className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 disabled:opacity-40 flex items-center gap-1"
                  >
                    {enhancing ? "İyileştiriliyor…" : "✨ AI ile İyileştir"}
                  </button>
                </div>
                <textarea
                  value={form.body}
                  onChange={(e) => set("body", e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b] resize-none"
                  placeholder="Deneyiminizi detaylı anlatın…"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Etiketler <span className="text-gray-400">(boşluk veya virgülle ayırın)</span>
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => set("tags", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]"
                  placeholder="Örn: Motor Yakit Servis"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="px-4 py-2 border rounded text-sm hover:bg-gray-50">← Geri</button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !form.title || !form.body}
                  className="px-6 py-2 bg-[#d0021b] text-white rounded font-semibold text-sm hover:bg-red-700 disabled:opacity-40"
                >
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

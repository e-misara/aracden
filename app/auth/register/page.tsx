"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CAR_OPTIONS = [
  "TOGG T10X", "Renault Clio", "Renault Megane", "Honda Civic", "Honda CB650R",
  "Volkswagen Golf", "Volkswagen Polo", "Dacia Duster", "Hyundai Tucson",
  "Hyundai i20", "BMW 320i", "BMW X3", "Toyota Corolla", "Toyota RAV4",
  "Ford Puma", "Ford Focus", "Skoda Octavia", "Mitsubishi Outlander",
  "Yamaha MT-07", "Yamaha R1", "Diğer",
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", ownedCar: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Kayıt başarısız.");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-6">
          <Link href="/" className="text-2xl font-extrabold text-[#d0021b]">
            AraçDen
          </Link>
          <p className="text-gray-500 text-sm mt-1">Yeni hesap oluşturun</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]"
              placeholder="Adınız Soyadınız"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]"
              placeholder="ornek@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aracınız <span className="text-gray-400">(isteğe bağlı)</span>
            </label>
            <select
              value={form.ownedCar}
              onChange={(e) => setForm({ ...form, ownedCar: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d0021b]"
            >
              <option value="">Seçiniz</option>
              {CAR_OPTIONS.map((car) => (
                <option key={car} value={car}>{car}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d0021b] text-white py-2 rounded font-semibold text-sm hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Kaydediliyor…" : "Kayıt Ol"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Zaten hesabınız var mı?{" "}
          <Link href="/auth/login" className="text-[#d0021b] font-semibold hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}

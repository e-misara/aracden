"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ALL_CATEGORIES } from "@/lib/categories";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[#0a0a0f]/85 border-b border-[#1e1e2e]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold tracking-tight text-white">AraçDen</span>
          <span className="text-[10px] font-mono-num text-[#ff6b00] uppercase tracking-[0.2em]">terminal</span>
        </Link>
        <nav className="flex items-center gap-1 text-xs">
          <Link href="/kronik" className="px-3 py-1.5 rounded text-[#8b8b9e] hover:text-white hover:bg-[#1a1a26] transition-colors">
            🚨 Kronik
          </Link>
          <Link href="/enler" className="px-3 py-1.5 rounded text-[#8b8b9e] hover:text-white hover:bg-[#1a1a26] transition-colors">
            🏆 Enler
          </Link>
          {session ? (
            <>
              <Link
                href="/write"
                className="ml-2 bg-[#ff6b00] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-orange-600"
              >
                + Deneyim
              </Link>
              <button onClick={() => signOut()} className="text-[#4a4a5e] hover:text-white px-2">
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-[#8b8b9e] hover:text-white px-3">
                Giriş
              </Link>
              <Link
                href="/auth/register"
                className="bg-[#ff6b00] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-orange-600"
              >
                Kayıt
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Category sub-nav */}
      <div className="border-t border-[#1e1e2e] bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto">
          {ALL_CATEGORIES.map((cat) => {
            const active = pathname.startsWith(`/${cat.slug}`);
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  active
                    ? "border-[#ff6b00] text-white"
                    : "border-transparent text-[#8b8b9e] hover:text-white"
                }`}
              >
                <span className="mr-1.5">{cat.emoji}</span>{cat.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ALL_CATEGORIES } from "@/lib/categories";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header>
      {/* Top bar */}
      <div className="bg-[#FF6000] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            AraçDen
          </Link>
          <nav className="flex items-center gap-3 text-sm font-semibold">
            <Link href="/kronik" className="hover:underline text-xs opacity-90">Kronik</Link>
            <Link href="/en-iyiler" className="hover:underline text-xs opacity-90">En İyiler</Link>
            {session ? (
              <>
                <Link
                  href="/write"
                  className="bg-white text-[#FF6000] px-3 py-1 rounded text-xs font-bold hover:bg-orange-50"
                >
                  + Deneyim Yaz
                </Link>
                <button onClick={() => signOut()} className="hover:underline text-xs opacity-80">
                  Çıkış
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:underline text-xs opacity-90">Giriş</Link>
                <Link
                  href="/auth/register"
                  className="bg-white text-[#FF6000] px-3 py-1 rounded text-xs font-bold hover:bg-orange-50"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Category subnav */}
      <div className="bg-[#E55500] border-b border-orange-900">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto">
          {ALL_CATEGORIES.map((cat) => {
            const active = pathname.startsWith(`/${cat.slug}`);
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                  active
                    ? "bg-white text-[#FF6000]"
                    : "text-white hover:bg-orange-700"
                }`}
              >
                {cat.emoji} {cat.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-[#d0021b] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          AraçDen
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/kronik" className="hover:underline">Kronik</Link>
          <Link href="/en-iyiler" className="hover:underline">En İyiler</Link>
          {session ? (
            <>
              <Link href="/write" className="bg-white text-[#d0021b] px-3 py-1 rounded hover:bg-red-50">
                Yaz
              </Link>
              <button onClick={() => signOut()} className="hover:underline">
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:underline">Giriş</Link>
              <Link href="/auth/register" className="bg-white text-[#d0021b] px-3 py-1 rounded hover:bg-red-50">
                Kayıt Ol
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

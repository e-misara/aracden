"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORY_EMOJI, CATEGORY_LABEL, categoryToSlug } from "@/lib/categories";
import type { CategoryTree } from "@/app/api/categories/route";

export default function CategorySidebar() {
  const pathname = usePathname();
  const [tree, setTree] = useState<CategoryTree>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: CategoryTree) => {
        setTree(data);
        // Auto-expand based on current path
        const parts = pathname.split("/").filter(Boolean);
        if (parts[0]) {
          const catKey = Object.keys(data).find(
            (k) => categoryToSlug(k) === parts[0]
          );
          if (catKey) {
            setExpanded((e) => ({ ...e, [catKey]: true }));
            if (parts[1]) setExpanded((e) => ({ ...e, [`${catKey}::${decodeURIComponent(parts[1])}`]: true }));
          }
        }
      });
  }, [pathname]);

  const toggle = (key: string) =>
    setExpanded((e) => ({ ...e, [key]: !e[key] }));

  const parts = pathname.split("/").filter(Boolean);
  const activeCatSlug = parts[0] || "";
  const activeBrand = parts[1] ? decodeURIComponent(parts[1]) : "";
  const activeModel = parts[2] ? decodeURIComponent(parts[2]) : "";

  const CAT_ORDER = ["OTOMOBIL", "SUV", "MOTOSIKLET"];
  const sortedCats = CAT_ORDER.filter((c) => tree[c]);

  return (
    <aside className="w-56 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded overflow-hidden sticky top-4">
        <div className="bg-[#d0021b] text-white text-xs font-bold px-3 py-2 uppercase tracking-wide">
          Kategoriler
        </div>

        {sortedCats.map((cat) => {
          const catSlug = categoryToSlug(cat);
          const isActiveCat = activeCatSlug === catSlug;
          const isCatExpanded = expanded[cat];
          const brands = tree[cat]?.brands || {};
          const sortedBrands = Object.entries(brands).sort((a, b) => b[1].count - a[1].count);

          return (
            <div key={cat} className="border-b border-gray-100 last:border-0">
              {/* Category row */}
              <div className="flex items-center">
                <Link
                  href={`/${catSlug}`}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 text-sm font-semibold hover:bg-red-50 hover:text-[#d0021b] transition-colors ${
                    isActiveCat && !activeBrand ? "text-[#d0021b] bg-red-50" : "text-gray-700"
                  }`}
                >
                  <span>{CATEGORY_EMOJI[cat]}</span>
                  <span>{CATEGORY_LABEL[cat]}</span>
                  <span className="ml-auto text-xs font-normal text-gray-400">
                    {tree[cat]?.count}
                  </span>
                </Link>
                <button
                  onClick={() => toggle(cat)}
                  className="px-2 py-2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  {isCatExpanded ? "▾" : "▸"}
                </button>
              </div>

              {/* Brand rows */}
              {isCatExpanded && (
                <div className="bg-gray-50">
                  {sortedBrands.map(([brand, brandData]) => {
                    const brandKey = `${cat}::${brand}`;
                    const isBrandExpanded = expanded[brandKey];
                    const isActiveBrand = isActiveCat && activeBrand === brand;
                    const models = Object.entries(brandData.models).sort((a, b) => b[1] - a[1]);

                    return (
                      <div key={brand}>
                        <div className="flex items-center pl-6">
                          <Link
                            href={`/${catSlug}/${encodeURIComponent(brand)}`}
                            className={`flex-1 flex items-center gap-1 px-2 py-1.5 text-xs hover:text-[#d0021b] transition-colors ${
                              isActiveBrand && !activeModel
                                ? "text-[#d0021b] font-bold"
                                : "text-gray-600"
                            }`}
                          >
                            {brand}
                            <span className="ml-auto text-gray-400">{brandData.count}</span>
                          </Link>
                          <button
                            onClick={() => toggle(brandKey)}
                            className="px-2 py-1.5 text-gray-400 hover:text-gray-600 text-xs"
                          >
                            {isBrandExpanded ? "▾" : "▸"}
                          </button>
                        </div>

                        {/* Model rows */}
                        {isBrandExpanded && (
                          <div>
                            {models.map(([model, count]) => {
                              const isActiveModel =
                                isActiveBrand && activeModel === model;
                              return (
                                <Link
                                  key={model}
                                  href={`/${catSlug}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}`}
                                  className={`flex items-center justify-between pl-10 pr-3 py-1 text-xs transition-colors ${
                                    isActiveModel
                                      ? "text-[#d0021b] font-bold bg-red-50"
                                      : "text-gray-500 hover:text-[#d0021b] hover:bg-red-50"
                                  }`}
                                >
                                  <span>• {model}</span>
                                  <span className="text-gray-400">{count}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getVehicleInfo } from "@/lib/vehicle-info";

// GET /api/specs/[marka]/[model] — Üretici resmi verisi
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ marka: string; model: string }> },
) {
  const { marka, model } = await ctx.params;
  const info = getVehicleInfo(decodeURIComponent(marka), decodeURIComponent(model));
  if (!info) {
    return NextResponse.json({ found: false }, { status: 404 });
  }
  return NextResponse.json({ found: true, info });
}

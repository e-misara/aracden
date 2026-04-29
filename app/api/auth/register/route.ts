import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, password, ownedCar } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Tüm alanları doldurun." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Bu e-posta zaten kayıtlı." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, passwordHash, ownedCar: ownedCar || null },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

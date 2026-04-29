import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/claude";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { brand, model } = await req.json();

  const posts = await prisma.post.findMany({
    where: { brand, model },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { title: true, body: true, sentimentType: true },
  });

  const postsText = posts
    .map((p) => `[${p.sentimentType}] ${p.title}: ${p.body}`)
    .join("\n\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system:
      "Sen aracDen'in AI analiz asistanisın. Arac sahiplerinin gercek deneyimlerini analiz et. Turkce, madde madde: guclu yonler, kronik sorunlar, genel oneri.",
    messages: [
      {
        role: "user",
        content: `Araç: ${brand} ${model}\n\nKullanıcı deneyimleri:\n${postsText}`,
      },
    ],
  });

  const analysis =
    message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ analysis });
}

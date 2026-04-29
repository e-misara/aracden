import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { anthropic } from "@/lib/claude";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, body } = await req.json();

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system:
      "Sen aracDen platformunun asistanisın. Kullanicinin arac deneyim taslağını daha anlasilir, net ve bilgilendirici hale getir. Turkce, maksimum 4 cumle, samimi ton. Sadece iyilestirilmis metni dondur.",
    messages: [
      {
        role: "user",
        content: `Başlık: ${title}\n\nİçerik: ${body}`,
      },
    ],
  });

  const enhanced =
    message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ enhanced });
}

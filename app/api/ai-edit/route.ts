import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/claude";
import { reviewEditPrompt } from "@/lib/review-prompt";

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text) return NextResponse.json({ error: "Metin gerekli" }, { status: 400 });

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: reviewEditPrompt(text),
      },
    ],
  });

  const edited = message.content[0].type === "text" ? message.content[0].text : text;
  return NextResponse.json({ edited });
}

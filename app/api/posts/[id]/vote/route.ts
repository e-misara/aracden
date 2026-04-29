import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { id: postId } = await params;
  const { type } = await req.json();

  const existing = await prisma.vote.findUnique({
    where: { postId_userId: { postId, userId: user.id } },
  });

  if (existing) {
    if (existing.type === type) {
      await prisma.vote.delete({ where: { id: existing.id } });
    } else {
      await prisma.vote.update({ where: { id: existing.id }, data: { type } });
    }
  } else {
    await prisma.vote.create({ data: { postId, userId: user.id, type } });
  }

  const [thumbsUp, thumbsDown] = await Promise.all([
    prisma.vote.count({ where: { postId, type: "up" } }),
    prisma.vote.count({ where: { postId, type: "down" } }),
  ]);

  await prisma.post.update({
    where: { id: postId },
    data: {
      thumbsUp,
      thumbsDown,
      isChronik: thumbsUp >= 30,
    },
  });

  return NextResponse.json({ thumbsUp, thumbsDown });
}

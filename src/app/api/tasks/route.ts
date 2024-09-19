import { db } from '@/db/client';
import { tasksTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const tasks = await db.select().from(tasksTable).all();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const { title, description, dueDate } = await request.json();
  await db.insert(tasksTable).values({ title, description, dueDate }).run();
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await db.delete(tasksTable).where(eq(tasksTable.id, id)).run();
  return NextResponse.json({ success: true });
}

import { db } from '@/db/client';
import { tasksTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const task = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, Number(params.id)))
    .get();
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { title, description, dueDate } = await request.json();
  await db
    .update(tasksTable)
    .set({ title, description, dueDate })
    .where(eq(tasksTable.id, Number(params.id)))
    .run();
  return NextResponse.json({ success: true });
}

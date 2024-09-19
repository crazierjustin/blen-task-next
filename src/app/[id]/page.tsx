import { db } from '@/db/client';
import { tasksTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function TaskDetail({ params }: { params: { id: string } }) {
  const task = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, Number(params.id)))
    .get();

  if (!task) return <p>Task not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">{task.title}</h1>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Due Date:</strong> {task.dueDate}
      </p>
      <div className="mt-4">
        <a href={`/${task.id}/edit`} className="btn btn-secondary">
          Edit Task
        </a>
        <button className="btn btn-danger ml-4" onClick={() => handleDelete(task.id)}>
          Delete Task
        </button>
      </div>
    </div>
  );

  async function handleDelete(id: number) {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    window.location.href = '/';
  }
}

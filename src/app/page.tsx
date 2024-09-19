import { db } from '@/db/client';
import { tasksTable } from '@/db/schema';

export default async function TaskList() {
  const tasks = await db.select().from(tasksTable).all();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border-b py-2">
            <a href={`/${task.id}`} className="text-blue-600">
              {task.title} - {task.dueDate}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <a href="/add" className="btn btn-primary">
          Add New Task
        </a>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditTask({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchTask() {
      const res = await fetch(`/api/tasks/${params.id}`);
      const task = await res.json();
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
    fetchTask();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/tasks/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate }),
    });

    if (response.ok) {
      router.push('/');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold">Title</label>
          <input
            className="form-input mt-1 block w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold">Description</label>
          <textarea
            className="form-input mt-1 block w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold">Due Date</label>
          <input
            className="form-input mt-1 block w-full"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

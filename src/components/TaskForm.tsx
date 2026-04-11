import { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string, description: string) => Promise<void>;
  isLoading?: boolean;
}

export function TaskForm({ onAddTask, isLoading = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setSubmitting(true);
    try {
      await onAddTask(title, description);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add task:', error);
      alert('Failed to add task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form surface-card" enable-xr>
      <h2>Add a New Task</h2>

      <div className="form-group">
        <label htmlFor="task-title">Task Title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          disabled={submitting || isLoading}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description (optional)</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          disabled={submitting || isLoading}
          className="form-input"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={submitting || isLoading}
        className="submit-button"
      >
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number, completed: boolean) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
  isLoading = false,
}: TaskListProps) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="task-list-container">
      <div className="task-stats surface-chip" enable-xr>
        <div className="stat-item">
          <span className="stat-label">Completed:</span>
          <span className="stat-value">{completedCount}/{totalCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Progress:</span>
          <span className="stat-value">{completionPercentage}%</span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state surface-card" enable-xr>
          <p>No tasks yet. Add one to get started and grow your plant!</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card surface-card" enable-xr>
              <div className="task-checkbox-group">
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                  disabled={isLoading}
                  className="task-checkbox"
                />
                <label htmlFor={`task-${task.id}`} className="task-label">
                  <div className="task-title" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                  </div>
                  {task.description && (
                    <div className="task-description">{task.description}</div>
                  )}
                </label>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                disabled={isLoading}
                className="delete-button"
                title="Delete task"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

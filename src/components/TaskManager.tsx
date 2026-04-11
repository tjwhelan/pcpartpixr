import { useEffect, useState } from 'react';
import type { Task } from '../types/task';
import { taskService } from '../services/taskService';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { PlantContainer } from './PlantContainer';

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load tasks';
      setError(message);
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string, description: string) => {
    try {
      const newTask = await taskService.createTask(title, description);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add task';
      setError(message);
      console.error('Error adding task:', err);
      throw err;
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      const updatedTask = await taskService.updateTask(id, { completed });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task';
      setError(message);
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPercentage =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <main className="task-manager" enable-xr-monitor>
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="task-manager-layout">
        {/* Tasks Panel */}
        <section className="tasks-panel" enable-xr>
          <div className="panel-header">
            <h1>Task Manager</h1>
            <p className="panel-subtitle">Complete tasks to grow your plant!</p>
          </div>

          <TaskForm onAddTask={handleAddTask} isLoading={loading} />

          {loading ? (
            <div className="loading surface-card" enable-xr>
              Loading tasks...
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              isLoading={loading}
            />
          )}
        </section>

        {/* Plant Area */}
        <section className="plant-area" enable-xr>
          <div className="plant-header">
            <h2>Your Plant</h2>
            <p className="plant-subtitle">
              {tasks.length === 0
                ? 'Add tasks to grow your plant!'
                : `${completionPercentage}% complete`}
            </p>
          </div>
          <div className="plant-container">
            <PlantContainer completionPercentage={completionPercentage} />
          </div>
        </section>
      </div>
    </main>
  );
}

import { useCallback } from 'react';
import { Task, TaskFormData } from '../types/task';
import useLocalStorage from './useLocalStorage';

interface UseTasksReturn {
  tasks: Task[];
  addTask: (taskData: TaskFormData) => void;
  updateTask: (id: string, updates: Partial<TaskFormData>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskManagerTasks', []);

  const addTask = useCallback(
    (taskData: TaskFormData) => {
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<TaskFormData>) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  return { tasks, addTask, updateTask, deleteTask, toggleComplete };
};

export default useTasks;

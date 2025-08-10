import { Task, PriorityConfig, TaskStats, FilterType } from '../types/task';

const taskUtils = {
  generateId: (): string => Date.now().toString(),

  formatDate: (dateString?: string): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  isOverdue: (dueDate?: string, completed?: boolean): boolean => {
    if (!dueDate || completed) return false;
    return new Date(dueDate) < new Date();
  },

  getPriorityConfig: (priority: Task['priority']): PriorityConfig => {
    const configs: Record<Task['priority'], PriorityConfig> = {
      High: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
      Medium: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
      Low: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    };
    return configs[priority] || configs.Medium;
  },

  filterTasks: (tasks: Task[], filter: FilterType): Task[] => {
    switch (filter) {
      case 'Completed':
        return tasks.filter((task) => task.completed);
      case 'Pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  },

  getTaskStats: (tasks: Task[]): TaskStats => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  }),
};

export default taskUtils;
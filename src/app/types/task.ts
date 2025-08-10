// task.ts

// Defines the core Task structure used in the app
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}

// Used when creating or editing a task (does not include ID, completed, or createdAt)
export interface TaskFormData {
  title: string;
  description?: string; 
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string; 
}

// UI-related priority style configuration
export interface PriorityConfig {
  color: string;
  bg: string;
  border: string;
}

// Computed task statistics for display
export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

// Filter options for viewing tasks
export type FilterType = 'All' | 'Completed' | 'Pending';

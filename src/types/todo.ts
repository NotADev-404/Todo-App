export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health'] as const;
export type Category = typeof CATEGORIES[number];

export const PRIORITIES = ['low', 'medium', 'high'] as const;
export type Priority = typeof PRIORITIES[number];

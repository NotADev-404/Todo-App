import { create } from 'zustand';
import { Task, FilterType } from '../types/todo';

interface TodoStore {
  tasks: Task[];
  filter: FilterType;
  search: string;
  
  // Actions
  addTask: (text: string, category: string, priority: 'low' | 'medium' | 'high', dueDate?: string) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  reorderTasks: (fromIndex: number, toIndex: number) => void;
  setFilter: (filter: FilterType) => void;
  setSearch: (search: string) => void;
  
  // Computed
  getFilteredTasks: () => Task[];
}

const STORAGE_KEY = 'todo-app-tasks';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const useTodoStore = create<TodoStore>((set, get) => {
  // Load from localStorage on init
  const loadedTasks = localStorage.getItem(STORAGE_KEY);
  const initialTasks = loadedTasks ? JSON.parse(loadedTasks) : [];

  return {
    tasks: initialTasks,
    filter: 'all',
    search: '',

    addTask: (text, category, priority, dueDate) => {
      const newTask: Task = {
        id: generateId(),
        text,
        completed: false,
        category,
        priority,
        dueDate,
        createdAt: Date.now(),
      };

      set((state) => {
        const updatedTasks = [...state.tasks, newTask];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      });
    },

    deleteTask: (id) => {
      set((state) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      });
    },

    toggleComplete: (id) => {
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      });
    },

    updateTask: (id, updates) => {
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      });
    },

    reorderTasks: (fromIndex, toIndex) => {
      set((state) => {
        const tasks = [...state.getFilteredTasks()];
        const [movedTask] = tasks.splice(fromIndex, 1);
        tasks.splice(toIndex, 0, movedTask);
        
        // Rebuild full task list maintaining order
        const newTasks = [...state.tasks];
        
        // Create a map of filtered tasks in new order
        const orderedMap = new Map(tasks.map((t, i) => [t.id, i]));
        
        // Sort all tasks based on filtered order
        const reordered = newTasks.sort((a, b) => {
          const aOrder = orderedMap.get(a.id) ?? state.tasks.indexOf(a);
          const bOrder = orderedMap.get(b.id) ?? state.tasks.indexOf(b);
          return aOrder - bOrder;
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reordered));
        return { tasks: reordered };
      });
    },

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => set({ search }),

    getFilteredTasks: () => {
      const { tasks, filter, search } = get();
      
      let filtered = tasks;

      // Apply filter
      if (filter === 'active') {
        filtered = filtered.filter((task) => !task.completed);
      } else if (filter === 'completed') {
        filtered = filtered.filter((task) => task.completed);
      }

      // Apply search
      if (search.trim()) {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter((task) =>
          task.text.toLowerCase().includes(lowerSearch)
        );
      }

      return filtered;
    },
  };
});

import React from 'react';
import { TodoInput } from './TodoInput';
import { FilterBar } from './FilterBar';
import { TodoList } from './TodoList';
import { StatsDashboard } from './StatsDashboard';
import { useTodoStore } from '../store/todoStore';

export const TodoApp: React.FC = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-neon-cyan mb-2 drop-shadow-lg">
            Todo
          </h1>
          <p className="text-text-muted text-sm sm:text-base">
            {activeCount} active · {completedCount} completed
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <TodoInput />
          <StatsDashboard />
          <FilterBar />
          <TodoList />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-text-muted text-xs">
          <p>✨ Dark-Neo To-Do App • Double-click to edit • Drag to reorder • All tasks saved locally</p>
        </div>
      </div>
    </div>
  );
};

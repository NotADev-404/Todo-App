import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { CATEGORIES, PRIORITIES } from '../types/todo';

export const TodoInput: React.FC = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const addTask = useTodoStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, category, priority, dueDate || undefined);
      setText('');
      setCategory(CATEGORIES[0]);
      setPriority('medium');
      setDueDate('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="w-full mb-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Main input */}
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task... (Press Enter)"
            className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg focus-neon text-text-primary placeholder-text-muted transition-neon"
          />
        </div>

        {/* Category, priority, and date row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg focus-neon text-text-primary text-sm transition-neon"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg focus-neon text-text-primary text-sm transition-neon"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                Priority: {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg focus-neon text-text-primary text-sm transition-neon"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-neon-cyan text-dark-bg font-semibold rounded-lg hover:shadow-neon-cyan transition-neon disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!text.trim()}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

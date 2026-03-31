import React from 'react';
import { useTodoStore } from '../store/todoStore';
import { FilterType } from '../types/todo';

export const FilterBar: React.FC = () => {
  const filter = useTodoStore((state) => state.filter);
  const search = useTodoStore((state) => state.search);
  const setFilter = useTodoStore((state) => state.setFilter);
  const setSearch = useTodoStore((state) => state.setSearch);

  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="w-full mb-6 space-y-3">
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full px-4 py-2 bg-dark-card border border-dark-border rounded-lg focus-neon text-text-primary placeholder-text-muted text-sm transition-neon"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-neon ${
              filter === f
                ? 'bg-neon-cyan text-dark-bg shadow-neon-cyan'
                : 'bg-dark-card border border-dark-border text-text-primary hover:border-neon-cyan'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

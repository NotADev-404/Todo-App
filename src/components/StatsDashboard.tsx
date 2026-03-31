import React, { useMemo } from 'react';
import { useTodoStore } from '../store/todoStore';

export const StatsDashboard: React.FC = () => {
  const tasks = useTodoStore((state) => state.tasks);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    // Count by category
    const byCategory: Record<string, number> = {};
    tasks.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + 1;
    });

    // Count by priority
    const byPriority = {
      high: tasks.filter((t) => t.priority === 'high').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      low: tasks.filter((t) => t.priority === 'low').length,
    };

    // Count overdue
    const overdue = tasks.filter(
      (t) =>
        !t.completed &&
        t.dueDate &&
        new Date(t.dueDate) < new Date()
    ).length;

    return { total, completed, active, percentage, byCategory, byPriority, overdue };
  }, [tasks]);

  const StatCard: React.FC<{ label: string; value: string | number; color: string }> = ({
    label,
    value,
    color,
  }) => (
    <div className="p-3 bg-dark-card border border-dark-border rounded-lg">
      <p className="text-text-muted text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="w-full bg-dark-card border border-dark-border rounded-lg p-4 sm:p-6 mb-6">
      <h2 className="text-neon-cyan font-bold text-lg mb-4">📊 Statistics</h2>

      {/* Summary grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total" value={stats.total} color="text-neon-cyan" />
        <StatCard label="Active" value={stats.active} color="text-neon-lime" />
        <StatCard label="Completed" value={stats.completed} color="text-text-primary" />
        <StatCard label="Progress" value={`${stats.percentage}%`} color="text-neon-magenta" />
      </div>

      {/* Priority distribution */}
      <div className="mb-4">
        <p className="text-text-muted text-xs font-medium uppercase tracking-wide mb-2">
          By Priority
        </p>
        <div className="flex gap-2">
          <div className="flex-1 p-2 bg-dark-hover rounded border border-dark-border text-center">
            <p className="text-neon-magenta font-bold">{stats.byPriority.high}</p>
            <p className="text-xs text-text-muted">High</p>
          </div>
          <div className="flex-1 p-2 bg-dark-hover rounded border border-dark-border text-center">
            <p className="text-neon-cyan font-bold">{stats.byPriority.medium}</p>
            <p className="text-xs text-text-muted">Medium</p>
          </div>
          <div className="flex-1 p-2 bg-dark-hover rounded border border-dark-border text-center">
            <p className="text-text-muted font-bold">{stats.byPriority.low}</p>
            <p className="text-xs text-text-muted">Low</p>
          </div>
        </div>
      </div>

      {/* Category distribution */}
      <div>
        <p className="text-text-muted text-xs font-medium uppercase tracking-wide mb-2">
          By Category
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(stats.byCategory).map(([category, count]) => (
            <div key={category} className="p-2 bg-dark-hover rounded border border-dark-border text-center">
              <p className="text-neon-cyan font-bold">{count}</p>
              <p className="text-xs text-text-muted">{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overdue alert */}
      {stats.overdue > 0 && (
        <div className="mt-4 p-3 bg-neon-magenta bg-opacity-10 border border-neon-magenta rounded-lg">
          <p className="text-neon-magenta font-semibold text-sm">
            ⚠️ {stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

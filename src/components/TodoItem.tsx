import React, { useState, useRef, useMemo } from 'react';
import { Task, Priority } from '../types/todo';
import { useTodoStore } from '../store/todoStore';
import { CategoryBadge } from './CategoryBadge';

interface TodoItemProps {
  task: Task;
}

const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'text-neon-magenta';
    case 'medium':
      return 'text-neon-cyan';
    case 'low':
      return 'text-text-muted';
  }
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const TodoItem: React.FC<TodoItemProps & { index: number; onDragStart: (e: React.DragEvent, idx: number) => void }> = ({ task, index, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleComplete = useTodoStore((state) => state.toggleComplete);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const updateTask = useTodoStore((state) => state.updateTask);

  const isOverdue = useMemo(() => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && !task.completed;
  }, [task.dueDate, task.completed]);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      updateTask(task.id, { text: editText });
      setIsEditing(false);
    } else {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      className={`p-4 bg-dark-card border border-dark-border rounded-lg hover-glow transition-neon cursor-grab active:cursor-grabbing ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="w-5 h-5 mt-0.5 cursor-pointer accent-neon-cyan transition-neon"
        />

        {/* Task content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1 bg-dark-hover border border-neon-cyan rounded focus-neon text-text-primary text-sm"
            />
          ) : (
            <p
              onDoubleClick={() => setIsEditing(true)}
              className={`text-sm sm:text-base font-medium break-words cursor-pointer hover:text-neon-cyan transition-neon ${
                task.completed ? 'strikethrough' : 'text-text-primary'
              }`}
            >
              {task.text}
            </p>
          )}

          {/* Metadata row */}
          {!isEditing && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <CategoryBadge category={task.category as any} />

              {/* Priority */}
              <span className={`text-xs font-semibold ${getPriorityColor(task.priority)} uppercase`}>
                {task.priority}
              </span>

              {/* Due date */}
              {task.dueDate && (
                <span
                  className={`text-xs font-medium ${
                    isOverdue ? 'text-neon-magenta' : 'text-text-muted'
                  }`}
                >
                  {isOverdue ? '⚠ ' : '📅 '}
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Delete button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1 text-text-muted hover:text-neon-magenta transition-neon hover:bg-dark-hover rounded"
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const getFilteredTasks = useTodoStore((state) => state.getFilteredTasks);
  const reorderTasks = useTodoStore((state) => state.reorderTasks);
  const tasks = getFilteredTasks();

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      reorderTasks(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-3">✨</div>
        <p className="text-text-muted text-lg font-medium">No tasks yet</p>
        <p className="text-text-muted text-sm mt-1">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          className={`transition-colors ${
            dragOverIndex === index ? 'bg-dark-hover rounded-lg p-2' : ''
          }`}
        >
          <TodoItem
            task={task}
            index={index}
            onDragStart={handleDragStart}
          />
        </div>
      ))}
    </div>
  );
};

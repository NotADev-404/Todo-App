import React from 'react';
import { Category } from '../types/todo';

interface CategoryBadgeProps {
  category: Category;
}

const categoryColors: Record<Category, string> = {
  Work: 'bg-neon-cyan text-dark-bg',
  Personal: 'bg-neon-magenta text-dark-bg',
  Shopping: 'bg-neon-lime text-dark-bg',
  Health: 'bg-neon-purple text-dark-bg',
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <span className={`${categoryColors[category]} text-xs font-semibold px-2 py-1 rounded`}>
      {category}
    </span>
  );
};

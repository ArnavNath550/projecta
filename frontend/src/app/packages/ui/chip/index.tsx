import React, { ReactNode } from 'react';

interface ChipProps {
  label: string;
  size?: 's' | 'base' | 'l';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string; // Additional class names for custom styling
}

const sizeClasses = {
  s: 'text-xs px-2 py-1',
  base: 'text-sm px-3 py-1.5',
  l: 'text-md px-4 py-2',
};

export const Chip: React.FC<ChipProps> = ({
  label,
  size = 'base',
  icon,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1 hover:drop-shadow-md rounded-md border-[1px] border-surface-border bg-surface-lighter text-gray-800 ${sizeClasses[size]} ${className} cursor-pointer hover:bg-gray-300 transition-colors`}
      role="button"
      aria-label={label}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

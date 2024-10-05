import React, { ReactNode } from 'react';

interface ChipProps {
  label: string;
  size?: 's' | 'base' | 'l';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string; // Additional class names for custom styling
}

const sizeClasses = {
  s: 'text-[11px] p-1.5',
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
      className={`inline-flex items-center gap-1 hover:drop-shadow-md rounded-md border-[1px] border-surface-border text-gray-800 ${sizeClasses[size]} ${className} cursor-normal hover:bg-gray-300 transition-colors h-[23px]`}
      role="button"
      aria-label={label}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon}
    </div>
  );
};

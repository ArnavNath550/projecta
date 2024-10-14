import React, { ReactNode } from 'react';

interface ChipProps {
  label: string;
  size?: 's' | 'base' | 'l';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string; // Additional class names for custom styling
}

const sizeClasses = {
  s: 'text-[11px] p-2',
  base: 'text-[12px] p-3',
  l: 'text-md px-4 py-4',
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
      className={`inline-flex items-center cursor-default gap-1 hover:drop-shadow-md rounded-md hover:bg-[#18191d] border-[1px] border-surface-border text-gray-800 ${sizeClasses[size]} ${className} transition-colors h-[23px]`}
      role="button"
      aria-label={label}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon}
    </div>
  );
};

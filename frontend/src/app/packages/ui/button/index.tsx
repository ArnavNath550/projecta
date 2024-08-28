import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn'; // Optional utility for combining classes, if needed

// Define the button styles using cva
const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-md font-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed outline-none',
  {
    variants: {
      intent: {
        primary: 'bg-brand-color text-white border-[1px] border-brand-lighter-color hover:bg-brand-darker-color',
        secondary: 'border-[1px] border-surface-border bg-surface-lighter hover:bg-surface',
      },
      size: {
        s: 'px-2.5 py-1.5 text-xs',
        base: 'px-3.5 py-2 text-xs',
        l: 'px-5 py-2.5 text-base rounded-full text-sm',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'base',
    },
  }
);

// Define the Button component's props
interface ButtonProps extends VariantProps<typeof buttonStyles> {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

// Button component
const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  type = 'button',
  disabled,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(buttonStyles({ intent, size }))}
    >
      {children}
    </button>
  );
};

export default Button;
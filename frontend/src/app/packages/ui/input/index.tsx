import React from 'react';

// Define the props for the Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string; // id is required for accessibility
  variant?: 'default' | 'unstyled'; // Variant prop for styling,
  classes?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  variant?: 'default' | 'unstyled'; // Variant prop for styling
}

export const Input: React.FC<InputProps> = ({ label, id, variant = 'default', classes, ...inputProps }) => {
    const baseStyles =
    'outline-none resize-none rounded-md border-[1px] drop-shadow-sm transition-all';
  const defaultStyles = 'p-2 pl-3 pr-3  border-surface-lighter bg-background text-sm hover:drop-shadow-md hover:bg-background-darker';
  const unstyledStyles = 'border-none bg-transparent p-0 shadow-none font-medium text-2xl hover:shadow-none p-0';

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-regular text-on-surface"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${baseStyles} ${variant === 'default' ? defaultStyles : unstyledStyles} ${classes}`}
        {...inputProps}
      />
    </div>
  );
};

export const TextArea: React.FC<TextareaProps> = ({ label, id, variant = 'default', ...inputProps }) => {
    const baseStyles =
    'outline-none resize-none rounded-md border-[1px] drop-shadow-sm transition-all';
  const defaultStyles = 'p-2 pl-3 pr-3  border-surface-lighter bg-background text-sm hover:drop-shadow-md';
  const unstyledStyles = 'border-none bg-transparent p-0 shadow-none font-regular text-sm hover:shadow-none p-0';

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-regular text-on-surface"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`${baseStyles} ${variant === 'default' ? defaultStyles : unstyledStyles}`}
        {...inputProps}
      />
    </div>
  );
};


export const MiniInput: React.FC<InputProps> = ({ id, ...inputProps }) => {
  const baseStyles =
  'outline-none resize-none rounded-md border-[1px] drop-shadow-sm transition-all';
const unstyledStyles = 'border-none bg-transparent p-0 shadow-none font-normal text-sm outline-none hover:shadow-none p-0 pl-2 pr-2 caret-brand-color';

return (
  <div className="flex flex-col space-y-1">
    <input
      id={id}
      className={unstyledStyles}
      {...inputProps}
    />
  </div>
);
};
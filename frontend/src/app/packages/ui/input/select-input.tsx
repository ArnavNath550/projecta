import * as React from 'react';
import AnimatedDropdown from '../animatedDropdown';
import { PRIMARY_COLOURS } from '@/app/helpers';

// Define the props for the Input component
interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id: string; // id is required for accessibility
    variant?: 'default' | 'unstyled'; // Variant prop for styling,
    classes?: string;
    selectAction: any,
  }
  
  export const SelectInput: React.FC<SelectProps> = ({ label, id, variant = 'default', classes, selectAction, ...inputProps }) => {
      const baseStyles =
      'outline-none resize-none rounded-md border-[1px] drop-shadow-sm transition-all';
    const defaultStyles = 'p-2 pl-3 pr-3  border-surface-lighter bg-background text-sm hover:drop-shadow-md hover:bg-background-darker';
    const unstyledStyles = 'border-none bg-transparent p-0 shadow-none font-medium text-2xl hover:shadow-none p-0';
  
    return (
      <AnimatedDropdown 
        trigger={<div className="flex flex-col space-y-1 relative">
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
              disabled={true}
              {...inputProps}
            />
          </div>}
          dropdownItems={PRIMARY_COLOURS}
          itemAction={(value: string) => selectAction(value.toLowerCase())}
          />
    );
  };
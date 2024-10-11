import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface TooltipButtonProps {
  buttonContent: React.ReactNode;
  tooltipText?: React.ReactNode;
  keyboardShortcut?: string[];
  buttonClass?: string;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  buttonContent,
  tooltipText,
  keyboardShortcut,
  buttonClass = '',
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger className={buttonClass}>
          {buttonContent}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-on-surface-darker p-1 text-xs leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            {tooltipText && <div className="p-1">{tooltipText}</div>}
            {keyboardShortcut && (
              <div className="flex flex-row items-center">
                {keyboardShortcut.map((key, i) => (
                  <React.Fragment key={i}>
                    <div className="bg-[#3f424b] rounded-md p-1">{key}</div>
                    {i < keyboardShortcut.length - 1 && <span className="mx-1 text-on-surface">+</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipButton;

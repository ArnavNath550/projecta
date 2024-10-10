import React, { useState, useEffect } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { IconX } from '@tabler/icons-react';

interface AnimatedToastProps {
  title: string;
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  duration?: number; // in milliseconds
}

const AnimatedToast: React.FC<AnimatedToastProps> = ({ title, description, open, setOpen, duration = 5000 }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, setOpen]);

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className="bg-on-surface-darker border-[1px] border-surface-border rounded-md text-white p-3 drop-shadow-md rounded-lg shadow-lg flex items-center space-x-4 max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <ToastPrimitive.Title className="font-medium font-sm">{title}</ToastPrimitive.Title>
          <ToastPrimitive.Description className="text-xs">{description}</ToastPrimitive.Description>
        </div>
        <ToastPrimitive.Action asChild altText="Close">
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-gray-400 hover:text-gray-300"
          >
            <IconX size={12} />
          </button>
        </ToastPrimitive.Action>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2" />
    </ToastPrimitive.Provider>
  );
};

export default AnimatedToast;

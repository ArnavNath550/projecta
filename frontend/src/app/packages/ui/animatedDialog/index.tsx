import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTransition, animated } from 'react-spring';

type Props = {
  trigger: ReactNode,
  content: ReactNode,
  isOpen?: boolean,
  setIsOpen?: (openState: boolean) => void,
}

function AnimatedDialog({ trigger, content }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: 'scale(0.95)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.95)' },
    config: {
      tension: 250,
      friction: 18,
    },
  });

  return (  
<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#000] opacity-50 fixed inset-0" />
        {transition((style, item) =>
          item ? (
            <animated.div
              style={style}
              className="fixed inset-0 flex items-center justify-center"
            >
              <Dialog.Content className="max-h-[85vh] rounded-[8px] bg-[#101114] border-surface-border border-[1px] drop-shadow-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                {content}
              </Dialog.Content>
            </animated.div>
          ) : null
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AnimatedDialog;

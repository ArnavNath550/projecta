import * as React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useTransition, animated } from 'react-spring';

type Props = {
    trigger: React.ReactNode;
    content: React.ReactNode;
};

const AnimatedContextMenu: React.FC<Props> = (props: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Transition configuration for react-spring to scale out (shrink into place)
    const transitions = useTransition(isOpen, {
        from: { opacity: 0, transform: 'scale(0.05)' },  // Start larger
        enter: { opacity: 1, transform: 'scale(1)' },    // Shrink to normal size
        leave: { opacity: 0, transform: 'scale(0.05)' }, // Expand on exit
        config: { tension: 250, friction: 18 },
    });

    // Handle open state change when ContextMenu opens/closes
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <div>
            <ContextMenu.Root onOpenChange={handleOpenChange}>
                <ContextMenu.Trigger>
                    {props.trigger}
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                    {transitions((style, item) =>
                        item ? (
                            <animated.div style={style}>
                                <ContextMenu.Content
                                    className="p-[5px] w-full bg-on-surface-darker border-[1px] border-surface-border rounded-md"
                                    sideOffset={5}
                                    align="end"
                                >
                                    <ContextMenu.Item className="w-full pr-2 pl-2 pt-1.5 pb-1.5 rounded-md text-sm hover:bg-surface-lighter w-[150px]">
                                        Item #01
                                    </ContextMenu.Item>
                                    <ContextMenu.Item className="w-full pr-2 pl-2 pt-1.5 pb-1.5 rounded-md text-sm hover:bg-surface-lighter w-[150px]">
                                        Item #02
                                    </ContextMenu.Item>
                                    <ContextMenu.Item className="w-full pr-2 pl-2 pt-1.5 pb-1.5 rounded-md text-sm hover:bg-surface-lighter w-[150px]">
                                        Item #03
                                    </ContextMenu.Item>
                                </ContextMenu.Content>
                            </animated.div>
                        ) : null
                    )}
                </ContextMenu.Portal>
            </ContextMenu.Root>
        </div>
    );
};

export default AnimatedContextMenu;

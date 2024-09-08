import React, { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { IconX } from '@tabler/icons-react';

type Props = {
    trigger: ReactNode,
    content: ReactNode
}

function AnimatedDialog(props: Props) {
  return (
    <Dialog.Root>
    <Dialog.Trigger asChild>
      {props.trigger}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-[#000] opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-fadeIn fixed top-[50%] left-[50%] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded-[8px] bg-on-surface-darker border-surface-border border-[1px]  drop-shadow-mdshadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        {props.content}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}

export default AnimatedDialog
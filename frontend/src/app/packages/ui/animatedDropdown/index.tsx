import React, { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type Props = {
    trigger: ReactNode,
    content: ReactNode
}

const AnimatedDropdown = (props: Props) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState('pedro');

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <span>Trigger</span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-surface rounded-md p-[8px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade flex flex-col gap-1"
          sideOffset={5}
        >
          <DropdownMenu.Item className="group text-[13px] leading-none text-[#fff] rounded-[3px] flex items-center h-[25px] px-[8px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter data-[highlighted]:text-[#fff]">
            New Tab{' '}
            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘+T
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group text-[13px] leading-none text-[#fff] rounded-[3px] flex items-center h-[25px] px-[8px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter data-[highlighted]:text-[#fff]">
            New Window{' '}
            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘+N
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="group text-[13px] leading-none text-[#fff] rounded-[3px] flex items-center h-[25px] px-[8px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter data-[highlighted]:text-[#fff]"
            disabled
          >
            New Private Window{' '}
            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⇧+⌘+N
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AnimatedDropdown;

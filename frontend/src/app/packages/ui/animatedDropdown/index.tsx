import React, { ReactNode, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MiniInput } from '../input';

type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  trigger: ReactNode;
  content: ReactNode;
  dropdownItems: DropdownItem[];
  itemAction: (value: string) => void;
};

const AnimatedDropdown = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Add search state

  // Filter dropdownItems based on searchQuery
  const filteredItems = props.dropdownItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {props.trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="animate-fade-up min-w-[220px] bg-surface rounded-md p-[8px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade flex flex-col gap-1"
          sideOffset={5}
          align="start"
          
        >
          {/* Search input */}
          <div className="border-b-[1px] border-surface-lighter pt-1 pb-1">
            <MiniInput
              id="searchDropdownItems"
              placeholder="Search Priorities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
          </div>

          {/* Render filtered dropdownItems */}
          {filteredItems.map((item) => (
            <DropdownMenu.Item
              key={item.value}
              className="group text-[13px] leading-none text-[#fff] rounded-[3px] flex items-center h-[25px] px-[8px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter hover:bg-[#fff] cursor-pointer data-[highlighted]:text-[#fff]"
              onClick={() => props.itemAction(item.label)} // Call itemAction when item is clicked
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AnimatedDropdown;

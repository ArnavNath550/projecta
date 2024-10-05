import React, { ReactNode, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MiniInput } from '../input';
import { useTransition, animated } from 'react-spring'; // Import useTransition and animated from react-spring

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
  const [isOpen, setIsOpen] = useState(false); // Add state for dropdown open/close
  const [searchQuery, setSearchQuery] = useState<string>(''); // Add search state

  // Filter dropdownItems based on searchQuery
  const filteredItems = props.dropdownItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger>
        {props.trigger}
      </DropdownMenu.Trigger>

      {/* Render the transition */}
      
            <DropdownMenu.Portal>
              <animated.div>
                <DropdownMenu.Content
                  className="animate-fade-up min-w-[220px] bg-surface border-[1px] border-surface-border rounded-md p-[8px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade flex flex-col gap-1"
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
                      className="group text-[13px] leading-none text-[#fff] rounded-[3px] flex items-center h-[25px] p-4 pl-3 relative select-none outline-none rounded-md data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter cursor-normal data-[highlighted]:text-[#fff] hover:bg-surface-lighter"
                      onClick={() => props.itemAction(item.label)} // Call itemAction when item is clicked
                    >
                      {item.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </animated.div>
            </DropdownMenu.Portal>
        
    </DropdownMenu.Root>
  );
};

export default AnimatedDropdown;

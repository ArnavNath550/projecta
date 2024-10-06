import React, { ReactNode, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MiniInput } from '../input';
import { useTransition, animated } from 'react-spring';

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
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search state

  // Filter dropdownItems based on searchQuery
  const filteredItems = props.dropdownItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger>
        {props.trigger}
      </DropdownMenu.Trigger>

      {/* Apply the transition to the dropdown content */}
      
          <DropdownMenu.Portal>
            <div>
              <DropdownMenu.Content
                className="bg-surface rounded-md"
                sideOffset={5}
                align="start"
              >
                {/* Search input */}
                <div className="border-b-[1px] border-surface-lighter p-2">
                  <MiniInput
                    id="searchDropdownItems"
                    placeholder="Search Priorities"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                  />
                </div>
                <div className="p-2">
                  {/* Render filtered dropdownItems */}
                  {filteredItems.map((item) => (
                    <DropdownMenu.Item
                      key={item.value}
                      className="group text-[13px] leading-none text-[#fff] rounded-[3px] cursor-pointer flex items-center h-[25px] p-4 pl-3 relative select-none outline-none rounded-md data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter cursor-normal data-[highlighted]:text-[#fff] hover:bg-surface-lighter p-2"
                      onClick={() => props.itemAction(item.label)} // Call itemAction when item is clicked
                    >
                      {item.label}
                    </DropdownMenu.Item>
                  ))}
                </div>
              </DropdownMenu.Content>
            </div>
          </DropdownMenu.Portal>

    </DropdownMenu.Root>
  );
};

export default AnimatedDropdown;

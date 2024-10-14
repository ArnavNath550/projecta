import React, { ReactNode, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MiniInput } from '../input';
import { useTransition, animated } from 'react-spring';
import { API_ENDPOINT } from '@/app/services/api';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { IconPlus } from '@tabler/icons-react';

import { createTag } from '@/app/api/actions/issue-actions';


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

const AnimatedTagsDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [isColourOpen, setColourOpen] = useState(false); // For the second dropdown
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search state
  const [newTag, setNewTag] = useState<string>(''); // Track the newly created tag

  const [projectTags, setProjectTags] = React.useState([]);

  const params = useParams();

  React.useEffect(() => {
    const fetchTags = async () => {
      const res = await axios.get(API_ENDPOINT + "/tags/project/" + params?.id);
      const data = res.data;
      setProjectTags(data);
    };

    fetchTags();
  }, [params?.id]);

  // Filter dropdownItems based on searchQuery
  const filteredItems = props.dropdownItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Transition settings for react-spring
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'scale(0.95)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 300, friction: 25 },
  });

  // Transition settings for the color dropdown
  const colourTransitions = useTransition(isColourOpen, {
    from: { opacity: 0, transform: 'scale(0.95)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 300, friction: 25 },
  });

  const handleCreateTag = async (tagName: string) => {
    // Simulate creating the tag
    setNewTag(tagName);
    setIsOpen(false);
    setColourOpen(true);
  };

  return (
    <>
      {/* First dropdown for tags */}
      <DropdownMenu.Root onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger>
          {props.trigger}
        </DropdownMenu.Trigger>

        {/* Apply the transition to the dropdown content */}
        {transitions(
          (styles, item) =>
            item && (
              <DropdownMenu.Portal>
                <animated.div style={styles}>
                  <DropdownMenu.Content
                    className="bg-surface rounded-md"
                    sideOffset={5}
                    align="start"
                  >
                    {/* Search input */}
                    <div className="border-b-[1px] border-surface-lighter p-2">
                      <MiniInput
                        id="searchDropdownItems"
                        placeholder="Search Tags"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                      />
                    </div>
                    <div className="p-2">
                      {/* Render filtered dropdownItems */}
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                          <DropdownMenu.Item
                            key={item.value}
                            className="group text-[13px] leading-none text-[#fff] rounded-[3px] cursor-pointer flex items-center h-[25px] p-3.5 relative select-none outline-none rounded-md data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter cursor-normal data-[highlighted]:text-[#fff] hover:bg-surface-lighter"
                            onClick={() => props.itemAction(item.label)} // Call itemAction when item is clicked
                          >
                            {item.label}
                          </DropdownMenu.Item>
                        ))
                      ) : searchQuery !== "" ? (
                        <DropdownMenu.Item
                          className="group text-[13px] leading-none text-[#fff] rounded-[3px] cursor-pointer flex items-center h-[25px] p-3.5 relative select-none outline-none rounded-md data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter cursor-normal data-[highlighted]:text-[#fff] hover:bg-surface-lighter"
                          onClick={() => handleCreateTag(searchQuery)}
                        >
                          <IconPlus size={12} color="#fff" />
                          <span>Create Tag {searchQuery}</span>
                        </DropdownMenu.Item>
                      ) : (
                        <DropdownMenu.Item className="group text-[13px] leading-none text-[#fff] rounded-[3px] cursor-pointer flex items-center h-[25px] p-3.5 relative select-none outline-none rounded-md data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-lighter cursor-normal data-[highlighted]:text-[#fff] hover:bg-surface-lighter">
                          <IconPlus size={12} color="#fff" />
                          <span>Create Tag</span>
                        </DropdownMenu.Item>
                      )}
                    </div>
                  </DropdownMenu.Content>
                </animated.div>
              </DropdownMenu.Portal>
            )
        )}
      </DropdownMenu.Root>

      {/* Second dropdown for color selection */}
      {colourTransitions(
        (styles, item) =>
          item && (
            <DropdownMenu.Root onOpenChange={setColourOpen}>
              <DropdownMenu.Portal>
                <animated.div style={styles}>
                  <DropdownMenu.Content
                    className="bg-surface rounded-md"
                    sideOffset={5}
                    align="start"
                  >
                    {/* Color selection content */}
                    <div className="p-2">
                      <h4 className="text-sm text-white mb-2">Select a color for {newTag}</h4>
                      <div className="flex space-x-2">
                        <button className="w-6 h-6 bg-red-500 rounded-full" onClick={() => alert('Color selected: Red')} />
                        <button className="w-6 h-6 bg-green-500 rounded-full" onClick={() => alert('Color selected: Green')} />
                        <button className="w-6 h-6 bg-blue-500 rounded-full" onClick={() => alert('Color selected: Blue')} />
                      </div>
                    </div>
                  </DropdownMenu.Content>
                </animated.div>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )
      )}
    </>
  );
};

export default AnimatedTagsDropdown;

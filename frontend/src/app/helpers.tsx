import { IconAntennaBars1, IconAntennaBars2, IconAntennaBars3, IconAntennaBars4, IconAntennaBars5, IconUrgent } from "@tabler/icons-react";
import * as React from "react";

export const generateObjectId = () => {
  const timestamp = Math.floor(new Date().getTime()).toString(); // Millisecond precision timestamp
  const random = Math.floor(Math.random() * 1e12).toString().padStart(12, '0'); // 12 random digits for extra uniqueness
  const numericId = timestamp + random; // Concatenate timestamp and random digits
  return numericId;
}

export const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
export const getPriorityIcon = (priorityType: string) => {
  const priority = ISSUE_PRIORITY_LIST.find(item => item.value === priorityType);
  return priority ? priority.icon : null; // Return the icon if found, otherwise return null
};

export const formatString = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const stopPropagation = (e) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

export const ISSUE_PRIORITY_LIST = [
  { icon: <IconAntennaBars2 size={15} />, label: 'Low', value: 'LOW' },
  { icon: <IconAntennaBars3 size={15} />, label: 'Medium', value: 'MEDIUM' },
  { icon: <IconAntennaBars4 size={15} />, label: 'High', value: 'HIGH' },
  { icon: <IconAntennaBars5 size={15} />, label: 'Urgent', value: 'URGENT' }
];

type Colour = {
  label: string;
  value: string;
  hexCode: string;
  icon: JSX.Element;
};

export const PRIMARY_COLOURS: Colour[] = [
  {
    label: 'Red',
    value: 'CRED',
    hexCode: '#E63946',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#E63946]"></div>
  },
  {
    label: 'Orange',
    value: 'CORANGE',
    hexCode: '#F4A261',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#F4A261]"></div>
  },
  {
    label: 'Yellow',
    value: 'CYELLOW',
    hexCode: '#F4D35E',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#F4D35E]"></div>
  },
  {
    label: 'Green',
    value: 'CGREEN',
    hexCode: '#2A9D8F',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#2A9D8F]"></div>
  },
  {
    label: 'Blue',
    value: 'CBLUE',
    hexCode: '#457B9D',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#457B9D]"></div>
  },
  {
    label: 'Pink',
    value: 'CPINK',
    hexCode: '#F28482',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#F28482]"></div>
  },
  {
    label: 'Purple',
    value: 'CPURPLE',
    hexCode: '#7B2CBF',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#7B2CBF]"></div>
  },
  {
    label: 'Indigo',
    value: 'CINDIGO',
    hexCode: '#3D348B',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#3D348B]"></div>
  },
  {
    label: 'Violet',
    value: 'CVIOLET',
    hexCode: '#9C89B8',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#9C89B8]"></div>
  },
  {
    label: 'Brown',
    value: 'CBROWN',
    hexCode: '#8D6E63',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#8D6E63]"></div>
  },
  {
    label: 'Gray',
    value: 'CGRAY',
    hexCode: '#B0BEC5',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#B0BEC5]"></div>
  },
  {
    label: 'Black',
    value: 'CBLACK',
    hexCode: '#000000',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#000000]"></div>
  },
  {
    label: 'White',
    value: 'CWHITE',
    hexCode: '#FFFFFF',
    icon: <div className="w-[8px] h-[8px] rounded-full bg-[#FFFFFF]"></div>
  }
];

export const getColourByValue = (value: string): { label: string; hexCode: string; icon: JSX.Element } | undefined => {
  const colour = PRIMARY_COLOURS.find(colour => colour.value === value);
  if (colour) {
    return { label: colour.label, hexCode: colour.hexCode, icon: colour.icon };
  }
  return undefined;  // return undefined if no match is found
};

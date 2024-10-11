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

export const ISSUE_PRIORITY_LIST = [
  { icon: <IconAntennaBars2 size={12} />, label: 'Low', value: 'LOW' },
  { icon: <IconAntennaBars3 size={12} />, label: 'Medium', value: 'MEDIUM' },
  { icon: <IconAntennaBars4 size={12} />, label: 'High', value: 'HIGH' },
  { icon: <IconAntennaBars5 size={12} />, label: 'Urgent', value: 'URGENT' }
];
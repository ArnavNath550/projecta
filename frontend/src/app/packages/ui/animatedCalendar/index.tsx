import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type CalendarProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

const AnimatedCalendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(selectedDate || null);

  useEffect(() => {
    // If selectedDate is passed, set currentDate to the month of the selectedDate
    if (selectedDate) {
      setCurrentDate(selectedDate);
      setSelected(selectedDate);
    }
  }, [selectedDate]);

  // Get the start and end of the current month
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  // Get the start and end of the week, surrounding the current month
  const startOfWeekDate = startOfWeek(startOfCurrentMonth);
  const endOfWeekDate = endOfWeek(endOfCurrentMonth);

  const daysArray = [];
  let day = startOfWeekDate;

  // Create an array of days from startOfWeek to endOfWeek
  while (day <= endOfWeekDate) {
    daysArray.push(day);
    day = addDays(day, 1);
  }

  // Function to handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Function to handle date selection
  const handleDateSelect = (date: Date) => {
    setSelected(date);
    onSelectDate(date);
  };

  return (
    <div className="p-5 w-full max-w-md mx-auto bg-white rounded-md shadow-lg">
      {/* Calendar header with month and navigation */}
      <div className="flex justify-between items-center mb-5">
        <button
          className="text-lg font-medium text-gray-700 hover:text-gray-900"
          onClick={handlePrevMonth}
        >
          <IconChevronLeft size={20} color="#fff" />
        </button>
        <h2 className="text-lg font-medium">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          className="text-lg font-medium text-gray-700 hover:text-gray-900"
          onClick={handleNextMonth}
        >
          <IconChevronRight size={20} color="#fff" />
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-[8px] mb-3 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div key={idx} className="font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Dates of the month */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysArray.map((day, idx) => {
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = selected && isSameDay(day, selected);

          return (
            <div
              key={idx}
              className={`p-2 cursor-pointer rounded-full w-[50px] h-[50px] border-[1px] border-surface-border flex items-center justify-center ${
                isToday ? 'bg-background text-white' : 'hover:bg-surface'
              } ${isSelected ? 'bg-brand-color text-white hover:bg-brand-darker-color' : ''} ${
                isCurrentMonth ? 'text-black' : 'text-white'
              } hover:bg-gray-200`}
              onClick={() => handleDateSelect(day)}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedCalendar;

import AnimatedCalendar from '@/app/packages/ui/animatedCalendar'
import React from 'react'

type Props = {
  selectedDueDate: Date,
  setSelectedDueDate: (date: Date) => void,
  onSetIssueDueDateDialogClosed: (isOpen: boolean) => void,
}

function SetIssueDueDateDialog(props: Props) {
  const handleOnSelectDate = (date: Date) => {
    props.setSelectedDueDate(date);
    props.onSetIssueDueDateDialogClosed(false);
  }

  return (
    <div className="p-3">
        <div className="w-[500px]">
            <AnimatedCalendar onSelectDate={handleOnSelectDate} selectedDate={props.selectedDueDate} />
        </div>
    </div>
  )
}

export default SetIssueDueDateDialog
import React from 'react'

type Props = {
  id: number;
  value: string;
  label: string;
  colour: string;
  setSelected: (selectedItems: string[]) => void;
  selected: string[];
}

function ListDialogItem(props: Props) {
  const handleSelect = (value: number) => {
    if (props.selected.includes(value)) {
      // Remove the item if it is already selected
      const updatedSelected = props.selected.filter(item => item !== value);
      props.setSelected(updatedSelected);
    } else {
      // Add the item if it is not selected
      const updatedSelected = [...props.selected, value];
      props.setSelected(updatedSelected);
    }
  };

  return (
    <label className="w-[500px] p-4 flex flex-row gap-2 items-center pb-3 pt-3 hover:bg-surface justify-between">
      <div className="flex flex-row gap-2 items-center">
        <div className={`w-[8px] h-[8px] bg-[${props.colour}] rounded-full`}></div>
        <div>
          {props.label}
        </div>
      </div>
      <div>
          <input 
            type="checkbox" 
            className="absolute w-full h-full" 
            value={props.value} 
            checked={props.selected.includes(props.id)} 
            onClick={() => handleSelect(props.id)} 
          />
          <span className="check" aria-hidden="true">
            <span className="fill">
              <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">    
                <path d="M2 6L6 10L14 2" pathLength="1" stroke-dasharray="1" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </span>
        
      </div>
    </label>
  );
}

export default ListDialogItem;

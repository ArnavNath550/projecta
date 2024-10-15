import React from 'react';
import Button from '../button';

type Props = {
  image?: string,
  headingText: string,
  subHeadingText: string,
  emptyStateButton: React.ReactElement,
};

function EmptyState(props: Props) {
  return (
    <div className="flex flex-col gap-5 text-center items-center justify-center w-[500px] m-auto animate-fade-in">
      <div className="flex flex-col gap-2">
        {props.image ? (
          <img src={props.image} className="w-[400px] m-auto m-b-[30px]"/>
        ) : (
          <></>
        )}
        <div className="text-3xl font-medium animate-fade-in">
          {props.headingText}
        </div>
        <div className="text-sm text-on-surface animate-fade-in delay-200">
          {props.subHeadingText}
        </div>
      </div>
      <div>
        {props.emptyStateButton}
      </div>
    </div>
  );
}

export default EmptyState;

import React from 'react'

type Props = {
  projectData: [],
  projectDataLoading: Boolean
}

function AppContentNav(props: Props) {
  return (
    <div className="pt-3 pb-3 flex flex-row items-center gap-3 text-sm text-on-surface max-w-[1024px] w-full m-auto bg-navbar-gradient pl-[13px] pr-[13px] border-[1px] border-surface-border rounded-md z-50">
        {props.projectDataLoading == true ? (
          <>
          </>
        ) : (
          <>
  <span className='animate-fade-in-left' style={{ '--animation-delay': '0ms' } as React.CSSProperties}>
    {props.projectData.project_name}
  </span>
  <span className='animate-fade-in-left' style={{ '--animation-delay': '200ms' } as React.CSSProperties}>
    /
  </span>
  <span className='animate-fade-in-left' style={{ '--animation-delay': '400ms' } as React.CSSProperties}>
    Tasks
  </span>
</>

        )}
    </div>
  )
}

export default AppContentNav
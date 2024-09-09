import React from 'react'

type Props = {
  projectData: [],
  projectDataLoading: Boolean
}

function AppContentNav(props: Props) {
  return (
    <div className="pt-3 pb-3 flex flex-row items-center gap-3 text-sm text-on-surface">
        {props.projectDataLoading == true ? (
          <>
          </>
        ) : (
          <>
            <span>{props.projectData.projectName}</span>
            <span>/</span>
            <span>Tasks</span>
          </>
        )}
    </div>
  )
}

export default AppContentNav
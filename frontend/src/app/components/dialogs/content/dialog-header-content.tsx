import React from 'react'

type Props = {
    dialogHeader: string,
    dialogDescription: string
}

function DialogHeaderContent(props: Props) {
  return (
    <div className="flex flex-col gap-1">
        <div className="font-medium text-xl">{props.dialogHeader}</div>
        <div className="font-regular text-sm text-on-surface">{props.dialogDescription}</div>
    </div>
  )
}

export default DialogHeaderContent
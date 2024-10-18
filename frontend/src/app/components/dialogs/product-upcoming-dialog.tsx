import React from 'react'

type Props = {
    productFeature: string
}

function ProductUpcomingDialog(props: Props) {
  return (
    <div className="w-[500px] h-[450px] ">
        <img src="/images/product-showcase.svg" className="w-full h-full object-cover rounded-[10px]" style={{filter: 'blur(2px)'}} draggable={false}/>
    </div>
  )
}

export default ProductUpcomingDialog
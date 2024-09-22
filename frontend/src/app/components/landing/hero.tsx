import React from 'react'

function Hero() {
  return (
    <div className="bg-background w-full h-screen">
        <div className="flex items-center justify-center flex-col pt-20 pb-20 animate-fade-up gap-[20px]">
            <span class="text-[5.5rem] font-medium gradient-text animate-fade-up text-center">Build your <br /> projects, better</span>
            <div className="text-center font-normal text-s text-info">
                Meet the project management tool for your every project. <br /> Manage Projects, Issues and Progress.
            </div>
        </div>
    </div>
  )
}

export default Hero
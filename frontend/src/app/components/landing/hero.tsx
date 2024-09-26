import React from 'react'

function Hero() {
  return (
    <div className="w-full h-full pt-12">
        <div className="flex items-center justify-end flex-col pt-20 pb-20 animate-fade-up gap-[20px] max-w-[750px] m-auto">
            <span className="text-[5.5rem] font-medium gradient-text animate-fade-up text-center leading-[100px]">Build your projects, better</span>
            <div className="text-center font-normal text-xl text-info">
                Meet the project management tool for your every project. <br /> Manage Projects, Issues and Progress.
            </div>
            <div className="flex flex-row gap-2 pt-5 pb-5 animate-fade-up delay-[1s]">
            <button className="button-shine bg-brand-color relative rounded-full border border-brand-color px-[14px] py-[8px] [text-shadow:_0px_1px_2px_rgba(0,_0,_0,_0.15)]">
              <span>Request Access</span>
            </button>
            <button className="p-3 pr-5 pl-5 flex flex-row items-center justify-center bg-[#151515] hover:bg-[#0d0d0d] rounded-full hover:drop-shadow-md shadow">
              <span>Changelog</span>
            </button>
            </div>
        </div>
        <div className="bg-primary-gradient p-2 rounded-md w-[1024px] m-auto animate-fade-up">
          <img src="/images/hero-showcase.svg" className="w-full" />
        </div>
    </div>
  )
}

export default Hero
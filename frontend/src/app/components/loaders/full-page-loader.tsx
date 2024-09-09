import React from 'react'

function FullPageLoader() {
  return (
    <div className="bg-background fixed w-full h-full">
        <div className="w-full h-full flex flex-col items-center justify-center z-50 absolute">
            <svg width="100px" height="261" viewBox="0 0 259 261" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-50 blur-fade-move-animation">
            <g clip-path="url(#clip0_91_2)">
            <path d="M194.25 0H64.7497C28.9896 0 0 29.1744 0 65.1623V195.487C0 231.476 28.9896 260.65 64.7497 260.65H194.25C230.01 260.65 259 231.476 259 195.487V65.1623C259 29.1744 230.01 0 194.25 0Z" fill="url(#paint0_linear_91_2)"/>
            <path d="M120.713 80.9336C126.174 78.0879 132.667 78.0879 138.128 80.9336L202.987 114.735C216.623 121.842 216.623 141.471 202.987 148.577L138.128 182.379C132.667 185.225 126.174 185.225 120.713 182.379L55.8543 148.577C42.2179 141.471 42.2179 121.842 55.8543 114.735L120.713 80.9336Z" fill="#E4E1FF" fill-opacity="0.8"/>
            <path d="M120.713 107.611C126.174 104.765 132.667 104.765 138.128 107.611L202.987 141.412C216.623 148.519 216.623 168.148 202.987 175.255L138.128 209.056C132.667 211.902 126.174 211.902 120.713 209.056L55.8543 175.255C42.2179 168.148 42.2179 148.519 55.8543 141.412L120.713 107.611Z" fill="#DBD8FF" fill-opacity="0.6"/>
            <path d="M120.713 50.4453C126.174 47.5996 132.667 47.5996 138.128 50.4453L202.987 84.2472C216.623 91.3539 216.623 110.982 202.987 118.089L138.128 151.89C132.667 154.736 126.174 154.736 120.713 151.89L55.8543 118.089C42.2179 110.982 42.2179 91.3539 55.8543 84.2472L120.713 50.4453Z" fill="#ECEAFF"/>
            </g>
            <defs>
            <linearGradient id="paint0_linear_91_2" x1="129.5" y1="0" x2="1.36528e-05" y2="279.13" gradientUnits="userSpaceOnUse">
            <stop stop-color="#CAC5FF"/>
            <stop offset="1" stop-color="#4531D8"/>
            </linearGradient>
            <clipPath id="clip0_91_2">
            <rect width="259" height="261" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        </div>
        <div className="absolute w-full h-full z-20 shine-full-page-loader">
            
        </div>
    </div>
  )
}

export default FullPageLoader
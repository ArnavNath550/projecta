import React from 'react'
import ProjectSelectorItem from './project-selector-item'
import DialogHeaderContent from './content/dialog-header-content'
import Button from '@/app/packages/ui/button'
import AnimatedDialog from '@/app/packages/ui/animatedDialog'
import CreateProjectDialog from './create-project-dialog'
import { API_ENDPOINT } from '@/app/services/api'
import axios from 'axios'
import { IconStack2Filled } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'


function ProjectSelectorDialog() {
  const {data: session} = useSession();
  const [projectsData, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);



  const fetchProjectsByUser = async() => {
    setLoading(true);
    const res = await axios.get(API_ENDPOINT + "/projects/user/"+session.user.id);
    const data = res.data;
    setProjects(data);
    // console.log(`project`, data);
    setLoading(false);
  }
  
  React.useEffect(() => {
    fetchProjectsByUser();
  }, []);

  return (
    <div className="p-2">
      <div className="flex flex-row gap-5 justify-between items-center h-full w-full">
        <div className="p-5 w-[450px] bg-background bg-page-gradient h-[290px] items-center justify-center rounded-md animate-fade-up relative overflow-hidden">
        {/* <div className="absolute top-0 w-full h-full shine-basic">
            
        </div> */}
          <div className="flex flex-col gap-3 items-center justify-center text-center relative z-50 h-full">
            <div>
            <svg viewBox="0 0 259 261" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[80px]">
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
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-medium">
                Create your next Project
              </span>
              <span className="text-s text-on-surface">
                Build your next amazing project
              </span>
            </div>
            <Link href="/client/create">
              <Button intent="primary" size="l">
                <span>Create Project</span>
              </Button>
            </Link>
          </div>
        </div>
        <div class="h-[290px] overflow-scroll">
      <div className="p-3 flex flex-row justify-between items-center">
        <DialogHeaderContent 
            dialogHeader='Your Projects'
            dialogDescription='Choose which project you want to enter'
        />
        </div>
        {loading == true ? (
          <span>Loading...</span>
        ) : (
          <>
            {/* {JSON.stringify(projectsData)} */}
            {projectsData.map((y) => {
              return <ProjectSelectorItem data={y} />;
            })}
          </>
        )}
        </div>
      </div>
      
    </div>
  );
}

export default ProjectSelectorDialog
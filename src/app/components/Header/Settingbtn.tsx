"use client"
import { NextPage } from 'next'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
    icon:ReactNode
    label:string,
    destination:string
}

const Settingbtn: NextPage<Props> = ({icon,label,destination}) => {
    const router:AppRouterInstance = useRouter()
    function Navigate(link:string):void{
        router.push(link)
    }
  return <button className='flex justify-between w-full group hover:bg-gray-200  p-2 rounded-md duration-100' onClick={()=>Navigate(destination)}>
            <div className="flex gap-2">
            {icon}
            <p className='font-[500] text-[14px]'>{label}</p>
            </div>
       
        <MdKeyboardArrowRight size={25} className='d group-has-[:hover]:translate-x-2 duration-100'></MdKeyboardArrowRight>
  </button>
}

export default Settingbtn   
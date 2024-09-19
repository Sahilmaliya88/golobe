"use client"
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { MdOutlineWatchLater } from "react-icons/md";
import style from './search.module.css'
import { NextFont } from 'next/dist/compiled/@next/font';
import { Montserrat } from 'next/font/google';
const mont:NextFont = Montserrat({subsets:['cyrillic']})
// import CityCard from '../citycard/CityCard';
interface Props {}
const RecentSearch: NextPage<Props> = ({}) => {
    //has to define type of search later
    const [recentsearch, setrecentSearch] = useState([])
    useEffect(()=>{
        const search = localStorage.getItem("recent-searches")
        setrecentSearch(JSON.parse(search || `[]`))
    },[])
  return <div className={`${mont.className} ${style.rcsearch}`}>
    <h1 className='font-[700] text-[32px]'>Your Recent Searches</h1>
        {
           (recentsearch?.length > 0) ? (
            <div className='rcs flex gap-[50px] max-mobile:gap-2 max-h-[500px] max-tablet:flex-wrap scroll-smooth overflow-auto  w-full'>
               {/*have to implement recent search and import city card for it */}
            </div>):(
            <div className='mt-5'>
                <p className='font-semibold text-gray-500 flex items-center gap-2 text-center'><MdOutlineWatchLater size={20} color='#343a40'></MdOutlineWatchLater>No recent searches</p>
            </div>)
        }
  </div>
}

export default RecentSearch
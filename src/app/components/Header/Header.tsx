"use client"
import { NextPage } from 'next'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlane } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import Logo from '../Logo';
import { Button } from '@/components/ui/button';
import style from './Header.module.css'
import {  useState,useEffect } from 'react';
import { user } from '@/types/auth';
import Image  from 'next/image';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { addUser } from '@/lib/slices/AuthSlice';
import { NextFont } from 'next/dist/compiled/@next/font';
import { Montserrat } from 'next/font/google';
const mont:NextFont = Montserrat({subsets:['cyrillic']})
import toast from 'react-hot-toast';
import { RootState } from '@/lib/store';
import HeaderContextMenu from './Header.contextMenu';
import MobileMenu from './Mobile.menu';
interface Props {
    radius:number,
    bg?:string
}
const Header: NextPage<Props> = ({radius,bg}) => {
    const [active,setactive] = useState<boolean>(false)
    const [showMenu,setshowMenu] = useState<boolean>(false)
    const isLoggedIn:boolean = useSelector((state:RootState)=>state.auth.isLoggedIn)
    const user : user | null = useSelector((state:RootState)=>state.auth.user)
    const dispatch = useDispatch()
    const {mutate} = useMutation({
        mutationFn:async()=>{
            try{
                const data = await axios.get(`/api/user/verify`,{withCredentials:true})
                if(data){
                    return data
                   
                }
            }catch(err){
                throw err
            }
           
        },
        onSuccess(data) {
            toast.success(`hello ${data?.data.user.firstname}`)
            dispatch(addUser({user:data?.data.user}))
        },
        onError(){

        }
    })
    useEffect(()=>{
        mutate()
    },[])
   
  return <header className={`flex w-full z-[50] relative h-[80px] px-4 py-5 rounded-${radius} justify-between`}>
        <div className='flex gap-2 h-full max-mobile:hidden'>
            <Link href={"/"} className={`h-full  flex text-sm text-white items-center gap-1`}><FaPlane size={16} color='white'></FaPlane><p>Find Flight</p></Link>
            <Link href={"/"} className='flex text-sm text-white h-full items-center gap-1'><IoBed size={16} color='white'></IoBed><p>Find Stays</p></Link>
        </div>
        <Logo varient={"white"} Width={500} Height={500} ></Logo>
        {
            isLoggedIn ? (<button className='flex gap-2 pr-4 items-center max-mobile:hidden' onClick={()=>setshowMenu(prev=>!prev)}>
                <Image src={user?.photo || ''} alt='no user' width={45} height={45} className='rounded-full'></Image>
                <p className={`${mont.className} text-md font-bold ${bg==="white"? "text-black":"text-white"}`}>{`${user?.firstname} ${user?.lastname.charAt(0).toUpperCase()}.`}</p>
            </button>):(<div className='flex gap-2 max-mobile:hidden items-center'>
                <Link href={'/login'}>
                <Button variant={"ghost"} size={"lg"} className='text-white'>Login</Button> </Link>
                <Link href={'/signup'}>
                <Button className='bg-white text-black  font-bold shadow-none py-3'>Sign Up</Button></Link>
            </div>)
        }
         <div className={`${style.ham_menu} ${active && style.activeM} hidden max-mobile:flex`} onClick={()=>setactive(prev=>!prev)}>

        <span></span>
        <span></span>
        <span></span>
      </div>
      <MobileMenu isshow={active} user={user}></MobileMenu>
     {showMenu && <HeaderContextMenu user={user}></HeaderContextMenu>}
  </header>
}

export default Header
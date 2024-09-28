"use client"
import { removeUser } from '@/lib/slices/AuthSlice';
import { user } from '@/types/auth'
import axios from 'axios';
import { NextPage } from 'next'
import { signOut } from 'next-auth/react';
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from 'react-redux';
interface Props {
    user:user | null | undefined
}

const LogoutBtn: NextPage<Props> = ({user}) => {
    const url:string = process.env.NEXT_PUBLIC_APIURL as string
    const dispath = useDispatch()
    function logout():void{
        if(user?.provider){
            signOut()
        }else{
            axios.get(`${url}/api/user/logout`,{withCredentials:true}) 
        }
        dispath(removeUser())
    }
  return <button className='flex gap-1 items-center p-2' onClick={logout}>
    <IoLogOut size={22} color='red'></IoLogOut>
    <p className="text-red-400 font-semibold">Logout</p>
    <span></span>
  </button>
}

export default LogoutBtn
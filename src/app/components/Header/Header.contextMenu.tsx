import { user } from '@/types/auth'
import { NextPage } from 'next'
import Image  from 'next/image';
import React from 'react';
import Settingbtn from './Settingbtn';
import { FaUser } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { MdOutlineSupport } from "react-icons/md";
import LogoutBtn from './LogoutBtn';
interface Props {
  user?:user | null
}
const HeaderContextMenu: NextPage<Props> = ({user}) => {
  return <div className='absolute z-40 right-3 top-[80px] p-4 w-[320px] rounded-md h-auto bg-white'>
      {/* //user profile card */}
      <div className='flex items-center gap-4'>
          <Image src={user?.photo || ''} alt='no photo' width={64} height={64} className='rounded-full'></Image>
          <h1 className='font-[600] text-[16px] capitalize'>{`${user?.firstname} ${user?.lastname}.`}</h1>
      </div>
      <div className='w-full h-[.5px] bg-gray-300  mt-3'></div>
      {/* settings */}
      <div className="pt-3 flex flex-col gap-1">
          <Settingbtn icon={<FaUser size={20}></FaUser>} label='My Account' destination='/' />
          <Settingbtn icon={<BsCreditCardFill size={20}></BsCreditCardFill>} label='Payments' destination='/'></Settingbtn>
          <Settingbtn icon={<MdSettings size={20}></MdSettings>} label='Settings' destination='/'></Settingbtn>
      </div>
      <div className='w-full h-[.5px] bg-gray-300  mt-3'></div>
      <div>
        <Settingbtn icon={<MdOutlineSupport size={20}></MdOutlineSupport>} label='Support' destination='/'></Settingbtn>
        <LogoutBtn user={user}></LogoutBtn>
      </div>
  </div>
}

export default HeaderContextMenu
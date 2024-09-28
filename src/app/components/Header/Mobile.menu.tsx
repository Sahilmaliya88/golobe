import { NextPage } from 'next'
import style from './Header.module.css'
import { user } from '@/types/auth'
import Settingbtn from './Settingbtn'
import LogoutBtn from './LogoutBtn'
import { MdOutlineSupport, MdSettings } from 'react-icons/md'
import { BsCreditCardFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
interface Props {
    isshow?:boolean,
    user?:user | null
}

const MobileMenu: NextPage<Props> = ({isshow,user}) => {
  return <div className={`hidden max-mobile:block ${style.mobilemenu} ${isshow? style.activemobile:""}`}>
        <div className='z-[500] rounded-md h-auto bg-white'>
      {/* //user profile card */}
    {user ?  (<div className='flex items-center gap-4'>
          <Image src={user?.photo || ''} alt='no photo' width={64} height={64} className='rounded-full'></Image>
          <h1 className='font-[600] text-[16px] capitalize'>{`${user?.firstname} ${user?.lastname}.`}</h1>
      </div>):(<div className="flex items-center p-3">
        <Button>SignIn</Button>
      </div>)}
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
       {user && <LogoutBtn user={user}></LogoutBtn>}
      </div>
  </div>
  </div>
}

export default MobileMenu
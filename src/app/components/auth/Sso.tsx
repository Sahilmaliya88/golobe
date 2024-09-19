'use client'
import { NextPage } from 'next'
import SsoBtn from './SsoBtn';
import fb from '../../../../public/fb.png'
import google from '../../../../public/google.png'
import apple from '../../../../public/apple.png'
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
interface Props {}
const Sso: NextPage<Props> = ({}) => {
  const {status} = useSession()
  console.log(status)
  return <div className='w-full flex items-center gap-3 justify-between'>
    <SsoBtn>
        <Image src={fb} height={24} width={24} alt="Facebook" />
    </SsoBtn>
    <SsoBtn onClick={()=>signIn('google')}>
        <Image src={google} height={24} width={24} alt="google" />
    </SsoBtn>
    <SsoBtn>
        <Image src={apple} height={24} width={24} alt="apple" />
    </SsoBtn>
  </div>
}

export default Sso
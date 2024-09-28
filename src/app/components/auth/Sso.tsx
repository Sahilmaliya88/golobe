'use client'
import { NextPage } from 'next'
import SsoBtn from './SsoBtn';
import fb from '../../../../public/fb.png'
import google from '../../../../public/google.png'
import apple from '../../../../public/apple.png'
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
interface Props {}
const Sso: NextPage<Props> = ({}) => {
  const router:AppRouterInstance = useRouter()
  const {status} = useSession()
  if(status==="authenticated"){
    router.push('/')
  }
  return <div className='w-full flex items-center gap-3 justify-between'>
    <SsoBtn onClick={()=>signIn("facebook")}>
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
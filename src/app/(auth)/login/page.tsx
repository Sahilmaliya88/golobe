"use client"
import { NextPage } from 'next'
import hotel from '../../../../public/hotelsAuth.png'
import plane from '../../../../public/planeAuth.png'
import Carasoul from './../../../components/carasoul/Carasoul';
import Logo from '@/app/components/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Sso from '../../components/auth/Sso';
import Separator from '@/app/components/separator';
import AuthInput from '../../components/auth/AuthInput';
import {Controller, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/DB/schemas/loginSchema';
import { z } from 'zod';
import { useRef} from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser } from '@/lib/slices/AuthSlice';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { NextFont } from 'next/dist/compiled/@next/font';
import { Montserrat } from 'next/font/google';
const mont:NextFont = Montserrat({subsets:['cyrillic']})
interface Props {}
const Page: NextPage<Props> = async({}) => {
  const url:string = process.env.NEXT_PUBLIC_APIURL as string
  const {data} = useSession()
  console.log(data)
  //router
  const router = useRouter()
  //dispatcher
  const dispatch = useDispatch()
  const remember = useRef<boolean>(false)
  //react-hook-form
  const {control,handleSubmit,formState:{errors}} = useForm<z.infer<typeof loginSchema>>({
    resolver:zodResolver(loginSchema)
  })
  //queyFn
  const {mutate,isPending} = useMutation({
    mutationFn:async(values:z.infer<typeof loginSchema>)=>{
      try{
          const response = await axios.post(`${url}/api/user/login`,{...values,remember:remember})
          if(response){
            return response.data
          }
      }catch(err){
        throw err
      }
    },
    onSuccess(data) {
        toast.success("logged In successfully")
        dispatch(addUser({user:data.user}))
        router.push('/')
    },
    onError(error){
      toast.error(error.message)
    }
  })
  //login Fn
  const submit = (values:z.infer<typeof loginSchema>)=>{
      mutate(values)
  }
  return <div className="flex justify-around min-h-screen items-center max-tablet:items-start tablet:max-laptop:py-6 tablet:max-laptop:items-start max-tablet:min-[80vh]">
    <div className={`${mont.className} max-tablet:w-full shrink-1 px-3 max-tablet:px-4 min-h-[90vh] py-5`}>
      <Logo varient='black' className='' Height={36} Width={110}></Logo>
      <h1 className={` text-[40px] font-[700] mt-[40px]`}>Login</h1>
      <p className="text-[16px] font-[400] py-[20px]">Login to access your Golobe account</p>
      {/* input fields */}
      <form onSubmit={handleSubmit(submit)}>
      <Controller
              name='email'
              control={control}
              render={({field})=>(
                <div className='max-mobile:w-full'>
                   <AuthInput label='Email' type='email' styles={'max-mobile:w-full'} onblur={field.onBlur} name={field.name} onChange={field.onChange} inputref={field.ref} value={field.value} placeholder='eg.,Johndoe@gmail.com'></AuthInput>
                  {errors.email && <p className='text-red-600'><sup>*</sup>{errors.email?.message}</p>}
                </div>
                
              )}
            ></Controller>
          <Controller
              name='password'
              control={control}
              render={({field})=>(
                <div className='max-mobile:w-full'>
                   <AuthInput label='Password' type='password' styles={''} onblur={field.onBlur} name={field.name} onChange={field.onChange} inputref={field.ref} value={field.value} placeholder='Enter Password'></AuthInput>
                  {errors.password && <p className='text-red-600'><sup>*</sup>{errors.password.message}</p>}
                </div>
                
              )}
            ></Controller>
             <Button type="submit" className='w-full bg-[#8DD3BB] rounded-[4px] h-[48px] mt-2 font-bold text-black shandow-none border-none'>{
          isPending ? (<div className='flex items-center gap-2'>
            <div className='w-5 h-5 border-l-2 border-t-2 border-white rounded-full animate-spin'>

            </div>
            <p>Signing in....</p>
          </div>):"login"
        }</Button>
      </form>

      <div className="check flex w-full justify-between mt-2">
          <div className='flex items-center gap-1'>
            <input type='checkbox' className='' id='remember' onClick={()=>remember.current = !remember.current} />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <Link href={'/'} className='text-[#FF8682]'>Forgot Password</Link>
      </div>
     
        <p className='pt-8 text-center font-[500]'>Don&apos;t Have an Account? <Link href={'/signup'} className='text-[#FF8682]'>Sign Up</Link></p>
        <Separator label='Or Login with'/>
      <Sso></Sso>
      </div>
        <Carasoul delay={2500} width={518} height={716} imgs={[`${plane.src}`,`${hotel.src}`]}></Carasoul>
  </div>
}


export default Page
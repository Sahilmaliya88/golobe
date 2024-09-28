"use client"
import { NextPage } from 'next'
import plane from '../../../../public/planeAuth.png'
import hotels from '../../../../public/hotelsAuth.png'
import Carasoul from './../../../components/carasoul/Carasoul';
import Logo from '@/app/components/Logo';
import  AuthInput  from '../../components/auth/AuthInput';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Separator from '@/app/components/separator';
import Sso from '../../components/auth/Sso';
import { useState } from 'react';
import {useForm,Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod';
import signUpSchema from '@/DB/schemas/SignUpSchema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '@/lib/slices/AuthSlice';
import { useRouter } from 'next/navigation';
import { NextFont } from 'next/dist/compiled/@next/font';
import { Montserrat } from 'next/font/google';
const mont:NextFont = Montserrat({subsets:['cyrillic']})
interface Props {}

const SignUp: NextPage<Props> = ({}) => {
  const imgs:string[] = [`${plane.src}`,`${hotels.src}`]
  const dispatch = useDispatch()
  const [accepted,setaccpeted] = useState<boolean>(false)
  //react query
  const router = useRouter()
  const {mutate,isPending} = useMutation({
    mutationFn:async(values:z.infer<typeof signUpSchema>)=>{
      try{
        const data= await axios.post(`/api/user/signup`,values)
        return data
      }catch(err){
        throw err
      }
    },
    onSuccess(data) {
      dispatch(addUser({user:data.data.user}))
      router.push('/')
    },
    onError(error) {
      console.log(error)
    },
  })  
  //form handling
  const {control,handleSubmit,formState:{errors}}  = useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema)
  })
  const submit = (data:z.infer<typeof signUpSchema>)=>{
      mutate(data)
  }
  return <div className={`${mont.className} p-6 w-full flex items-center gap-[40px] justify-center`}>
    <div className='max-tablet:hidden'>
          <Carasoul imgs={imgs} height={716} delay={2500} width={488}></Carasoul>
    </div>
      <div className='flex flex-col max-mobile:w-full gap-3'>
          <Logo varient='black' Width={110} Height={36}></Logo>
          <h1 className='text-[40px] font-[700] py-[16px]'>Sign Up</h1>
          <p className='font-[400]'>Let’s get you all st up so you can access your personal account.</p>
          <form onSubmit={handleSubmit(submit)}>
          <div className='flex justify-between gap-2 max-mobile:flex-wrap'>
            <Controller
              name='firstname'
              control={control}
              render={({field})=>(
                <div className='max-mobile:w-full w-1/2'>
                  <AuthInput label='First Name' onChange={field.onChange} value={field.value} name={field.name} inputref={field.ref} type='text' styles={'shrink-1 max-mobile:w-full'} placeholder='eg.,John'></AuthInput>
                  {errors.firstname && <p className='text-red-600'><sup>*</sup>{errors.firstname.message}</p>}
                </div>
                
              )}
            ></Controller>
                        <Controller
              name='lastname'
              control={control}
              render={({field})=>(
                <div className='max-mobile:w-full w-1/2'>
                   <AuthInput label='Last Name' type='text' styles={'shrink-1 max-mobile:w-full'} onChange={field.onChange} onblur={field.onBlur} name={field.name} inputref={field.ref} value={field.value} placeholder='eg.,Doe'></AuthInput>
                  {errors.lastname && <p className='text-red-600'><sup>*</sup>{errors.lastname.message}</p>}
                </div>
              )}
            ></Controller>
          </div>
          <div className='flex justify-between gap-2 max-mobile:flex-wrap'>
          <Controller
              name='email'
              control={control}
              render={({field})=>(
                <div className='max-mobile:w-full w-1/2'>
                   <AuthInput label='Email' type='email' styles={'max-mobile:w-full'} onblur={field.onBlur} name={field.name} onChange={field.onChange} inputref={field.ref} value={field.value} placeholder='eg.,Johndoe@gmail.com'></AuthInput>
                  {errors.email && <p className='text-red-600'><sup>*</sup>{errors.email?.message}</p>}
                </div>
                
              )}
            ></Controller>
                        <Controller
              name='mobile'
              control={control}
              render={({field})=>(
                <div className='max-mobile:w-full w-1/2'>
                   <AuthInput label='Phone Number' type='number' styles={'max-mobile:w-full'} onblur={field.onBlur} name={field.name} onChange={field.onChange} inputref={field.ref} value={field.value} placeholder='eg.,777-888-999'></AuthInput>
                  {errors.mobile && <p className='text-red-600'><sup>*</sup>{errors.mobile.message}</p>}
                </div>
                
              )}
            ></Controller>
           
          </div>
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
                      <Controller
              name='conformpassword'
              control={control}
              render={({field})=>(
                <div>
                   <AuthInput label='Conform Password' type='password' styles={''} placeholder='Conform Password' onChange={field.onChange} onblur={field.onBlur} name={field.name} inputref={field.ref} value={field.value}></AuthInput>
                  {errors.conformpassword && <p className='text-red-600'><sup>*</sup>{errors.conformpassword.message}</p>}
                </div>
                
              )}
            ></Controller>
         
          <div>
            <input id='t&c' type="checkbox" onChange={()=>setaccpeted(prev=>!prev)} />
            <label htmlFor='t&c'>I agree to all the <Link href={'/'} className='text-[#FF8682]'>Terms</Link> and <Link href={'/'} className='text-[#FF8682]'>Privacy Policies</Link></label>
          </div>
          <Button type='submit' className='bg-[#8DD3BB] w-full font-bold text-black' disabled={!accepted}>
              {
                isPending ? <div className='flex gap-2'><div className='w-5 border-l-[2px] border-t-[2px] border-white h-5 rounded-full animate-spin'></div>registering...</div>:"Sign Up"
              }
          </Button>
          </form>
        
          <p className='text-center'>Already Have an Account? <Link href={'/login'} className='text-[#FF8682]'>Login</Link></p>
          <Separator label='Or Sign up With'></Separator>
          <Sso></Sso>
      </div>
  </div>
}

export default SignUp
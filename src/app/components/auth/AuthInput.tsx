"use client"
import { Input } from "@/components/ui/input"
import React, {useState } from "react"
import { RefCallBack } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
const AuthInput = ({type,name,value,onblur,inputref,label,placeholder,styles,onChange}:{name?:string,onblur?:()=>void,value?:string | number,inputref?:RefCallBack,styles?:string,onChange?:()=>void,type:string,label:string,placeholder:string}) =>{
    const [show,setshow] = useState(false)
    if(type === 'password'){
      return (
        <fieldset className={`${styles} border rounded-sm relative border-gray-500  pb-2`}>
        <legend className='ml-[6px]  font-[400] text-[14px]'>{label}</legend>
        <Input type={show? "text":"password"} className='border-none font-sans  text-sm shadow-none outline-none w-full h-full focus-visible:ring-0 focus-visible:outline-none' name={name} value={value} ref={inputref} onBlur={onblur} placeholder={placeholder} onChange={onChange} />
        <div className="absolute top-0 right-[10px]" onClick={()=>setshow(prev=>!prev)}>
            {
                show? (<FaEyeSlash size={25}></FaEyeSlash>):(<FaRegEye size={25}></FaRegEye>)
            }
        </div>
      </fieldset>
      )
    }
    return(
        <fieldset className={`${styles} border rounded-sm border-gray-500  pb-2`}>
          <legend className='ml-[6px]  font-[400] text-[14px]'>{label}</legend>
          <Input type={type} className='border-none shadow-none text-sm font-sans outline-none w-full h-full focus-visible:ring-0 focus-visible:outline-none' name={name} value={value} ref={inputref} onBlur={onblur} placeholder={placeholder} onChange={onChange} />
        </fieldset>
    )
  }

  export default AuthInput
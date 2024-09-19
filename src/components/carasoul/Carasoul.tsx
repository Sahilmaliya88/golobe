"use client"
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import style from './Carasoul.module.css'
interface Props {
    width:number,
    height:number,
    imgs:string[],
    delay:number
}

const Carasoul: NextPage<Props> = ({width,delay,imgs,height}) => {
const [currIndex,setcurrIndex] = useState(0)
const changeIndex=()=>{
    if(currIndex<imgs.length-1){
        setcurrIndex(prev=>prev+1)
    }else{
        setcurrIndex(0)
    }
}

useEffect(()=>{
    const scrollable = document.getElementById('scrollable');
    if(scrollable){
        scrollable.scrollLeft = currIndex*width
    }
    const increase = setTimeout(()=>{
        changeIndex()
    },delay)
    return ()=>{
        clearTimeout(increase)
    }
},[currIndex])
  return(
            <div id={`${style.outer}`} className='relative max-tablet:hidden'style={{width:`${width}px`,height:`${height}px`}}>
                <div className={`${style.scrollable}`} id='scrollable' style={{width:`100%`,height:`100%`}}>
                    {
                        imgs.map((ele,index)=>(
                            <Image src={ele} key={index} alt='no img' width={width} height={height} quality={100} className={`${style.slides}`}></Image>
                        ))
                    }
                </div>
                <div className={`${style.slidecontroller}`}>
                    {
                        imgs.map((ele,index)=>(
                            <button key={index} onClick={()=>setcurrIndex(index)} className={`${style.dots} ${index===currIndex ? style.activedot:""}`}></button>
                        ))
                    }
                </div>
            </div>
      )
}

export default Carasoul
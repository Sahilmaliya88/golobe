"use client"
import { Button } from '@/components/ui/button';
import { NextPage } from 'next'
import { ReactNode, useState } from 'react';
import { FaPlane } from "react-icons/fa";
import { IoBed, IoSend } from "react-icons/io5";
import style from './Booking.module.css'
import { GoArrowSwitch } from "react-icons/go";
import { IoAddSharp } from "react-icons/io5";
import Model from './Model';
import { planedata } from '@/app/page';
interface Props {
    class:string,
}
type hotelState = {
    city:string,
    checkin:string,
    checkout:string,
    rooms:number
}
const hotel_initialState:hotelState = {
    city:'',
    checkin:'',
    checkout:'',
    rooms:0
}
const initialState:planedata = {
    from: '',
    to: '',
    depart:'',
    return:'',
    passenger: 0,
    class: 'economy',
    trip: 'oneway',
  };
const BookingForm: NextPage<Props> = ({}) => {
    const [type,setype] = useState<string>("")
    const [ismodelshow,setismodelshow] = useState<boolean>(false)
    function changeType (type:string){
        setismodelshow(true)
        setype(type)
    }
    function closeModel(){
        setismodelshow(false)
    }
    // planes block starts
    const [planeState,setPlaneState] = useState<planedata>(initialState)
    const [isplane,setisplane] = useState<boolean>(true) 
    function changePlaneState(key:string, value:string | number | Date){
        setPlaneState((prevState) => ({ ...prevState, [key]: value }));
    }
    // planeBlock ends here

   // hotelblock start here
   const [hotelstate,sethotelstate] = useState<hotelState>(hotel_initialState)
   function changehotelState (key:string,value:string | number){
    sethotelstate((prevState)=>({...prevState,[key]:value}))
   }
  return <div className='w-[1190px]   max-mobile:w-full max-laptop:w-full bg-white'>
        <div className="book-head h-[48px] flex justify-start w-full">
            <Button variant={"ghost"} onClick={()=>setisplane(true)} className={`${isplane && style.active} border-r rounded-none h-full border-[#D7E2EE] flex items-center font-bold gap-2`} size={"default"}><FaPlane></FaPlane><p>Flights</p></Button>
            <Button variant={"ghost"} onClick={()=>setisplane(false)} className={`${!isplane && style.active} h-full flex items-center font-bold gap-2`}><IoBed></IoBed><p>Stays</p></Button>
        </div>

            {
                isplane? (<div className='planes flex w-full max-mobile:w-full   gap-3 flex-wrap desktop:justify-between'>
                    {/* for the plane inputs */}
                    <InputWrapper  label='From-To'>
                        <Button variant={"ghost"} onClick={()=>changeType("fromto")} className='w-[324px] max-mobile:w-[250px] text-[16px] flex justify-start py-2 px-4'>{`${planeState?.from ? planeState.from:"From"}-${planeState?.to ? planeState.to:"To"}`}</Button>
                        <GoArrowSwitch size={24} className={style.arrows}/>
                    </InputWrapper>
                    <InputWrapper label='Trip'>
                        <select className='flex focus:outline-none max-mobile:w-[250px] px-4 w-[160px]  [&_option]:p-2' onChange={(e)=>changePlaneState("trip",e.target.value)}>
                            <option value="oneway">One-Way</option>
                            <option value={"charted"}>Charted</option>
                            <option value={"return"}>Return</option>
                        </select>
                    </InputWrapper>
                    <InputWrapper  label='Depart-Return'>
                        <Button variant={"ghost"} onClick={()=>changeType("depart")} className='w-[324px] max-mobile:w-[250px] text-[16px] flex justify-start py-2 px-4'>{`${planeState?.depart ? new Date(planeState.depart).toDateString():"Depart"}${!(planeState?.trip === "return")? `-${planeState?.return ? new Date(planeState.return).toDateString():"Return"}`:"" }`}</Button>
                    </InputWrapper>
                    <InputWrapper  label='Passenger-Class'>
                        <Button variant={"ghost"} onClick={()=>changeType("class")} className='w-[324px] max-mobile:w-[250px]  text-[16px] flex justify-start py-2 px-4'>{`${planeState?.passenger ? planeState.passenger:"0"} Passengers-${planeState?.class ? planeState.class:"Class"}`}</Button>
                    </InputWrapper>
                   
                </div>):(<div className='flex w-full max-mobile:w-full   gap-3 flex-wrap desktop:justify-between'>
                    <InputWrapper  label='City'>
                        <Button variant={"ghost"} onClick={()=>changeType("city")} className='w-[324px] max-mobile:w-[250px] text-[16px] flex justify-start py-2 px-4'>{hotelstate.city || 'City'}</Button>
                    </InputWrapper>
                    <InputWrapper  label='CheckIn'>
                        <Button variant={"ghost"} onClick={()=>changeType("checkin")} className='w-[324px] max-mobile:w-[250px] text-[16px] flex justify-start py-2 px-4'>{`${hotelstate.checkin ? new Date(hotelstate.checkin).toDateString():"CheckIn"}`}</Button>
                    </InputWrapper>
                    <InputWrapper  label='CheckOut'>
                        <Button variant={"ghost"} onClick={()=>changeType("checkout")}  className='w-[324px] max-mobile:w-[250px] text-[16px] flex justify-start py-2 px-4'>{`${hotelstate.checkout ? new Date(hotelstate.checkout).toDateString():"CheckOut"}`}</Button>
                    </InputWrapper>
                    <InputWrapper  label='Room'>
                        <Button variant={"ghost"} onClick={()=>changeType("rooms")} className='w-[324px]max-mobile:w-[250px] text-[16px] flex justify-start py-2 px-4'>{hotelstate.rooms || 0} rooms</Button>
                    </InputWrapper>
                </div>)
            }
             <div className='flex mt-4 px-2 w-full flex-wrap max-mobile:justify-center justify-end '>
                        <Button variant={"ghost"} className='flex items-center gap-2'><IoAddSharp></IoAddSharp> <p>Add Promo Code</p></Button>
                        <Button  className='flex gap-2 rounded-none items-center bg-[#8DD3BB] text-black' dir='ltr'><IoSend></IoSend> <p>Show {isplane ? "Flights":"Stays"}</p></Button>
            </div>
          {ismodelshow &&  <Model hotelChange={changehotelState} closeFunc={closeModel} changeFunc={changePlaneState} type={type}></Model>}
  </div>
}
interface inputwrapper{
    label:string,
  
    children:ReactNode
}
const InputWrapper:NextPage<inputwrapper> =({label,children})=>{
    return <fieldset className={`${style.inputwrapper} planechild h-[56px]  `}>
        <legend className={style.lged}>{label}</legend>
        {children}
    </fieldset>
}
export default BookingForm
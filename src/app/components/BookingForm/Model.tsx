import { ReactNode } from "react";
import Skeleton, { InputForModel } from "./Skeleton";

type props={hotelChange:(key:string,value:string | number)=>void,type:string,changeFunc:(key:string, value:string | number | Date)=>void,closeFunc:()=>void}
export default function Model({type,closeFunc,hotelChange,changeFunc}:props){
    const description = "Make changes to your Prefference here. Click save when you're done."
    switch(type){
        case 'fromto':
            return <Wrapper>
                    <Skeleton label="From-TO" description={description} closeFunc={closeFunc}>
                        <InputForModel label="From" placeholder="eg.,Mumbai" type="text" title={"from"} changeFunc={changeFunc}></InputForModel>
                        <InputForModel label="To" placeholder="eg.,Dubai" type="text" title={"to"} changeFunc={changeFunc}></InputForModel>
                    </Skeleton>
                </Wrapper>
        case 'depart':
            return <Wrapper>
                     <Skeleton label="Depart-Return" description={description} closeFunc={closeFunc}>
                        <InputForModel label="Depart"placeholder=""  type="Date" title={"depart"} changeFunc={changeFunc}></InputForModel>
                        <InputForModel label="Return" type="Date" placeholder="" title={"return"} changeFunc={changeFunc}></InputForModel>
                    </Skeleton>
            </Wrapper>
        case 'class':
            return <Wrapper>
                     <Skeleton label="Passenger-Class" description={description} closeFunc={closeFunc}>
                        <InputForModel label="Passengers" placeholder="0" type="number" title={"passenger"} changeFunc={changeFunc}></InputForModel>
                        <div className="flex items-center gap-2 justify-end mt-8">
                            <label className="font-bold">Class</label>
                            <select onChange={(e)=>changeFunc("class",e.target.value)} className="min-w-[200px] p-2 h-[50px] border-2 border-gray-300 rounded-md font-semibold placeholder:font-bold max-w-[350px]">
                                <option value={"bussiness"}>Bussiness</option>
                                <option value="economy">Economy</option>
                            </select>
                        </div>
                    </Skeleton>
                </Wrapper>
            case 'city':
                    return <Wrapper>
                                <Skeleton label="City" description={description} closeFunc={closeFunc}>
                                <InputForModel label="City" placeholder="eg.,Mumbai"  type="Text" title={"city"} changeFunc={hotelChange}></InputForModel>
                                </Skeleton>
                            </Wrapper>
            case 'checkin':
                return <Wrapper>
                        <Skeleton label="CheckIn" description={description} closeFunc={closeFunc}>
                            <InputForModel label="CheckIn" placeholder="CheckIn date"  type="Date" title={"checkin"} changeFunc={hotelChange}></InputForModel>
                        </Skeleton>
                        </Wrapper>
            case 'checkout':
                return <Wrapper>
                        <Skeleton label="CheckOut" description={description} closeFunc={closeFunc}>
                            <InputForModel label="CheckOut" placeholder="CheckOut date"  type="Date" title={"checkout"} changeFunc={hotelChange}></InputForModel>
                        </Skeleton>
                        </Wrapper>
            case 'rooms':
                return <Wrapper>
                        <Skeleton label="Rooms" description={description} closeFunc={closeFunc}>
                            <InputForModel label="Rooms" placeholder="0"  type="number" title={"rooms"} changeFunc={hotelChange}></InputForModel>
                        </Skeleton>
                        </Wrapper>

        default:
            return <Wrapper><h1>nothing to change</h1></Wrapper>
        }
}
const Wrapper = ({children}:{children:ReactNode})=>{
    return <div className="absolute p-3 w-[500px] min-h-[350px] rounded-md max-mobile:w-[300px] bg-white z-20 shadow-md shadow-gray-400  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">{children}</div>;
}

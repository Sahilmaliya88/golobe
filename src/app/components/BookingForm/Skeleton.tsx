import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ReactNode } from "react"
import { VscClose } from "react-icons/vsc";
type S_Prop={
    label:string,
    description:string,
    closeFunc:()=>void,
    children:ReactNode
}
const Skeleton = ({label,description,closeFunc,children}:S_Prop)=>{
    return  <div className="w-full h-full relative">
            <h1 className="font-semibold text-[22px]">{label}</h1>
            <p className="font-[500] text-gray-600">{description}</p>
            <div>
                {children}
            </div>
            <Button className="absolute bottom-[-60px] h-[45px] right-0" onClick={closeFunc}>Save Changes</Button>
            <Button variant={"ghost"} size={"icon"} onClick={closeFunc} className="absolute top-0 right-2">
                <VscClose size={20} color="gray"></VscClose>
            </Button>
    </div>
}
export const InputForModel =({label,placeholder,type,title,changeFunc}:{label:string,title:string,changeFunc:(key:string, value:string | number )=>void,placeholder:string,type:string})=>{
    return <div className="flex items-center justify-end gap-2 mt-8">
        <label className="font-bold">{label}</label>
        <Input placeholder={placeholder} onChange={(e)=>changeFunc(title,e.target.value)} className="min-w-[150px] p-2 h-[50px] placeholder:font-bold max-w-[350px]" type={type}></Input>
    </div>
}

export default Skeleton
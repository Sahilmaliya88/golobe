import { NextPage } from 'next'

interface Props {
    label:string
    className?:"string"
}   

const Separator: NextPage<Props> = ({label,className}) => {
  return <div className={`${className} w-full flex items-center gap-2 p-4`}>
    <div className='w-[38%] h-[0.5px] bg-gray-300 '>

    </div>
    <h2 className='text-[14px] font-[400] text-gray-500 text-nowrap'>{label}</h2>
    <div className='w-[38%] h-[0.5px] bg-gray-300'>

    </div>
  </div>
}

export default Separator
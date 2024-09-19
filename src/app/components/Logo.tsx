import { NextPage } from 'next'
import Image from 'next/image'
import logo from '../../../public/Logo.png'
import whitelogo from '../../../public/whitelogo.png'
interface Props {
    Height:number,
    Width:number,
    varient: string,
    className?:string
}

const Logo: NextPage<Props> = ({Height,Width,varient,className}) => {
  return <Image className={`${className} w-[110px] h-[36px]`} src={varient === "white" ? whitelogo:logo}  alt='logo' height={Height} width={Width} quality={100} fill={false}></Image>
}

export default Logo
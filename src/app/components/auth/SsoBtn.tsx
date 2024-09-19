"use client"
import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
    children:ReactNode,
    onClick?:()=>void
}

const SsoBtn: NextPage<Props> = ({children,onClick}) => {
  return <button className="w-[160px] h-[56px] shrink-1 flex items-center justify-center border border-[#8DD3BB] rounded-sm" onClick={onClick}>
    {children}
  </button>
}

export default SsoBtn
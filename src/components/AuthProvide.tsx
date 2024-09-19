"use client"
import { NextPage } from 'next'
import {SessionProvider} from 'next-auth/react'
import { ReactNode } from 'react';
interface Props {
    children:ReactNode
}

const AuthProvider: NextPage<Props> = ({children}) => {
  return <SessionProvider>
    {children}
  </SessionProvider>
}

export default AuthProvider
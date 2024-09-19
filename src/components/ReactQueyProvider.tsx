"use client"
import { NextPage } from 'next'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import React from 'react'
interface Props {
    children: React.ReactNode
}

const ReactQueyProvider: NextPage<Props> = ({children}) => {
    const client:QueryClient = new QueryClient()
  return <QueryClientProvider client={client}>
    {children}
  </QueryClientProvider>
}

export default ReactQueyProvider
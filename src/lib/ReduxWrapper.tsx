"use client"
import { store } from "./store";
import { NextPage } from 'next'
import { ReactNode } from "react";
import { Provider } from "react-redux";
interface Props {
    children:ReactNode
}

const ReduxWrapper: NextPage<Props> = ({children}) => {
  return <Provider store={store}>
    {children}
  </Provider>
}

export default ReduxWrapper
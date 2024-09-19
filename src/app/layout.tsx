import "./globals.css";
import {Montserrat} from 'next/font/google';
import ReduxWrapper from "@/lib/ReduxWrapper";
import ReactQueyProvider from "@/components/ReactQueyProvider";
import { Loader } from "@/components/Loader";
/* eslint-disable */
const mont:NextFont = Montserrat({subsets:['cyrillic']})
/* esline-enable */
import {Toaster} from 'react-hot-toast'
import AuthProvider from "@/components/AuthProvide";
import { NextFont } from "next/dist/compiled/@next/font";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mont.className} antialiased`}
      >
        <AuthProvider>
        <ReactQueyProvider>
        <ReduxWrapper>
              <div>
                {children}  
                <Loader></Loader>
                <Toaster position="top-right"></Toaster>
              </div> 
        </ReduxWrapper>
        </ReactQueyProvider>
        </AuthProvider>
       
      </body>
    </html>
  );
}

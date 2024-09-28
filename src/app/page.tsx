import { NextPage } from 'next'
import Header from './components/Header/Header'
import BookingForm from './components/BookingForm/BookingForm'
import RecentSearch from './components/Search/RecentSearch'
import type { Metadata } from "next";
import { NextFont } from 'next/dist/compiled/@next/font';
import { Montserrat } from 'next/font/google';
const mont:NextFont = Montserrat({subsets:['cyrillic']})
export const metadata: Metadata = {
  title: "Golobe",
  description: "Golobe is for improve your travelling",
  
};
interface Props {}
export type planedata={
  from:string,
  to:string,
  trip:string,
  depart:string,
  return:string,
  passenger:number,
  class:string
}
const Page: NextPage<Props> = ({}) => {

  
  return <div className='p-[30px]  max-md:p-1 w-full'>
      {/* booking form and header div */}
      <div className="headerdiv h-[599px] max-tablet:h-[460px] max-mobile:h-[250px] w-full">
        <div className="headerinnerdiv">
          <Header radius={0}></Header>
        </div>
        <div className={`${mont.className} max-tablet:w-full *:text-center main-text`}>
            <h1 className='text-[45px] z-2 max-mobile:text-[35px] leading-[56px] max-mobile:leading-tight  font-[700]'>Helping Others</h1>
            <h1 className='text-[80px] z-2 max-mobile:text-[60px] leading-[101px] max-mobile:leading-[80px] font-[700]'>Live & Travel</h1>
            <p className='text-[20px] z-2 font-[600px]'>Special offers to suit your plan</p>
        </div>
        <div className="Book shadow-sm max-sm:w-full shadow-gray-300">
        <BookingForm  class='none'></BookingForm>
        </div>
      </div>  
      {/* recenet search */}
    <RecentSearch />
  </div>
}

export default Page
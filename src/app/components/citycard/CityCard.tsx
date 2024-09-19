import { NextPage } from 'next'
import Image  from 'next/image';
import city from '../../../../public/andre-benz-Mn9Fa_wQH-M-unsplash.jpg'
interface Props {}

const CityCard: NextPage<Props> = ({}) => {
  return <div className='flex text-black items-center gap-3 shrink-0 py-3'>
        <Image src={city} alt='city' width={90} height={90} quality={100} className=' h-[90px] rounded-md'></Image>
        <div>
          <h1 className='font-[600] text-[16px]'>New York,USA</h1>
          <p>325 places</p>
        </div>
  </div>
}

export default CityCard
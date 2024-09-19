import { NextPage } from 'next'
import style from './auth.module.css'
interface Props {}

const Loading: NextPage<Props> = ({}) => {
  return <div className='w-full flex min-h-screen justify-center items-center'>
    <div className={`${style.loader}`}></div>
  </div>
}

export default Loading
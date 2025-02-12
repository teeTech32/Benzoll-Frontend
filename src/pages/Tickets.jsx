import { useEffect} from 'react'
import { getTickets, reset } from '../features/ticket/ticketSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import {RiChatDeleteFill} from 'react-icons/ri'
import TicketItem from '../components/TicketItem'


const Tickets = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {tickets, isSuccess} = useSelector((state)=>state.ticket)

  useEffect(()=>{
    return ()=>{
      if(isSuccess){
        dispatch(reset())
      }
    }
    //eslint-disable-next-line
  },[])

  useEffect(()=>{
      dispatch(getTickets())
      // eslint-disable-next-line
  },[])
   
  return (
    <>
      <section class='flex justify-center relative'>
        <header class='font-serif font-bold text-xl flex mt-28 mb-5 md:text-2xl xl:text-3xl text-white'>
          Tickets
        </header>
        <RiChatDeleteFill class='absolute top-20 xl:top-24 left-4 text-xl hover:text-red-600 cursor-pointer xl:text-2xl text-white' onClick={()=>navigate('/')}/>
      </section>
      <section class='bg-green-200 p-5 '>
        <ul class='font-bold font-serif flex flex-row justify-evenly text-sm md:text-lg xl:text-xl'>
          <li>
            <div>Product</div>
          </li>
          <li>
            <div>Description</div>
          </li>
          <li>
            <div>Date&Time</div>
          </li>
          <li>
            <div>Status</div>
          </li>
          <li>
            <div></div>
          </li>
        </ul>
      </section>
      <section class='bg-green-950 opacity-50 '>
        <div class='pt-5 pb-40 px-10 '>
          { tickets ? tickets?.map((ticket)=>(
            <TicketItem key={ticket?._id} ticket={ticket}/>
          )) : <Navigate to='/'/>}
        </div>
      </section>
    </>
    
   
  )
}

export default Tickets

import { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAll, reset } from '../features/ticket/ticketSlice'
import AllticketItems from './AllticketItems'

const Alltickets = () => {
  const dispatch = useDispatch()
  const [visibleCount, setVisibleCount] = useState(6)
  const {tickests, isSuccess} = useSelector((state)=>state.ticket)

  useEffect(()=>{
    dispatch(getAll())
    console.log(tickests)
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(isSuccess){
      dispatch(reset())
    }
    // eslint-disable-next-line
  },[])

  
  return (
    <div>
      <header class='text-center mb-10 mt-20'>
        <h1 class='font-bold text-white md:text-lg xl:text-xl'>All Customers' Tickets</h1>
      </header>
      <div class='px-20'>
         { Array.isArray(tickests )? tickests.slice(0, visibleCount)?.map((ticket)=>(
            <AllticketItems key={ticket._id} ticket={ticket} class='px-10'/> )) : 
             (<div class='text-center'>
                <h1 class='text-center text-white font-extrabold pt-10 md:text-xl'>
                  You couldn't get tickets from all customers due to connection error!!!
                </h1>
              </div>)
          }
      </div>
      {visibleCount < tickests.length && (
        <div class='text-center'>
          <button class='btn btn-sm xl:btn-md text-black bg-green-300 mb-10 hover:bg-green-900 hover:text-white' onClick={()=>setVisibleCount(visibleCount + 4)}>
            Show more
          </button>
        </div>
        )}
    </div>
  )
}

export default Alltickets
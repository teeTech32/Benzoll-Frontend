import { useDispatch } from 'react-redux'
import { deleteTicket } from '../features/ticket/ticketSlice'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const DeleteTicket = ({setDeleteTicket}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {ticketId} = useParams()

  const onDelete = ()=>{
    dispatch(deleteTicket(ticketId))
    setTimeout(()=>{
      setDeleteTicket(false)
      navigate('/tickets')
    },6000)
  }

  return (
    <div class='bg-green-950 bg-opacity-50 h-full w-screen top-0 left-0 backdrop-blur-sm z-50 fixed '>
      <div class='w-[250px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-950 rounded-md absolute '>
        <p class='text-xs text-white font-semibold m-3'>
          Confirm your interest in deleting this ticket and mind you, it can't be retrieved.
        </p>
        <button class='btn btn-sm m-3 font-semibold text-black hover:bg-red-600 hover:text-white' onClick={onDelete}>
           Delete Ticket
        </button>
        <button class='btn btn-sm my-3 ml-8 font-semibold text-black hover:bg-green-900 hover:text-white' onClick={()=>setDeleteTicket(false)}>
          Council
        </button>
      </div>
    </div>
  )
}
export default DeleteTicket
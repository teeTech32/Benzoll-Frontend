import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getTicket, reset, closeTicket } from "../features/ticket/ticketSlice"
import {getNotes, reset as getNotesreset} from "../features/note/noteSlice"
import { useNavigate, Navigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {RiChatDeleteFill} from 'react-icons/ri'
import { FaPlus } from "react-icons/fa";
import NoteItem from "../components/NoteItem"
import AddNoteform from "../components/AddNoteform"
import DeleteTicket from "../components/DeleteTicket"
import EditTicket from "../components/EditTicket"
import { TiDelete } from "react-icons/ti";
import { MdEditSquare } from "react-icons/md";

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [deleteTicket, setDeleteTicket] = useState(false)
  const [editTicket, setEditTicket] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {ticketId} = useParams()
  const {isError, message, ticket} = useSelector((state)=>state.ticket)
  const {notes} = useSelector((state)=>state.note)
  const {user} = useSelector((state)=>state.auth)

  useEffect(()=>{
   if(isError){
   toast.error(message)
   }
   dispatch(getTicket(ticketId))
   dispatch(getNotes(ticketId))
   dispatch(reset())
   dispatch(getNotesreset())
   // eslint-disable-next-line
  },[])

  const onCloseTicket = ()=>{
    dispatch(closeTicket(ticketId))
    navigate('/tickets')
  }

  return ticket ?<div data-aos="fade-down"
                      data-aos-easing="linear"
                      data-aos-duration="1500" class='flex justify-center'> 
  <div class='container w-[450px] h-auto md:w-[550px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-300 via-green-700 to-green-900 mx-6 my-28 py-5  rounded-t-xl rounded-bl-xl relative '>
    {showAlert && (
                  <div className="absolute   mb-2 right-0 top-2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg shadow-lg">
                    Go Back ?
                  </div>
                )}
    <RiChatDeleteFill class='text-xl md:text-2xl  cursor-pointer text-green-300 hover:text-red-600 absolute top-2 right-2' onClick={()=> navigate('/tickets')}
      onMouseEnter={()=>setShowAlert(true)}
      onMouseLeave={()=>setShowAlert(false)}/>
      <header class='font-bold text-center text-white text-md md:text-lg xl:text-xl font-serif mb-5'>
        Ticket
      </header>
      <div class='my-2 absolute top-12 right-3'>
        <button class="btn btn-xs hover:bg-red-600 duration-1000 hover:scale-110 mr-2" onClick={()=>setDeleteTicket(true)}>
          <TiDelete class="text-red-600 " />
          <p class='text-xs text-black hover:text-white'>Delete</p>
        </button>
        <button class="btn btn-xs hover:bg-green-900 duration-1000 hover:scale-110 mr-1" onClick={()=>setEditTicket(true)}>
          <MdEditSquare class='text-green-600 ' />
          <p class='text-xs text-black hover:text-white'>Edit</p>
        </button>
      </div>
      <div class='text-white text-xs md:text-xl xl:text-2xl'>
        <div class='flex flex-col '>
          <div class='mt-6'>
            <div class='my-1'>
              <p class="text-xs"><span class='text-xs badge-md badge-success rounded-md text-white '>Ticket Id</span> : {ticket._id}</p>
            </div>
            <div class='my-1'>
              <p class="text-xs"><span class='text-xs badge-md badge-success rounded-md text-white'>Ticket UserId</span> : {ticket.user}</p>
            </div>
            <div class='my-1'>
              <p className="text-xs"><span class='text-xs badge-md badge-success rounded-md text-white'>Ticket Product</span> : {ticket.product}</p>
            </div>
            <div class='my-1'>
              <p class="text-xs"><span class='text-xs badge-md badge-success rounded-md text-white'>Ticket Issue</span> : {ticket.description}</p>
            </div>
            <div class='my-1'>
              <p class="text-xs"><span class='text-xs badge-md badge-success rounded-md text-white'>Ticket Status</span> : {ticket.status}</p>
            </div>
            <div class='my-1'>
              <p class="text-xs"><span class='text-xs badge-md badge-success rounded-md text-white'>Created Date</span> : {new Date(ticket.createdAt).toLocaleString('en-US')}</p>
            </div>
            <div class='my-1'>
              <p class="text-xs"><span class='text-xs badge-md badge-success rounded-md text-white'>Updated Date</span> : {new Date(ticket.updatedAt).toLocaleString('en-US')}</p>
            </div>
          </div>
          <h3 class="font-bold underline mt-3 text-sm">
            Notes
          </h3>
          <div>
            {ticket.status !== "closed" && (
              <button onClick={()=> setModalIsOpen(true)} class='inline-flex btn btn-xs bg-green-400 hover:bg-green-900 text-black hover:text-white duration-1000 hover:scale-110 float-right my-1'> 
                <FaPlus class='text-xs'/>
                <p class='text-xs font-semibold'>Add Note</p>
              </button>
            )}
          </div>
          <div class='font-semibold text-xs mt-1'>Notes from <span class='text-black'>{user.name}</span> : </div>
          <div>
            {notes.map((note)=>
              <NoteItem key={note._id} note={note} />
            )}
          </div>
          <div class='flex justify-center mt-10 mb-5'>
            {ticket.status !== 'closed' ? (
              <button class='btn btn-xs md:btn-sm xl:btn-sm bg-green-400 hover:bg-green-900 text-black hover:text-white duration-1000 hover:scale-110 text-xs font-semibold' onClick={onCloseTicket}>
              Close Ticket
              </button>): (
              <button class='btn btn-xs  bg-green-400 hover:bg-green-900 text-black hover:text-white duration-1000 hover:scale-110 text-xs font-semibold' onClick={onCloseTicket}>
                Ticket Closed
              </button>)
            }
          </div>  
        </div>
      </div>
    </div>
    { modalIsOpen && <AddNoteform setModalIsOpen={setModalIsOpen}/>}
    { deleteTicket && <DeleteTicket setDeleteTicket={setDeleteTicket}/>}
    { editTicket && <EditTicket setEditTicket={setEditTicket}/>}
  </div>
   : <Navigate to='/tickets'/>
}

export default Ticket

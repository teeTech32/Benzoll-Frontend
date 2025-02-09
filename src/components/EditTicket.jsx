import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { editTicketData, getTicket } from "../features/ticket/ticketSlice";
import { useDispatch, useSelector } from "react-redux";

const EditTicket = ({setEditTicket}) => {
  const [choice, setChoice] = useState('')
  const [text, setText] = useState('')
  const {ticketId} = useParams()
  const dispatch = useDispatch()
  const {ticket} = useSelector((state)=>state.ticket)

  useEffect(()=>{
    setChoice(ticket.product)
    setText(ticket.description)
    //eslint-disable-next-line
  },[])
  
  const handleEditTicket = (e)=>{
    e.preventDefault()
    dispatch(editTicketData({choice, text, ticketId}))
    setTimeout(()=>{
      dispatch(getTicket(ticketId))
      setEditTicket(false)
    },5000)
  }

  return (
    <div class='bg-green-950 bg-opacity-50 h-full w-screen top-0 pb-20 backdrop-blur-sm z-50 fixed'>
      <div class='w-[300px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-950 rounded-md absolute'>
        <div class=' rounded-md'>
          <header class='font-bold text-white text-center my-2'>
            Edit Form
          </header>
          <TiDelete class='cursor-pointer text-xl absolute top-0 right-0 text-white hover:text-red-600' onClick={()=>setEditTicket(false)}/>
          <form onSubmit={handleEditTicket}>
            <div class='grid mb-2'>
              <label htmlFor="name" class='font-bold pt-2 pb-1 ml-2 text-sm text-white'>Select Product</label>
              <select id="product" 
                      name="description" 
                      value={choice} 
                      class='text-xs w-[285px] mx-2 py-1 bg-green-200 rounded-md shadow-lg'
                      required
                      onChange={(e)=>setChoice(e.target.value)} >
                <option value=""></option>
                <option value="iPhone">iPhone</option>
                <option value="Macbook">Macbook</option>
                <option value="Windows">Windows</option>
                <option value="Andriod">Andriod</option>
                <option value="Laptop">Laptop</option>
                <option value="Linux">Linux</option>
                <option value="Tab">Tab</option>
              </select>
            </div> 
            <div>
              <label htmlFor="text" class='font-bold pt-2 pb-1 ml-2 text-sm text-white'>Descriptions:</label>
              <textarea 
              name="text" 
              id="text" 
              placeholder='Describe product issues'
              value={text}
              rows={5}
              cols={30}
              class='w-[285px] p-2 mx-2 text-xs text-black'
              onChange={(e)=>setText(e.target.value)} >
              </textarea>
            </div>
            <button class='btn btn-sm text-white text-xs font-semibold hover:text-white bg-green-950 hover:bg-green-500 scale-105 duration-1000 px-20 my-5 mx-10 justify-center'>
              Edit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default EditTicket
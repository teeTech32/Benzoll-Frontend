import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { MdEditSquare } from "react-icons/md";
import EditNote from "./EditNote";
import { useDispatch } from "react-redux";
import { deleteNote, getNotes } from "../features/note/noteSlice";
import { useParams } from "react-router-dom";

const NoteItem = ({note}) => {
  const [openEditNote, setOpenEditNote] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertEdit, setShowAlertEdit] = useState(false)
  const dispatch = useDispatch()
  const {ticketId} = useParams()
  const noteId = note._id
  
  const onDeletNote = ()=>{
    dispatch(deleteNote({ticketId, noteId}))
    setTimeout(()=>{
      dispatch(getNotes(ticketId))
    },2000)
  }
 
  return (
    <>
      <div class={`card card-body mt-2 border-2 border-white rounded-md px-2 pb-2 pt-1 ${note.isstaff === 'YES' ? 'bg-green-400' : ''}`}>
        <div class='md:text-lg text-sm '>
          <button class="float-end hover:text-red-600 ml-1">
            {showAlert && (
                  <div className="absolute bottom-full w-36 mb-2 left-1/2 transform -translate-x-3/2 bg-black text-white text-sm px-2 py-1 rounded-lg shadow-lg">
                      Clicking on this button means you have intentionally deleted a note which can not be retrieved !
                  </div>
                ) }
            <TiDelete onMouseEnter={()=>setShowAlert(true)} onMouseLeave={()=>setShowAlert(false)} onClick={onDeletNote}/>
          </button>
          <button class={`float-end ${note.isstaff === 'YES' ? 'hover:text-green-800' : 'hover:text-green-400'} `}>
            {showAlertEdit && (
                    <div className="absolute   mb-2 right-0 top-2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg shadow-lg">
                      Edit Note ?
                    </div>
                  )}
            <MdEditSquare onMouseEnter={()=>setShowAlertEdit(true)} onMouseLeave={()=>setShowAlertEdit(false)} onClick={()=>setOpenEditNote(true)}/>
          </button>
        </div>
        <div class='space-x-1 md:space-x-10 xl:space-x-20'>
          <div class='text-xs leading-5 float-left '>{note.text}</div>
          <div class='text-xs leading-5 float-right '>{new Date(note.createdAt).toLocaleString('en-US')}</div>
        </div>
      </div>
      {openEditNote && <EditNote setOpenEditNote={setOpenEditNote} note={note}/>}
    </>
   
  )
}

export default NoteItem
import { useState } from "react"
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { editNote , getNotes} from "../features/note/noteSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditNote = ({setOpenEditNote, note}) => {
  const [noteEditText, setNoteEditText] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const dispatch = useDispatch()
  const {ticketId} = useParams()
  const noteId = note?._id

  useEffect(()=>{
    setNoteEditText(note.text)
    // eslint-disable-next-line
  },[])

  const onSubmitNoteEdit = (e)=>{
    e.preventDefault()
      dispatch(editNote({noteEditText, ticketId, noteId}))
      setTimeout(()=>{
        dispatch(getNotes(ticketId))
        setOpenEditNote(false)
      },5000)
  }

  return (
     <div class='bg-green-950 bg-opacity-50 h-full w-screen top-0 left-0 backdrop-blur-sm z-50 fixed '>
          <div class='w-[300px] md:w-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-950 rounded-md absolute '>
            <h2 class=' font-bold mx-4 my-2 text-white text-sm md:text-lg'>Edit Note</h2>
            <button onClick={()=> setOpenEditNote(false)} class='absolute top-2 right-2'>
              <RxCross2 class='text-lg font-extrabold hover:text-red-600 text-white '/>
            </button>
            <div class='my-3 ml-2 mr-1'>
              <form onSubmit={onSubmitNoteEdit}>
                <div>
                  <textarea name="noteEditText" 
                            type='text'
                            id="noteEditText" 
                            placeholder='Note Text' 
                            value={noteEditText} 
                            class='text-black text-xs rounded-md w-[283px] md:w-[383px] h-40 px-2 pt-1 pb-2 border-2 border-green-600 resize-none' 
                            onChange={(e)=>setNoteEditText(e.target.value)}>
                  </textarea>
                </div>
                {showAlert && (
                  <div className="absolute  mb-2 right-5 top-30 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg shadow-lg">
                    Submit Note ?
                  </div>
                )}
                <button class='btn btn-xs rounded-full bg-green-900 mt-3 mb-4 mr-2 float-right text-xs pb-1 text-white hover:bg-black hover:scale-105 duration-1000' onMouseEnter={()=>setShowAlert(true)} onMouseLeave={()=>setShowAlert(false)}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
  )
}

export default EditNote
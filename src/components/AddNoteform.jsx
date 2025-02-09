import {useState} from 'react'
import { useParams } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { createNote } from '../features/note/noteSlice';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify'

const AddNoteform = ({setModalIsOpen}) => {
    const [noteText, setNoteText] = useState('') 
    const [istaffText, setIstaffText] = useState('') 
    const [isStaff, setIsStaff] = useState(false) 
    const [showAlert, setShowAlert] = useState(false)
    const [showAlert1, setShowAlert1] = useState(false)
    const dispatch = useDispatch()
    const {ticketId} = useParams()

  const onSubmitNoteText = (e)=>{
    e.preventDefault()
    if(!noteText || !istaffText){
      toast.error('Enter text and choose an option')
    }else{
      dispatch(createNote({noteText, istaffText, ticketId}))
      setModalIsOpen(false)
    }
  }           

  return (
    <div  class='bg-green-950 bg-opacity-50 h-full w-screen top-0 left-0 backdrop-blur-sm z-50 fixed '>
      <div class='w-[300px] md:w-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-950 rounded-md absolute '>
        <h2 class=' font-bold mx-4 my-2 text-white '>Add Note</h2>
        <button onClick={()=> setModalIsOpen(false)} class='absolute top-2 right-2'><RxCross2 class='text-lg font-extrabold hover:text-red-600 text-white '/></button>
        <div class='my-3 ml-2 mr-1'>
          <form onSubmit={onSubmitNoteText}>
            <div>
              <textarea name="noteText"
                        type='text' 
                        id="noteText" 
                        placeholder='Note Text' 
                        value={noteText} 
                        required
                        class='text-xs rounded-md w-[283px] md:w-[383px] h-40 px-2 pt-1 pb-2 border-2 border-green-600 resize-none ' 
                        onChange={(e)=>setNoteText(e.target.value)}>
              </textarea>
            </div>
            <button class='btn btn-xs rounded-full bg-green-900 mt-3 mb-4 mr-2 float-right text-xs pb-1 text-white hover:bg-black hover:scale-105 duration-1000'>Submit</button>
          </form>
          <div class='absolute bottom-4 left-3 inline-flex'>
              {showAlert && (
                <div className="absolute bottom-full w-36 mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg shadow-lg">
                  Clicking this button means you want to drop note for a Client !
                </div>
              )}
              {showAlert1 && (
                <div className="absolute bottom-full w-36 mb-2 left-1/2 transform -translate-x-3/2 bg-green-950 text-white text-sm px-2 py-1 rounded-lg shadow-lg">
                    Clicking this button means you want to drop note for a Staff !
                </div>
              )}
              <p class='text-xs font-semibold text-white pt-1 pr-1'>Are You A Staff ?</p>
              <button class={`btn btn-xs text-xs rounded-full text-white ${isStaff ? ' bg-black' : ' bg-green-900'}`} onClick={()=>{
                  setIstaffText('YES')
                  setIsStaff(true)}}  
                onMouseEnter={() => setShowAlert(true)}
                onMouseLeave={() => setShowAlert(false)}>YES</button><span class='text-white font-bold mx-1'>/</span>
              <button class={`btn btn-xs text-xs rounded-full text-white ${!isStaff ? ' bg-black' : ' bg-green-900'}`} onClick={()=>{
                setIstaffText('NO')
                setIsStaff(false)}}  
                onMouseEnter={() => setShowAlert1(true)}
                onMouseLeave={() => setShowAlert1(false)}>NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNoteform
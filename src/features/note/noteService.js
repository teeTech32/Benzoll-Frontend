import axios from "axios";
import {toast} from 'react-toastify'


const API_URL = '/api/tickets/'

const getNotes = async(ticketId, token) =>{
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + ticketId + '/notes', config)
  if(response.status===200){
    toast.success('Notes viewed')
    return response.data
  }else{
    toast.error('Check your internet connection')
  }
}

const createNote = async(noteText, istaffText, ticketId, token)=>{
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL + ticketId + '/notes', 
    {
    text: noteText,
    isstaff: istaffText 
    },
    config
  )
  if(response.status===201){
    toast.success('Note Added')
    return response.data
  }else{
    toast.error('Check Your Connections')
  }
}

const editNote = async(noteEditText, ticketId, noteId, token)=>{
  const config = {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + ticketId + '/notes/' + noteId,
    {
      text: noteEditText
    }, 
    config
  )
  if(response.status===200){
    toast.success('Note Edited')
  }else{
    toast.error('Check your internet connection')
  }
}

const deleteNote = async(ticketId, noteId, token)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + ticketId + '/notes/' + noteId, config)
  if(response.status===200){
    toast.success('Note Deleted')
  }else{
    toast.error('Check your internet connection')
  }

}

const  noteService = {
  getNotes,
  createNote,
  editNote,
  deleteNote
}

export default noteService
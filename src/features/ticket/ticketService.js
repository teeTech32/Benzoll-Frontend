import axios from "axios";
import {toast} from 'react-toastify'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//Get All Clients' tickets
const getAll = async()=>{
  const response = await axios.get(`${API_BASE_URL}/api/tickets/alltickets`)
  if(response.status===200){
    return response.data
  }else{
    toast.error('Chech your internet connection')
  }
}
// create a ticket: Post ticket 
const createTicket = async(ticketData, token)=>{
  const config = {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(`${API_BASE_URL}/api/tickets/`, ticketData, config)
  if(response.status===201){
    toast.success('You have created a ticket')
    return response.data
  }else{
    toast.error('Check your connection')
  }
}
// get an array of tickets
const getTickets = async(token)=>{
  try{
    const config = {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_BASE_URL}/api/tickets/`, config)
    if(response.status===200){
      if(response.data.length===0){
        toast.error("You don't have any ticket")
        return response.data
      }else{
        toast.success("All tickets fetched")
        return response.data
      }
    }
  }catch(error){
    toast.error('Check your internet connection')
  } 
}
// get a single ticket
const getTicket = async(ticketId, token) =>{
  const config = {
    headers :{
      Authorization : `Bearer ${token}`
    }
  }
  const response = await axios.get(`${API_BASE_URL}/api/tickets/${ticketId}`, config)
  if(response.status===200){
    toast.success('Ticket viewed')
    return response.data
  }else{
    toast.error('Check your internet connection')
  }
}
// Closed ticket: Edit ticket to close it
const closeTicket = async(ticketId, token)=>{
  const config = {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }
  const response = await axios.put(`${API_BASE_URL}/api/tickets/${ticketId}`, {status: 'closed'}, config)
  if(response.status===200){
    toast.success('Ticket Closed')
    return response.data
  }else{
  toast.error('Check your internet connection')
  }
}
// Edit Ticket Values with ticketId
const editTicketData = async(choice, text, ticketId, token)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(`${API_BASE_URL}/api/tickets/${ticketId}`, 
    {
    product : choice,
    description: text
    }, 
    config)
  if(response.status === 200){
    toast.success('Ticket Edited')
    return response.data
  }else{
    toast.error('Chech your internet connetion')
  }
}
// Delete a single Ticket by ticketId
const deleteTicket = async(ticketId, token)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(`${API_BASE_URL}/api/tickets/${ticketId}`, config)
  if(response.status===200){
    toast.success('Your ticket is deleted')
  }else{
    toast.error("Chech your internet connection")
  }
}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
  editTicketData,
  deleteTicket,
  getAll
}

export default ticketService

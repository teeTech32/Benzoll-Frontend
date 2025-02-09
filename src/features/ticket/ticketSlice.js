import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from './ticketService'
import {toast} from 'react-toastify'

const initialState = {
  tickets: [],
  tickests: [],
  ticket: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

export const getAll = createAsyncThunk(
  '/api/tickets/alltickets', async(thunAPI)=>{
    try{
      return await ticketService.getAll()
    }catch(error){
      const message = (error.response 
                       && error.response.data 
                       && error.response.data.message)
                       || error.message
                       || error.toString()
      return thunAPI.rejectWithValue(message)
    }
  })

export const createTicket = createAsyncThunk( 
  'ticket/create', async(ticketData, thunAPI)=>{
  try{
    const token = thunAPI.getState().auth.user.token
    return await ticketService.createTicket(ticketData, token)
  }catch(error){
    const message = (error.response &&
                    error.response.data && 
                    error.response.data.message) 
                    || error.message || 
                    error.toString()
    toast.error(message)                
    return thunAPI.rejectWithValue(message)
  }
})

export const getTickets = createAsyncThunk(
  'ticket/getAll', async(_, thunAPI)=>{
  try{
    const token = thunAPI.getState().auth.user.token
    return await ticketService.getTickets(token)
  }catch(error){
     const message = (error.response 
                     && error.response.data 
                     && error.response.data.message) 
                     || error.message 
                     || error.toString()
      toast.error(message)
     return thunAPI.rejectWithValue(message) 
  }
})

export const getTicket = createAsyncThunk(
  'ticket/getOne', async(ticketId, thunAPI)=>{
  try{
    const token = thunAPI.getState().auth.user.token
    return await ticketService.getTicket(ticketId, token)
  }catch(error){
    const message = (error.response && 
                     error.response.data &&
                     error.response.data.message)
                    || error.message || 
                    error.toString()
                    toast.error(message)
    return thunAPI.rejectWithValue(message)
  }
})

export const closeTicket = createAsyncThunk(
  'tickets/closeTickets', async(ticketId, thunAPI)=>{
    try{
      const token = thunAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    }catch(error){
      const message = (error.response &&
                       error.response.data &&
                       error.response.data.message )
                       || error.message 
                       || error.toString()
      toast.error(message)
      return thunAPI.rejectWithValue(message)
    }
})

export const editTicketData = createAsyncThunk(
  '/api/tickets/ticketId', async({choice, text , ticketId}, thunAPI)=>{
    try{
     const token = thunAPI.getState().auth.user.token
     return await ticketService.editTicketData(choice, text, ticketId, token)
    }catch(error){
      const message = (error.response 
                       && error.response.data 
                       && error.response.data.message)
                       || error.message 
                       || error.toString()
      return thunAPI.rejectWithValue(message)
    }
  })

export const deleteTicket = createAsyncThunk(
  '/api/tickets/ticketId', async(ticketId, thunAPI)=>{
    try{
      const token = thunAPI.getState().auth.user.token
      return await ticketService.deleteTicket(ticketId, token)
    }catch(error){
      const message = (error.response 
                       && error.response.data
                       && error.response.data.message)
                       || error.message
                       || error.toString()
      return thunAPI.rejectWithValue(message)
    }
  }
)

export const ticketSlice = createSlice(
  {
    name:'ticket',
    initialState,
    reducers:{
      reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
      builder
        .addCase(createTicket.pending, (state)=>{
          state.isLoading =  true
        })
        .addCase(createTicket.fulfilled, (state)=>{
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(createTicket.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload     
        })
        .addCase(getTickets.pending, (state)=>{
          state.isLoading = true
        })
        .addCase(getTickets.fulfilled, (state, action)=>{
          state.isLoading = false
          state.isSuccess = true
          state.tickets= action.payload
        })
        .addCase(getTickets.rejected, (state, action)=>{
          state.isError = true
          state.isLoading = false
          state.message = action.payload
        })
        .addCase(getTicket.pending, (state)=>{
        state.isLoading = true
        })
        .addCase(getTicket.fulfilled, (state, action)=>{
          state.isLoading = false
          state.isSuccess = true
          state.ticket = action.payload
        })
        .addCase(getTicket.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(closeTicket.fulfilled, (state, action)=>{
          state.isLoading = false
          state.tickets.map((ticket)=>(
            ticket._id === action.payload._id ? (ticket.status = 'closed') : ticket 
          )
        )
        })
        .addCase(editTicketData.fulfilled, (state, action,)=>{
          state.isLoading = false
          state.isSuccess = true
          state.tickets.push(action.payload)
        })
        .addCase(getAll.pending, (state)=>{
          state.isLoading = true
        })
        .addCase(getAll.fulfilled, (state, action)=>{
          state.isLoading = false
          state.isSuccess = true
          state.tickests = action.payload
        })
        .addCase(getAll.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })  
    }
  }
)

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer
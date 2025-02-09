import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'
import {toast} from 'react-toastify'

const initialState = {
  notes : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getNotes = createAsyncThunk(
  'api/tikets/ticketId/getNotes', async(ticketId, thunAPI)=>{
    try{
      const token = thunAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    }catch(error){
      const message = (error.response && 
                       error.response.data 
                       && error.response.data.message)
                       || error.message
                       || error.toSring()
      if(message===error.response.data.message){
          toast.error('You have internet disconnection')
        }else{
          toast.error('Check Your Network')
        }
      return thunAPI.rejectWithValue(message)
    }
  }
)

export const createNote = createAsyncThunk(
  '/api/tickets/ticketId/createNote', async({noteText, istaffText, ticketId}, thunAPI )=>{
    try{
      const token = thunAPI.getState().auth.user.token
      return await noteService.createNote(noteText, istaffText, ticketId,  token)
    }catch(error){
      const message = (error.response && 
                      error.response.data &&
                      error.response.data.message) 
                      || error.message || 
                      error.toSring()
        if(message===error.response.data.message){
          toast.error('You have internet disconnection')
        }else{
          toast.error('check connection')
        }
      return thunAPI.rejectWithValue(message)
    }
  }
)
// Edit a note with the noteId
export const editNote = createAsyncThunk(
  '/api/tickets/ticketId/notes/noteId' , async({noteEditText, ticketId, noteId}, thunAPI)=>{
    try{
     const token = thunAPI.getState().auth.user.token
     return await noteService.editNote(noteEditText, ticketId, noteId, token )
    }catch(error){
      const message = (error.response 
                      && error.response.data 
                      && error.response.data.message)
                      || error.message
                      || error.toSring()
      return thunAPI.rejectWithValue(message)
    }
  }
)
// Delete note by noteId
export const deleteNote = createAsyncThunk(
  '/api/tickets/ticketId/notes/noteId', async({ticketId, noteId}, thunAPI)=>{
    try{
      const token = thunAPI.getState().auth.user.token
      return await noteService.deleteNote(ticketId, noteId, token)
    }catch(error){
      const message = (error.response 
                      && error.response.data 
                      && error.response.data.message)
                      || error.message
                      || error.toSring()
      return thunAPI.rejectWithValue(message)
    }
  }
)


export const noteSlice = createSlice(
  {
    name: 'note',
    initialState,
    reducers:{
      reset:(state) => initialState
    },
    extraReducers: (builder) =>{
      builder
        .addCase(getNotes.pending, (state)=>{
          state.isLoading = true
        })
        .addCase(getNotes.fulfilled, (state, action)=>{
          state.isLoading = false
          state.isSuccess = true
          state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(createNote.pending, (state)=>{
          state.isLoading = true
        })
        .addCase(createNote.fulfilled, (state, action)=>{
          state.isLoading = false
          state.isSuccess = true
          state.notes.push(action.payload)
        })
        .addCase(createNote.rejected, (state, action)=>{
          state.isError = true
          state.isLoading = false
          state.message = action.payload
        })
    }
  }
)

export const {reset} = noteSlice.actions
export default noteSlice.reducer
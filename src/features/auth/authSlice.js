import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService'
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const registeruser = createAsyncThunk(
  'auth/registeruser', async(user, thunAPI)=>{
    try{
      return await authService.registeruser(user)
    }catch(error){
      const message = (error.response 
                      && error.response.data 
                      && error.response.data.message) 
                      || error.message
                      || error.toString()
      setTimeout(()=>{
      if(message===error.response.data.message){
          toast.error('User already exists')
        }else{
          toast.error('Check Your Network')
        }
      },1000)
      return thunAPI.rejectWithValue(message)
    }
  }
)

export const loginuser = createAsyncThunk(
  'auth/loginuser', async(loginData, thunAPI) =>{
    try{
     return await authService.loginuser(loginData) 
    }catch(error){
      const message = (error.response 
                      && error.response.data 
                      && error.response.data.message) 
                      || error.message 
                      || error.toString()
        setTimeout(()=>{
          if(message===error.response.data.message){
            toast.error('Invalid Credentials')
          }else{
            toast.error('Check Your Network') 
          }
        },1000)      
      return thunAPI.rejectWithValue(message)
    }  
  }
)

export const logoutuser = createAsyncThunk('auth/logoutuser', ()=>{
  return authService.logoutuser()
  }
)

export const authSlice = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) =>{
        state.isError = false
        state.isSuccess = false
        state.isLoading = false
        state.message = ''
      }
    },
    extraReducers:(builder)=>{
      builder
        .addCase(registeruser.pending, (state) =>{
          state.isLoading = true
        })
        .addCase(registeruser.fulfilled, (state, action) =>{
          state.isLoading = false
          state.isError = false
          state.user = action.payload
        })
        .addCase(registeruser.rejected, (state, action)=>{
          state.isError = true
          state.isLoading = false
          state.isSuccess = false
          state.message = action.payload
          state.user = null
        })
        .addCase(logoutuser.fulfilled, (state)=>{
          state.user = null
        })
        .addCase(loginuser.pending, (state)=>{
          state.isLoading = true
        })
        .addCase(loginuser.fulfilled, (state, action)=>{
          state.isError = false
          state.isLoading = false
          state.user = action.payload
        })
        .addCase(loginuser.rejected, (state, action)=>{
          state.isError = true
          state.isLoading = false
          state.isSuccess = false
          state.message = action.payload
          state.user = null
        })
    }
  }
)

export const {reset} = authSlice.actions
export default authSlice.reducer
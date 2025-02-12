import axios from "axios";
import {toast} from 'react-toastify'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

//Register User
const registeruser = async(userData) =>{
  const response = await axios.post(`${API_BASE_URL}/api/users/`, userData)
  if(response.status===201){
    localStorage.setItem('user', JSON.stringify(response.data))
    setTimeout(()=>{
      toast.success(`Welcome ${response.data.name}`)
    },1000)
    return response.data
  }else if(response.status===404){
    toast.error('User already exist')
  }else{
    toast.error('Check your internet connection')
  }
}
// Login User
const loginuser = async(loginData)=>{
  const response = await axios.post(`${API_BASE_URL}/api/users/login`, loginData ) 
  if(response.status===201){
    localStorage.setItem('user', JSON.stringify(response.data))
    setTimeout(()=>{
      toast.success(`Welcome back ${response.data.name}`)
    },1000)
    return response.data 
  }else if(response.status===401){
    toast.error('Invalid Credentials!')
  }else{
    toast.error('Check your internet connection')
  }
}
// Logout User
const logoutuser = () =>{
  localStorage.removeItem('user')
}

const authService = {
  loginuser,
  logoutuser,
  registeruser
}

export default authService

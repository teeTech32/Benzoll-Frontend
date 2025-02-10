import axios from "axios";
import {toast} from 'react-toastify'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_URL = 'api/users/'
 
//Register User
const registeruser = async(userData) =>{
  const response = await axios.post(`${API_BASE_URL}/API_URL`, userData)
  if(response.status===201){
    localStorage.setItem('user', JSON.stringify(response.data))
    setTimeout(()=>{
      toast.success(`Welcome ${response.data.name}`)
    },1000)
    return response.data
  }else{
    toast.error('Check your internet connection')
  }
}
// Login User
const loginuser = async(loginData)=>{
  try{
    const response = await axios.post(`${API_BASE_URL}/API_URL` + 'login', loginData ) 
    if(response.status===201){
      localStorage.setItem('user', JSON.stringify(response.data))
      setTimeout(()=>{
        toast.success(`Welcome back ${response.data.name}`)
      },1000)
      return response.data 
    }else{
      toast.error('Check your internet connection')
    }
  }catch(error){
    toast.error(error)
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

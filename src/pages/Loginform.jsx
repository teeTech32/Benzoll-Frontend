import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { RiChatDeleteFill } from "react-icons/ri";
import {loginuser, reset} from '../features/auth/authSlice';
import {useDispatch, useSelector } from 'react-redux';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';



const Loginform = ({login, setLogin, setForm}) => {
  const [visible3, setVisible3] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {email, password} = loginData
    const {isError} = useSelector((state)=>state.auth)

    useEffect(()=>{
      if(isError){
        toast.error('Somthing whent wrong')
      }
    },[isError])

    const handleChange = (e)=>{
      setLoginData({
        ...loginData,
        [e.target.id]: e.target.value })
    }

    const onSubmit = (e)=>{
      e.preventDefault()
          const userLoginData = {
          email,
          password
        }
        dispatch(loginuser(userLoginData))
        setLoginData({...loginData, email:'', password:''})
        setLogin(false)
        navigate('/')
        setTimeout(()=>{
          dispatch(reset())
        },10000)
    }
    
    if(login){
    return<div class="popup">
        <div class=' h-screen w-screen top-0 left-0 bg-green-950 bg-opacity-75 fixed backdrop-blur-sm z-50'
            data-aos='zoom-in'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine'>
          <div class='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-900 rounded-md p-4 shadow-md w-[300px] xl:w-[400px] duration-200 relative'>
            <div class='flex justify-center relative'>
              <h1 class='text-2xl font-bold justify-item-center text-white mb-5'>LogIn</h1>
              <RiChatDeleteFill class='text-2xl text-white hover:text-red-600 absolute top-0 right-0 cursor-pointer' onClick={()=> setLogin(false)}/>
            </div>
            <form onSubmit={onSubmit}>
              <input type="email" id='email' value={email} class='text-black input input-md rounded-md bg-white w-[266px] xl:w-[366px] my-2 hover:bg-green-200 ' required placeholder='Enter Email' onChange={handleChange} />
              <div class='relative'>
                <input type={visible3 ? "text" : "password"} id='password' value={password} class='text-black input input-md rounded-md bg-white w-[266px] xl:w-[366px] my-2 hover:bg-green-200 ' required placeholder='Enter Password' onChange={handleChange} />
                <div class='text-2xl absolute right-4 top-5' onClick={()=>setVisible3(!visible3)}>
                  {visible3 ? <FaEyeSlash/> : <FaEye/>}
                </div>
              </div>
              <p class='cursor-pointer text-white hover:text-green-700 font-bold text-sm absolute right-4' onClick={()=>toast.error('This feature has not been implemented.')}>
                Forgot password ?
              </p>
              <div class='flex justify-center'>
                <div class=' mt-10 ml-23 xl:ml-24 pl-14 xl:pl-9 '>
                  <button class='btn btn-md bg-white hover:text-white hover:bg-gradient-to-l from-green-950 via-green-500 to-green-950 rounded-full font-bold px-8 xl:px-10 absolute'>
                    LogIn
                  </button>
                </div>
              </div>
            </form>
            <div class='ml-1 xl:ml-0 '>
              <button class='btn btn-md bg-white hover:text-white hover:bg-gradient-to-l from-green-950 via-green-500 to-green-950 rounded-full font-bold px-7 xl:px-9' onClick={()=> {navigate( '/register')
                setForm(true)
              }}>
                SignUp
              </button>
            </div>
          </div>
        </div>
    </div>
    }
}

export default Loginform
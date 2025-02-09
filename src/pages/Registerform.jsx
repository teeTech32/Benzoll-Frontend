import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { RiChatDeleteFill } from "react-icons/ri";
import {toast} from 'react-toastify'
import {registeruser, reset} from '../features/auth/authSlice';
import {useDispatch} from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Registerform = ({form, setForm, setLogin}) => {

  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    comfirmpassword: ''
  })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {name, email, password, comfirmpassword} = formData
   
//     useEffect(()=>{
//       if(isError){
//         toast.error(message)
//       }
//       if(user || isSuccess){
//         navigate('/register')
//       }
//       dispatch(reset())
// //eslint-disable-next-line
//     }, []
//     )
    
    const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.id]: e.target.value })
    }

    const onSubmit = async(e)=>{
      e.preventDefault()
      try{
       if(password===comfirmpassword){
          const userData ={
            name,
            email,
            password
          }
          dispatch(registeruser(userData))
          setFormData({...formData, name:'', email:'', password: '', comfirmpassword: ''})
          setForm(false)
          navigate('/')
          setTimeout(()=>{
            dispatch(reset())
          },10000)
       }else{
        toast.error('Password must be equal to confirmpassword')
       }
      }catch(error){
        if(error.response){
          toast.error('Check your connection')
        }else if(error.request){
          toast.error('Bad Request')
        }
      } 
    }
    
    if(form){
    return<div class="popup">
        <div class=' h-screen w-screen top-0 left-0 bg-green-950 bg-opacity-75 fixed backdrop-blur-sm z-50'
            data-aos='zoom-in'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine'>
          <div class='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-900 rounded-md  p-4 shadow-md w-[300px] xl:w-[400px] duration-200 relative'>
            <div class='flex justify-center relative'>
              <h1 class='text-2xl font-bold justify-item-center text-white mb-5'>Register</h1>
              <RiChatDeleteFill class='text-2xl text-white hover:text-red-600 absolute top-0 right-0 cursor-pointer' onClick={()=> setForm(false)}/>
            </div>
            <form  onSubmit={onSubmit}>
              <div class='text-black'>
                <input type="text" id='name' value={name} class='input input-md rounded-md bg-white w-[266px] xl:w-[366px] my-2 hover:bg-green-200' required placeholder='Enter FullName' onChange={handleChange} />
                 <input type="email" id='email' value={email} class='input input-md rounded-md bg-white w-[266px] xl:w-[366px] my-2 hover:bg-green-200 ' required placeholder='Enter Email' onChange={handleChange} autocomplete="username" />
                 <div class='relative'>
                    <input type={visible ? "text" : "password"} id='password' value={password} class='input input-md rounded-md bg-white w-[266px] xl:w-[366px] my-2 hover:bg-green-200' required placeholder='Enter Password' onChange={handleChange} autocomplete="current-password" />
                    <div class='text-2xl absolute right-4 bottom-5 text-green-700' onClick={()=>setVisible(!visible)}>
                      {visible ? <FaEyeSlash/> : <FaEye/>}
                    </div>
                 </div>
                <div class='relative'>
                  <input type={visible2 ? "text" : "password"} id='comfirmpassword' value={comfirmpassword} class='input input-md rounded-md bg-white w-[266px] xl:w-[366px] my-2 hover:bg-green-200' required placeholder='Comfirmpassword' onChange={handleChange} autocomplete="current-password" />
                  <div class='text-2xl absolute right-4 bottom-5 text-green-700' onClick={()=>setVisible2(!visible2)}>
                    {visible2 ? <FaEyeSlash/> : <FaEye/>}
                  </div>
                </div>
              </div>
              <div class=''>
                <div class=' mt-8 mb-0 ml-32 xl:ml-52 pl-8 xl:pl-10'>
                  <button class='btn btn-md bg-white hover:text-white hover:bg-gradient-to-l from-green-950 via-green-500 to-green-950 rounded-full font-bold px-7 xl:px-9 absolute' >
                    SignUp
                  </button>
                </div>
              </div>
            </form>
            <div class='pt-0'>
              <button class='btn btn-md bg-white hover:text-white hover:bg-gradient-to-l from-green-950 via-green-500 to-green-950 rounded-full font-bold px-8 xl:px-10' onClick={()=>{ navigate( '/login')
                    setLogin(true)
                  }}>
                    Login
                </button>
            </div>
           
          </div>
        </div>
    </div>
    }  
}

export default Registerform
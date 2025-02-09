import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {reset, logoutuser} from '../features/auth/authSlice'
import {toast} from 'react-toastify'

const Haeder = ({setForm, setLogin}) => {
   const dispatch = useDispatch()
   const {user} = useSelector((state)=>state.auth)
   const navigate = useNavigate()
   const location = useLocation()

   const onLogout =()=>{
    if(location.pathname === '/newticket'){
      navigate('/') 
      toast.success(`${user.name} you have been Logged Out`)
      setTimeout(()=>{
        dispatch(logoutuser())
        dispatch(reset())},500)
    }
    if(location.pathname === '/tickets'){
       navigate('/') 
       toast.success(`${user.name} you have been Logged`)
       setTimeout(()=>{
        dispatch(logoutuser())
        dispatch(reset())},500)
    }
    if(location.pathname === '/'){
      toast.success(`${user.name} you have been Logged Out`)
      dispatch(logoutuser())
      dispatch(reset())
    }
   }

  return (
    <header class="fixed top-0 left-0 z-50 w-full bg-gradient-to-l from-green-800 from-10% via-green-300 via-20% to-green-800 to-70% ">
      <div class=' py-5 xl:px-10 sm:px-5 px-5 shadow-md'>
        <div class="inline-flex xl:space-x-90 sm:space-x-6">
          <h2 class="font-bold text-lg md:text-xl xl:text-3xl hover:scale-105 pr-30 md:pr-80 text-white"
            data-aos='zoom-in'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine'>
            <Link to={"/"} class=" hover:text-green-500 hover:scale-105">
              BZL<span class=' text-sm  xl:text-xl '>Support Desk</span>
            </Link>
          </h2>
          <div class='pl-32 md:pl-80 xl:pl-96 sm:pl-12 absolute right-5 xl:right-10'>
            <ul class="inline-flex space-x-6 md:space-x-10 xl:space-x-16" 
                data-aos='zoom-in'
                data-aos-offset='100'
                data-aos-delay='200'
                data-aos-duration='2000'
                data-aos-easing='ease-in-sine'>
              {user ? (<li class='flex-none'>
                <button class=' inline-flex hover:scale-105 hover:text-green-500 text-white ml-40' onClick={onLogout}>
                  <FaSignOutAlt class='text-lg  md:text-xl xl:text-2xl '/>
                  <h3 class='font-bold ml-0.5 md:ml-1 xl:ml-1.5 text-sm md:text-xl xl:text-2xl '>
                    Logout
                  </h3>
                </button>
              </li>) : (
            <>
              <li class='flex-none '>
                <Link to={'/login'} class='inline-flex hover:scale-105 hover:text-green-500 text-white' onClick={()=>setLogin(true)}>
                  <FaSignInAlt class='text-lg  md:text-xl xl:text-2xl '/>
                 <h3 class='font-bold ml-0.5 md:ml-1 xl:ml-1.5 text-sm md:text-xl xl:text-2xl'>
                    Login
                  </h3>
                </Link>
              </li>
              <li class='flex-none'>
                <Link to={'/register'} class='inline-flex hover:scale-105 hover:text-green-500 text-white' onClick={()=>setForm(true)}>
                  <FaUser class='text-lg  md:text-xl xl:text-2xl'/>
                  <h3 class='font-bold ml-0.5 md:ml-1 xl:ml-1.5 text-sm md:text-xl xl:text-2xl'>
                    Register
                  </h3>
                </Link>
              </li>
            </>
          )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  
  )
}

export default Haeder
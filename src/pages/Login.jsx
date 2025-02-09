import { FaHandshake } from "react-icons/fa"
import Loginform from "./Loginform"
import loginImage from '../assets/images/login.jpg'

const Login = ({login, setLogin, setForm})=> {
  const Banner = {
      backgroundImage : `url(${loginImage})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100%',
      width: '100%'
    }
  return (
    <div style={Banner} class='py-20'>
      <div class="justify-items-center text-green-700 mb-40 pb-40 ">
        <div class="font-extrabold mt-20 mb-5 md:text-xl xl:text-3xl ">
          <FaHandshake class="  text-2xl  md:text-3xl xl:text-4xl"/>
          Welcome Back : <span  class="font-medium ">This Is The Login Page</span>
        </div>
        <p class="font-bold md:text-xl xl:text-2xl">Please reclaim your account to get support.</p>
        <Loginform login={login} setLogin={setLogin} setForm={setForm}/>
     </div>
    </div>
  )
}

export default Login

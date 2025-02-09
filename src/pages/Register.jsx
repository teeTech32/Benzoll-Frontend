import {FaHandshake} from 'react-icons/fa'
import Registerform from './Registerform'
import registerImage from '../assets/images/register.jpg'

const Register = ({form, setForm, setLogin}) => {
  const Banner = {
    backgroundImage : `url(${registerImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%'
  }

  return(
    <div style={Banner} class='py-20'>
      <div class="justify-items-center text-green-700 mb-40 pb-40">
        <div class="font-extrabold mt-20 mb-5 md:text-xl xl:text-3xl">
          <FaHandshake class="text-2xl  md:text-3xl xl:text-4xl"/>
          Welcome : <span  class="font-medium">This Is The Registration Page</span>
        </div>
        <p class="font-bold md:text-xl xl:text-2xl">Please create an account.</p>
        <Registerform form={form} setForm={setForm} setLogin={setLogin}/>
      </div>
    </div>
    
  )
}

export default Register
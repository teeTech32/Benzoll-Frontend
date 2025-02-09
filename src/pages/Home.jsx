import { useState } from "react"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import showcaseImage from '../assets/images/showcase.jpg'
import Alltickets from "../components/Alltickets"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"


const Home = ({setLogin}) => {
  const [showAlertCreateTicket, setShowAlertCreateTicket] = useState(false)
  const [showAlertViewTicket, setShowAlertViewTicket] = useState(false)
  const {user} = useSelector((state)=>state.auth)

  const Banner = {
    backgroundImage: `url(${showcaseImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%'
  }
  
  const openLogin = ()=>{
    if(!user){
      setLogin(true)
    }else{
      setLogin(false)
    }
  }

  return(
  <>  
    <div style={Banner}>
      <h1 class='text-center text-white font-extrabold pt-28 md:text-xl' 
            data-aos='fade-right'
            data-aos-offset='300'
            data-aos-delay='300'
            data-aos-duration='3000'
            data-aos-easing='ease-in-sine'>
        Welcome To Benzoll Supportive Desk
      </h1>
      <div class="justify-items-center py-28 ">
        <div class="font-bold mx-20  md:text-lg xl:text-xl text-white">
          <h1 class='font-bold mb-10  text-center'
            data-aos='zoom-in'
            data-aos-offset='100'
            data-aos-delay='400'
            data-aos-duration='3000'
            data-aos-easing='ease-in-sine'>
            Discover the latest devices at unbeatable prices - quality, innovation, and convenience all in one place !
          </h1>
          <p class='font-semibold my-5 text-sm text-center'
            data-aos='fade-down'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine'>
            What do you need help with ?
          </p>
          <p class='font-semibold text-sm text-center'
            data-aos='fade-up'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine'>
            Please choice from the options below
          </p>
        </div>
      <div class='space-x-10 inline-flex mr-10'>
        <div>
          {showAlertCreateTicket && (
          <div className="absolute top-74 w-36 mb-2  left-28 md:left-32 transform -translate-x-1/2 bg-green-950 text-white text-sm px-2 py-1 rounded-t-lg rounded-bl-lg shadow-lg">
              Go head and click this button if you want to create a new ticket.
          </div>
          )}
          {showAlertViewTicket && (
            <div className="absolute top-74 w-36 mb-2 right-2 transform -translate-x-1/2 bg-green-950 text-white text-sm px-2 py-1 rounded-t-lg rounded-bl-lg shadow-lg">
                Go head and click this button if you want to view your tickets.
            </div>
          )}
        </div>
        <div data-aos='flip-left'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine' class=''>
          <Link to={'/newticket'} class='mt-28 btn btn-md xl:btn-lg hover:bg-gradient-to-r from-green-900 via-green-300 to-green-900 hover:text-white font-bold bg-green-300' 
            onClick={openLogin} 
            onMouseEnter={()=>setShowAlertCreateTicket(true)} 
            onMouseLeave={()=>setShowAlertCreateTicket(false)}>
            <FaQuestionCircle class='sm:text-sm md:text-lg xl:text-xl'/> <span class='sm:text-xs md:text-sm xl:text-lg'
          >Create New Ticket</span>
          </Link>
        </div>
        <div data-aos='flip-right'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine' class='' >
          <Link to={'/tickets'} class='mt-28 btn btn-md xl:btn-lg hover:bg-gradient-to-r from-green-900 via-green-300 to-green-900 hover:text-white font-bold bg-green-300'
            onClick={openLogin}
            onMouseEnter={()=>setShowAlertViewTicket(true)} 
            onMouseLeave={()=>setShowAlertViewTicket(false)}>
          <FaTicketAlt class='sm:text-sm md:text-lg xl:text-xl'/><span class='sm:text-xs md:text-sm xl:text-lg' 
          >View Your Tickets</span> 
          </Link>
        </div>
      </div>
    </div>
  </div>
  <Alltickets/>
  <Testimonials/>
  <Footer/>
  </>
  )
}

export default Home
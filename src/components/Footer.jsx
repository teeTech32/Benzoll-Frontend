import Parttern from '../assets/images/foot.jpg'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow } from 'react-icons/fa6'
import { FaMobileAlt } from 'react-icons/fa'
import { ImportantLinks } from '../data'
import { QuickLinks } from '../data'

const BannerImage = {
  backgroundImage:`url(${Parttern})`,
  backgroundPosition:'bottom',
  backgroundRepeat:'no-repeat',
  backgroundSize:'cover',
  height:'100%',
  width:'100%'
}

const Footer = () => {
  return ( 
    <div style={BannerImage} className='text-black '>
      <div class='container'>
        <div data-aos='zoom-in'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine' class='grid md:grid-cols-3 pb-44 pt-5'>
          <div class='py-8 px-4'>
            <h1 class='text-green-700 text-lg lg:text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3'>
             BENZOLLDevices</h1>
            <p class='lg:text-sm text-xs text-black'>At Benzoll Devices, we bring you the best in technology, from high-performance laptops to the latest smartphones and tablets. Whether you're a Windows, Mac, Linux, or Android user, we have the perfect device to match your needs. Our goal is to provide top-quality products at unbeatable prices with excellent customer support. Shop with us today and experience innovation at your fingertips!</p>
          </div>
          <div class='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
            <div>
              <div class='py-8 px-4'>
                <h1 class='text-lg lg:text-xl text-green-600 font-bold sm:text-left text-justify mb-3'>Useful Links
                </h1>
                <ul class='flex flex-col gap-3'>
                  {
                    ImportantLinks.map((link)=>(
                      <li key={link.title} class='cursor-pointer hover:text-green-600 hover:translate-x-1 duration-300 text-black font-bold text-sm lg:text-sm'>
                        <span>{link.title}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
             <div>
              <div class='py-8 px-4'>
                <h1 class='text-lg lg:text-xl text-green-600 font-bold sm:text-left text-justify mb-3'>Quick Links
                </h1>
                <ul class='flex flex-col gap-3'>
                  {
                    QuickLinks.map((link)=>(
                      <li key={link.title} class='cursor-pointer hover:text-green-600 hover:translate-x-1 duration-300 text-black font-bold text-sm lg:text-sm'>
                        <span>{link.title}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div>
              <p className='pt-8 pb-4 text-green-600 font-bold text-lg lg:text-xl'>Contacts</p>
              <div class='flex items-center gap-3 mt-2'>
                <a href="/#">
                  <FaInstagram class='text-xl lg:text-2xl'/>
                </a>
                <a href="/#">
                  <FaLinkedin class='text-xl lg:text-2xl'/>
                </a>
                <a href="/#">
                  <FaFacebook class='text-xl lg:text-2xl'/>
                </a>
              </div>
              <div class='mt-2 lg:text-sm text-xs text-black'>
                <div class='flex items-center gap-3'>
                  <FaLocationArrow/>
                  <p>Victoria Island, Lagos Nigeria</p>
                </div>
                <div class='flex items-center gap-3'>
                  <FaMobileAlt/>
                  <p>+234 703 2603814</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
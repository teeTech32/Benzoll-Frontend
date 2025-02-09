import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import Slider  from 'react-slick'
import { TestimonialData } from '../data';

const Testimonials = () => {
   var settings = {
      dots:true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToScrolls: 1,
      autoplay: true,
      autoplaySpeed:2000,
      cssEase:'linear',
      pauseOnHover: true,
      pauseFocus: true,
      responsive:[
        {
          breakpoint: 10000,
          settings:{
            slidesToShow:3,
            slidesToScroll:1,
            infinite: true,
          },
        },
        {
          breakpoint:1024,
          settings:{
            slidesToShow:2,
            slidesToScroll:1,
            initialSlide:2,
          },
        },
        {
          breakpoint: 640,
            settings:{
            slidesToShow:1,
            slidesToScroll:1,
          }
        }
      ]
    }
  return (
    <div className="">
      <div class=" pt-20">
        <div data-aos='fade-up'
            data-aos-offset='300'
            data-aos-delay='100'
            data-aos-duration='1000'
            data-aos-easing='ease-in-sine' class="text-center mb-10 max-w-[600px] mx-auto space-y-3 ">
            <p class="font-bold text-green-300 text-xl lg:text-2xl">Customers' Reviews</p>
            <h1 class="text-lg font-bold lg:text-xl text-white">Evaluations</h1>
            <p class="font-semibold text-sm lg:text-lg text-white mx-10">
              "Curious about what our customers have to say? Their feedback speaks volumes! We take pride in delivering great experiences. Check out their reviews below!"
            </p>
          </div>
          <div>
            <Slider {...settings}>
              {  
                TestimonialData.map((data)=>(
                  <div data-aos='flip-left'
                       data-aos-offset='200'
                       data-aos-delay='200'
                       data-aos-duration='2000'
                       data-aos-easing='ease-out-cubic' key={data.id} class="my-6 lg:my-8">
                     <div  class="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-green-900  relative">
                    <div>
                      <img src={data.img} alt="NetError" class="rounded-full w-14 h-14 lg:w-20 lg:h-20"/>
                    </div>
                    <div class="flex flex-col items-center pt-2 lg:pt-4">
                      <div class="space-y-1 lg:space-y-2">
                        <p class="text-xs lg:text-sm text-white">{data.text}</p>
                        <h1 class="text-sm font-bold lg:text-lg text-green-300">{data.name}</h1>
                      </div>
                    </div>
                    <p class="text-white text-5xl lg:text-7xl font-serif absolute top-0 right-0">
                    ``
                    </p>
                  </div>
                </div>
                ))
             }
            </Slider>
          </div>
      </div>
    </div>
  )
}

export default Testimonials
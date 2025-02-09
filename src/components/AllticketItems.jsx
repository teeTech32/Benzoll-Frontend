import React from 'react'

const AllticketItems = ({ticket}) => {
  return (
    <div  data-aos='fade-up'
          data-aos-offset='100'
          data-aos-delay='200'
          data-aos-duration='2000'
          data-aos-easing='ease-in-sine' class='container bg-green-300 rounded-md  py-5 relative mb-5 '>
      <ul class='flex flex-col gap-4  justify-evenly md:flex-row'>
        <li class='border-green-900 border-4 border-solid rounded-md  '>
          <div class='bg-green-900 text-white hover:bg-white hover:text-black font-semibold p-1 md:p-2 text-xs '>
            {ticket?.product}
          </div>
        </li>
        <li class='border-green-900 border-4 border-solid rounded-md'>
          <div class='bg-green-900 text-white hover:bg-white hover:text-black font-semibold p-1 md:p-2 text-xs'>
            {ticket?.description}
          </div>
        </li>
        <li class='border-green-900 border-4 border-solid rounded-md'>
          <div class='bg-green-900 text-white hover:bg-white hover:text-black font-semibold p-1 md:p-2 text-xs'>
            {new Date(ticket?.createdAt).toLocaleString('en-US')}
          </div>
        </li>
        <li class='border-green-900 border-4 border-solid rounded-md'>
          <div class={`${ticket?.status==='closed' ? 'bg-red-500 text-white':'bg-green-900 text-white'} hover:bg-white hover:text-black font-semibold p-1 md:p-2 text-xs` }>
            {ticket?.status}
          </div>
        </li>
        <li>
        </li>
      </ul>
    </div>
  )
}

export default AllticketItems
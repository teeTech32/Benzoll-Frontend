import {useSelector, useDispatch} from 'react-redux'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {createTicket, reset} from '../features/ticket/ticketSlice'

import{RiChatDeleteFill} from 'react-icons/ri'
import { toast } from 'react-toastify'


const NewTicket = () => {
  const {user} = useSelector((state)=>state.auth) 
  
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) =>{
    e.preventDefault()
    if(!product || !description){
      toast.error('Chose and fill the necessary feilds')
    }else{
      dispatch(createTicket({product, description}))
      dispatch(reset())
      setTimeout(()=>{
        navigate('/tickets')
      },5000)
    }
  }

  const onCancil = ()=>{
   setDescription('')
   setProduct('')
  }
  
  return(
    <div class='flex items-center justify-center py-28' >
      <div class='w-[400px] bg-gradient-to-tr from-green-950 via-green-200 to-green-600 p-2 rounded-md shadow-xl'>
        <div class='w-full h-full bg-white relative'>
          <RiChatDeleteFill class='absolute top-2 right-2 text-xl cursor-pointer text-green-500 hover:text-red-500' onClick={()=>navigate('/')}/>
          <section class=' mt-5 mb-0 mx-5'>
            <header class='font-bold text-xl text-black leading-8 mt-5 pt-5'>
              <h1 class='flex justify-center pb-5 text-sm'>
                CREATE NEW TICKET
              </h1>
              <p class='justify-start font-thin  text-sm'>
                Please complete the prefilled form bellow :
              </p> 
            </header>
          </section>
          <section class='p-5'>
            <div class='grid mb-2'>
              <label htmlFor="name" class='text-sm font-serif font-bold md:font-bold pt-2 pb-1'>Customer's FullName</label>
              <input type='text' 
                     id="name" 
                     class='bg-green-200 text-sm rounded-full pl-4 pr-2 pt-2 pb-3 shadow-lg' 
                     value={name} 
                     disabled/>
            </div>
            <div class='grid mb-2'>
              <label htmlFor="name"  class='text-sm font-serif font-bold md:font-bold pt-2 pb-1 '>Customer's Email</label>
              <input type='email' 
                     id="name" 
                     value={email} 
                     class='bg-green-200 text-sm rounded-full pl-4 pr-2 pt-2 pb-3 shadow-lg' 
                     disabled/>
            </div>
            <form onSubmit={onSubmit}>
              <div class='grid mb-2'>
                <label htmlFor="name" class=' font-serif font-bold text-sm pt-2 pb-1'>Select Product</label>
                <select id="product" 
                        name="description" 
                        value={product} 
                        class='text-sm px-4 py-2 bg-green-200 rounded-md shadow-lg'
                        required
                        onChange={(e)=>setProduct(e.target.value)} >
                  <option value=""></option>
                  <option value="iPhone">iPhone</option>
                  <option value="Macbook">Macbook</option>
                  <option value="Windows">Windows</option>
                  <option value="Andriod">Andriod</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Linux">Linux</option>
                  <option value="Tab">Tab</option>
                </select>
              </div> 
              <div class='grid mb-5'>
                <label htmlFor="name" class='font-serif font-bold text-sm py-2 md:font-bold'>Describe Your Product Issue here :</label>
                <textarea name="description" 
                          id="description" 
                          value={description} 
                          class='text-xs px-4 py-2 border-2 rounded-md border-green-300' 
                          rows={5}
                          cols={30}
                          required
                          placeholder='Descriptions'
                          onChange={(e)=>setDescription(e.target.value)} > 
                </textarea>
              </div>
              <div class='float-end'>
                <button class='btn btn-sm  bg-green-200 hover:bg-green-700 hover:text-white font-bold'>
                  Submit
                </button>
              </div>
            </form>
            <button class='btn btn-sm bg-green-200 hover:bg-green-700 hover:text-white font-bold' onClick={onCancil}>
                  Cancil
            </button>
          </section>
        </div>
      </div>
    </div>
    
  )
}

export default NewTicket
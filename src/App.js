import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import Header from './components/Header';
import { useSelector } from 'react-redux'
import Spinner from './spinner/Spinner';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import AOS from "aos";
import "aos/dist/aos.css" ;

function App() {
  const [form, setForm] = useState(false)
  const [login, setLogin] = useState(false)

  const {isLoading} = useSelector((state)=>state.auth)

  useEffect(()=>{
    AOS.init({
      offset: 100,
      duration: 100,
      easing: 'ease-in-sine',
      delay:100
    });
    AOS.refresh();
  },[]);
  
  return  isLoading ? <Spinner/> :  <>
          <Router>
            <ToastContainer/>
            <div class="bg-green-950 bg-opacity-85 ">
              <Header setForm={setForm} setLogin={setLogin}/>
              <Routes>
                <Route path='/' element={<Home setLogin={setLogin}/>}/>
                <Route path='/newticket' element={<PrivateRoute/>}>
                   <Route path='/newticket' element={<NewTicket/>}/>
                </Route>
                <Route path='/tickets' element={<PrivateRoute/>}>
                   <Route path='/tickets' element={<Tickets/>}/>
                </Route>
                <Route path='/ticket/:ticketId' element={<PrivateRoute/>}>
                   <Route path='/ticket/:ticketId' element={<Ticket/>}/>
                </Route>
                <Route path='/login' element={<Login login={login} setLogin={setLogin} setForm={setForm}/>}/>
                <Route path='/register' element={<Register form={form} setForm={setForm} setLogin={setLogin} />}/>
              </Routes>
            </div>
          </Router> 
       </>
    
}

export default App;

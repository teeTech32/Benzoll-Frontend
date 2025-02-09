import { Navigate, Outlet } from "react-router-dom"
import {useAuthStatus} from "../hooks/useAuthStatus"
import Spinner from "../spinner/Spinner"

const PrivateRoute = () => {

  const {checkStatus, loggedin} = useAuthStatus()

  if(checkStatus){
    return <Spinner/>
  }
  return loggedin ? <Outlet/> : <Navigate to={'/login'}/>
}

export default PrivateRoute
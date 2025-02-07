import React, { useState } from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import RefreshHandler from './RefreshHandler'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {

  const [IsAuthenticated, setIsAuthenticated] = useState(false);

  const privateRoute=(element)=>{
    if(IsAuthenticated) return element
    else return <Navigate to= "/login"/>
  }
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path ='/' element ={<Navigate to='/login'/> }/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/signup' element={<Signup/>}/>
        <Route  path='/home' element={<Home/>}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App

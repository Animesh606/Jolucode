import React from 'react'
import { useState } from 'react'
import { handleError, handleSucess } from '../Util';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';

const Signup = () => {

  const navigate = useNavigate();
  const [signInfo, setsignInfo] = useState({
    name:'',
    email:'',
    password:''
  });

  const handleChange = (e)=>{
    
    const {name , value} = e.target;
    // console.log(name, value)
    const copysignInfo = {...signInfo}
    copysignInfo[name] = value;
    setsignInfo(copysignInfo);
  }

  const handleSignup = async (e)=>{
    e.preventDefault();
    const {name,email,password} = signInfo

    if(!name || !email || !password){
      return handleError("name - email-password- required")
    }
    try {
      const url = "http://localhost:5000/auth/signup";

      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-type" :"application/json"
        },
        body: JSON.stringify(signInfo)
      })
      const res = await response.json()
      const {success , message , error} = res
      if(success){
        handleSucess(`${message}, redirecting to login page`)
        setTimeout(()=>{
          navigate('/login')
        },2000)
      }
      else if(error){
        const {message} = error.details[0];
        console.log(message)
        handleError(message);
      }
      else if(!success){
        handleError(message);
      }
      // console.log(res);
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSignup} action="">
        <h1>SignUp</h1>
            <div>
                <h2>Name</h2>
                <input className='text-black'
                 onChange={handleChange} 
                name ="name"
                 type="text" 
                 placeholder='Enter your name'
                 value = {signInfo.name}/>
            </div>
            <div>
                <h2>Email</h2>
                <input className='text-black' onChange={handleChange} 
                name ="email" type="email" placeholder='Enter your email'
                value={signInfo.email}/>
            </div>
            <div>
                <h2>Password</h2>
                <input className='text-black' onChange={handleChange} name="password"type="password" placeholder='Enter your password'
                value={signInfo.password}/>
            </div>
            <button type='submit' >SignUp </button>
            <span className='text-black'>Already Have account? <a href="/login">Login</a></span>
        </form>
        
      </div>
    </div>
  )
}

export default Signup

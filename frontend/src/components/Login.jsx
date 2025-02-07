import React from 'react'
import { useState } from 'react'
import { handleError, handleSucess } from '../Util';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState({
    email:'',
    password:''
  });

  const handleChange = (e)=>{
    
    const {name , value} = e.target;
    console.log(name, value)
    const copyLoginInfo = {...LoginInfo}
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handelLogin = async (e)=>{
    e.preventDefault();
    const {email,password} = LoginInfo

    if(!email || !password){
      return handleError(" email-password- required")
    }
    try {
      const url = "http://localhost:5000/auth/login";

      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-type" :"application/json"
        },
        body: JSON.stringify(LoginInfo)
      })
      const res = await response.json()
      const {success , message ,token,name, error} = res
      if(success){
        handleSucess(message)
        localStorage.setItem('token',token);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
          navigate('/home')
        },1000)
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
        <form onSubmit={handelLogin} action="">
        <h1>USER LOGIN</h1>
            <div>
                <h2>Email</h2>
                <input className='text-black' onChange={handleChange} 
                name ="email" type="email" placeholder='Enter your email'
                value={LoginInfo.email}/>
            </div>
            <div>
                <h2>Password</h2>
                <input className='text-black' onChange={handleChange} name="password"type="password" placeholder='Enter your password'
                value={LoginInfo.password}/>
            </div>
            <button type='submit' >Login </button>
            <span className='text-black'>Don't Have any account? <a href="/signup">SignUp</a></span>
        </form>
        
      </div>
    </div>
  )
}

export default Login

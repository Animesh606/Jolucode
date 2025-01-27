import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError,handleSucess } from '../Util';

const Home = () => {
  const [Username, setUsername] = useState('');
  const [products, setproducts] = useState({});

  useEffect(() =>{
    setUsername(localStorage.getItem('loggedInUser'));
  },[])

  const navigate = useNavigate();
  const handleLogout = (e)=>{
    handleSucess('Log Out Succuessfully')
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('token')
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }

  const fetchProducts = async ()=>{
    try {
      const url = "http://localhost:5000/products"
      const response = await fetch(url,{
        headers:{
          "Authorization":localStorage.getItem('token')
        }
      })
      const res = await response.json()
      setproducts(res)
      console.log(res);
    } catch (error) {
      handleError(error)
    }

  }

  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <div className='container'>
      <h1 className='text-black font-semibold text-2xl'>Wellcome {Username}</h1>
      {/* <span className='text-white'>
        name:{products[0].name}
        price:{products[0].price}
      </span>
      <span className='text-white'>
        name:{products[1].name}
        price:{products[1].price}
      </span> */}
      <button className='btn-logout' onClick={handleLogout}>Logout</button>
      
    </div>
  )
}

export default Home

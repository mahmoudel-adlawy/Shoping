import React, { useContext, useEffect, useState } from 'react'
import logo from '../../final/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { ConterContext } from '../../Context/CartStore'

export default function Navbar({user,loGout}) {
  let {getdata} = useContext(ConterContext)
  const [det,setdet] = useState({})


  async function getdatafun(){
    const x = await getdata()
    if(x.status ==='success'){
     setdet(x)
 
    }
    console.log(x);
   }
   useEffect(()=>{
    getdatafun()
   },[det])
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">
      <img src={logo} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="product">product</Link>
        </li>
       {user? 
        <li className="nav-item">
          <Link className="nav-link d-flex" to="cart">
         <p className='me-1'>   cart</p>
          <p ><i class="fas fa-shopping-cart position-relative text-success "></i>
          <span className='position-absolute top-0 start-25'>{det.numOfCartItems}</span>
          </p>
          </Link>
        </li>: ''}
       
      </ul>
      <ul className="navbar-nav ms-auto">
 
       {user?    <li className="nav-item">
          <p className="nav-link" onClick={loGout} >logout</p>
        </li>: <>
              
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="reg">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="log">login</Link>
        </li>
        </>}
     
       
      </ul>

    


    </div>
  </div>
</nav>
  )
}

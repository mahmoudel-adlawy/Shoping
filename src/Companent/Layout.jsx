import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout({user,setuser}) {
  let navigate =useNavigate()

  function loGout(){
    localStorage.removeItem("userToken")
   
    setuser(null)
    navigate("/log")
  }
  return (
    <>
    <Navbar user={user} loGout={loGout}></Navbar>
    <Outlet></Outlet>
    </>
  )
}

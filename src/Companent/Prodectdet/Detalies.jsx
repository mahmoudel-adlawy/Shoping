import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { ConterContext } from '../../Context/CartStore';
import toast from 'react-hot-toast';
import Loading from '../Loading';


export default function Detalies() {
    let {id} = useParams();

    const {addCart} = useContext(ConterContext)

    async function addcartfun(ip){
        const res = await addCart(ip)
        console.log(res);
        if(res.status==='success'){
        toast.success(res.message)
        }
    }
    const [ detal,setdetali] = useState({})


   async function getid(id){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    // console.log(data.data);
    setdetali(data.data)

    }
    useEffect(()=>{
        // console.log(id);
        getid(id)
    },[])
  return (
  <>
   {detal ? 
   <>
   <div className='container'>
    <div className='row align-items-center vh-50'>
    <div className='col-md-4 '>
        <img src={detal.imageCover} className='w-100 py-3' alt="" />

    </div>
    <div className='col-md-8 my-5'>
    <p>  {detal.category?.name}</p> 


    <p className=''>  {detal.description}</p> 
    <p className=''>price ⏩  {detal.price}</p>
    <p className=''>Rating ⏩  {detal.ratingsAverage}</p>
    <button className='btn btn-success form-control p-3 mt-2' onClick={()=>{addcartfun(detal._id)}}>Add+</button>
    

    </div>

    </div>

   </div>  </> : <Loading></Loading>  
 }

  
  </>
  )
}

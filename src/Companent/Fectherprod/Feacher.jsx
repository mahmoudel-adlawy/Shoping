import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export default function Feacher() {
 const [allprod,setallpro] = useState([])
  async function getdatapor(){
    let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
    console.log(data.data);
    setallpro(data.data)
  }

  useEffect(()=>{
    getdatapor();
  },[])

  return (<>
  <h3>Featchers</h3>
  <div className='row'>

  {allprod.length>0? allprod.map((prod,index)=><div key={index}  className='col-md-2 py-2 my-2 '>
    <Link to={`product/${prod._id}`}>
    
  <img src={prod.imageCover}  className='w-100 rounded' alt="" />

    <p className='text-success'>{prod.category.name} </p>
    <p>{prod.title.split(" ").slice(0,2).join(" ")}</p>

    <div className='d-flex justify-content-between'>
      <span>{prod.price} EGP</span>
      <span>{prod.ratingsAverage} <i class="fas fa-star text-warning"></i></span>

    </div>
    </Link>

  </div>):<Loading></Loading>}
  </div>

  </>
  )
}
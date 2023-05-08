import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export default function Product() {

  const [allprod,setallprod] = useState([])
async function getData(){
  const {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
  console.log(data.data);
  setallprod(data.data)

}
useEffect(()=>{
  getData()
},[])
  return (<>
  <div className='row'>

{allprod.length>0 ? allprod.map((prod,index)=><div key={index}  className='col-md-2 py-2 my-2 '>
  <Link to={`/${prod._id}`}>
  
<img src={prod.imageCover}  className='w-100 rounded' alt="" />

  <p className='text-success'>{prod.category.name} </p>
  <p>{prod.title.split(" ").slice(0,2).join(" ")}</p>

  <div className='d-flex justify-content-between'>
    <span>{prod.price} EGP</span>
    <span>{prod.ratingsAverage} <i class="fas fa-star text-warning"></i></span>

  </div>
  </Link>

</div>): <Loading></Loading>}
</div>

  </>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { ConterContext } from '../../Context/CartStore'
import Loading from '../Loading'

export default function Cart() {
  const {getdata,Update,Delete} = useContext(ConterContext)
  const [products, setproducts] = useState([])
  const [det,setdet] = useState({})

 async function getdatafun(){
   const x = await getdata()
   if(x.status ==='success'){
    setproducts(x.data.products)
    setdet(x)

   }
   console.log(x);
  }

 async function UpdateCount(id,e){
   const x = await Update(id,e.target.value)
   if(x.status ==='success'){
    setproducts(x.data.products)
    setdet(x)

   }
  //  console.log(x);
  // console.log(e.target.value);
  }
  async function DeleteItem(id){
    const x = await Delete(id)
    if(x.status ==='success'){
      setproducts(x.data.products)
      setdet(x)
  
     }
    
  }
  useEffect(()=>{
    getdatafun()
  },[])


  return (<>
    <h2>Cart</h2>
    <div className='container'>
      <h3>Number of cart items ➡️ <span className='text-success'>{det.numOfCartItems}</span></h3>

    <div className='row'>

    {products.length>0 ? products.map((pro,index)=><div key={index} className='col-md-3 py-3'>
      <img src={pro.product.imageCover} className='w-100' alt="" />
      <div className='card p-3'>
            
      <p> price : {pro.price} EGP</p>
     <div className='d-flex aling-items-center justify-content-between'>
     <p className=''>{pro.product.ratingsAverage} <i className="fas fa-star text-warning"></i></p>
      <p><i className="fas fa-trash-alt text-danger fa-2x" onClick={()=>{DeleteItem(pro.product._id)}}></i></p>
     </div>
      <div className="box d-flex aling-items-center justify-content-between">
      <p> count :  {pro.count}</p>
      <select  name="" id="" onChange={(e)=>{UpdateCount(pro.product._id,e)}} >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      </div>
      </div>
    </div>) :<Loading></Loading>}
    </div>
    <h3 className='text-info'>Total price 👍 {det.data?.totalCartPrice} EGP</h3>

    </div>


    </>
  )
}

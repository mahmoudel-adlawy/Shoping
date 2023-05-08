import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import style from './Style.module.css'
import Loading from '../Loading';


export default function Categores() {

    const [alldata, setalldata] = useState([])
  async  function getdata(){
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
        setalldata(data.data)
        // console.log(data.data);
    }
    useEffect(()=>{
        getdata()
    },[])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
      
  return (
  <>
 <Slider {...settings}>
    
 {alldata.length>0? alldata.map((ele,index)=><div key={index} className='col-md-3 py-5 '>
    <img src={ele.image} className={style.customimg} alt="" />
    <p className='text-center py-2'>{ele.name}</p>
 </div>):<Loading></Loading>
 
  }
    </Slider>
  </>
  )
}

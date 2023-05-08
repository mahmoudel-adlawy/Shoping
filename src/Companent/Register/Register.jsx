import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Register() {
  const [err,seterr]= useState('');
  const navigate = useNavigate()

  const sheme = Yup.object({
    name: Yup.string().required("name is req").min(3, 'min is 3').max(5, 'max is 5'),
    email: Yup.string().required('email is req').email('not valid'),
    password: Yup.string().required('pass is req').matches(/^[A-Z][a-z]{3,10}@[0-9]{2,5}$/),
    rePassword: Yup.string().required('repass is req').oneOf([Yup.ref('password')], 'not inditical'),
    phone: Yup.string().required('phone is req').matches(/^(02)?(01)[0-25][0-9]{8}$/, 'not valid number'),

  })

  async function sumbitRegister(values) {
    try {

      const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup
  ` , values)
      console.log(data)


      if (data.message === 'success') {
        console.log('log');
        navigate('/log')
        seterr('')

      }



    } catch (error) {
      seterr(error.response.data.message);

      console.log(error.response.data.message);
    }
  }

  let formik = useFormik({
    initialValues: {

      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""

    },
    validationSchema: sheme
    ,
    onSubmit: sumbitRegister

  })
  return (
    <div className='container'>

      <form className='my-5 ' onSubmit={formik.handleSubmit}>

        <label htmlFor="name">Name : </label>
        <input type="text" placeholder='Name' name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className="form-control my-2" />
        {formik.errors.name && formik.touched.name ? <p className='alert alert-danger'>{formik.errors.name}</p> : ''}


        <label htmlFor="email">email : </label>
        <input type="text" placeholder='email' onBlur={formik.handleBlur} name='email' onChange={formik.handleChange} value={formik.values.email} className='form-control my-2' />
        {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}
        {err? <p className='alert alert-danger'>{err}</p> : ''}

        <label htmlFor="pass">pass : </label>
        <input type="password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} placeholder='pass' className='form-control my-2' />
        {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}


        <label htmlFor="pass">pass : </label>
        <input type="password" name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} placeholder='pass' className='form-control my-2' />
        {formik.errors.rePassword && formik.touched.rePassword ? <p className='alert alert-danger'>{formik.errors.rePassword}</p> : ''}



        <label htmlFor="phone">phone : </label>
        <input type="phone" name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} placeholder='phone' className='form-control my-2' />
        {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger'>{formik.errors.phone}</p> : ''}

        <button type='submit' className='btn btn-success my-3'>Register</button>
      </form>
    </div>
  )
}

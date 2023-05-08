import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function login({ saveUser }) {
  const [err, seterr] = useState("");

  const navigate = useNavigate();

  const shema = Yup.object({
    email: Yup.string().required("email is req").email("not valid"),
    password: Yup.string()
      .required("pass is req")
      .matches(/^[A-Z][a-z]{3,10}@[0-9]{2,5}$/),
  });

  async function sumbmitlogin(values) {
    try {
      const { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/auth/signin
  `,
        values
      );
      
      if (data.message === "success") {
       localStorage.setItem("userToken" , data.token) 
       saveUser()
      navigate("/cart");
      seterr("");

      }
    } catch (error) {
      seterr(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: shema,
    onSubmit: sumbmitlogin,
  });
  return (
    <div className="container">

    <form className="my-5" onSubmit={formik.handleSubmit}>
      <label htmlFor="email">email : </label>
      <input
        type="text"
        onBlur={formik.handleBlur}
        placeholder="email"
        value={formik.values.email}
        name="email"
        onChange={formik.handleChange}
        className="form-control my-2"
      />
      {formik.errors.email ? (
        <p className="alert alert-danger">{formik.errors.email}</p>
      ) : (
        ""
      )}
      {err ? <p className="alert alert-danger">{err}</p> : ""}

      <label htmlFor="pass">pass : </label>
      <input
        type="password"
        onBlur={formik.handleBlur}
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="pass"
        className="form-control my-2"
      />
      {formik.errors.password ? (
        <p className="alert alert-danger">{formik.errors.password}</p>
      ) : (
        ""
      )}

      <button type="submit" className="btn btn-success my-3">
        login
      </button>
    </form>
    </div>

  );
}

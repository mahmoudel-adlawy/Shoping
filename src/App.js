import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Companent/Layout.jsx';
import Home from './Companent/Home/Home.jsx';
import Product from './Companent/Product/Product.jsx';
import Cart from './Companent/Cart/Cart.jsx';
import Register from './Companent/Register/Register';
import Login from './Companent/Login/Login';
import Detalies from './Companent/Prodectdet/Detalies';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';
import Protected from './Companent/Protected';
import { ConterContextprov } from './Context/CartStore';
import  { Toaster } from 'react-hot-toast';


function App() {

  const [user, setuser] = useState()

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUser()
    }
  }, [])


  function saveUser() {
    let Token = localStorage.getItem("userToken")
    let Decode = jwtDecode(Token)
    console.log(Decode);
    setuser(Decode)
  }

  const routes = createHashRouter([{
    path: '', element: <Layout user={user} setuser={setuser}></Layout>, children: [
      { index: true, element: <Home></Home> },
      { path: 'product', element: <Product></Product> },
      { path: '/:id', element: <Detalies></Detalies> },
      { path: 'product/:id', element: <Detalies></Detalies> },
      { path: 'cart', element: <Protected> <Cart></Cart></Protected> },
      { path: 'reg', element: <Register></Register> },
      { path: 'log', element: <Login saveUser={saveUser}></Login> },
    ]
  }])
  return <>
    <ConterContextprov>
      <Toaster></Toaster>
      <RouterProvider router={routes}></RouterProvider>
    </ConterContextprov>
  </>

    ;
}

export default App;

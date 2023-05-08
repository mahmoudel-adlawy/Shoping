import React from 'react'
import Header from '../Header/Header.jsx'
import Categores from '../Categores/Categores.jsx'
import Feacher from '../Fectherprod/Feacher.jsx'

export default function Home() {
  return (<>
  <Header></Header>
  <div className='container'>
  <Categores></Categores>
  <Feacher></Feacher>


  </div>
  </>
  )
}

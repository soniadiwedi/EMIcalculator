import React from 'react'

import { Register } from './Register'
import { Login } from './Login'
import { Profile } from './Profile'
import { Emi } from './Emi'
import { Route, Routes } from 'react-router-dom'
import { Private } from './Private'
export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Private><Profile/></Private>}/>
        <Route path='/emi' element={<Emi/>}/>
    </Routes>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './landingpage/home/Home'
import Footer from './landingpage/Footer'
import Navbar from './landingpage/Navbar'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Register from './landingpage/Register'
import Dashboard from './landingpage/mainpage/Dashboard'
import Admin from './landingpage/admin'
import AdminRoute from './routes/AdminRoute'
import Voting from './landingpage/mainpage/Voting'
import Login from './landingpage/Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element = {<Home/>}></Route>
    <Route path='/Register' element = {<Register/>}></Route> 
    <Route path='/Login' element = {<Login/>}></Route>
    <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/voting" element={<Voting />} />
    <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />


  </Routes>
  <Footer/>
  </BrowserRouter>
)

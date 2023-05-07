import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App'
import SignUp from "../src/components/SignUp"
import Login from "../src/components/Login"
import Todos from "../src/components/Todos"
import Profile from "../src/components/Profile"
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/MyTodos" element={<Todos/>}/>
      <Route path="/MyProfile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  </>,
)

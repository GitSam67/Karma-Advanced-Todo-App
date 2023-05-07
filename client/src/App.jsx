import { React } from 'react'
import './index.css'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Features from "./components/Features"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {

  return (
    <>
    <Navbar/>
    <Home/>
    <Features/>
    <Contact/>
    <Footer/> 
    </>
  )
}

export default App

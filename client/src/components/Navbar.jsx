import { React, useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";

export default function Navbar() {

  let dropRef = useRef();
  let [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [userData, setUserData] = useState({});
  const [loginState, setLoginState] = useState(false);
  const [imagePath, setImagePath] = useState("");
  
  
  const displayUser = async () => {
     try { 
      let token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/userprofile/`+token, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        if(res.status === 200) {
          const data = await res.json();
          setUserData(data);
          setLoginState(true);
          setImagePath(import.meta.env.VITE_IMG_PATH+data.img);
          console.log(loginState);
        }
      } 
      catch (err) {
          console.log(err);
      }
  }

  useEffect(()=>{
      displayUser();
  },[]);

  
  useEffect(()=>{

    const close = (e) => {
        if(!dropRef.current.contains(e.target))
            setDrop(false);
    }

 document.addEventListener('mousedown', close); 
 return () => document.removeEventListener('mousedown', close);

});

  return (
    <header id="starter" className="relative z-10 bg-white border-t-2 border-gray-700 rounded-md shadow-xl w-full sticky top-0 left-0">
      <nav className="container md:flex items-center flex-row w-full py-3 md:pl-10 pl-5">
        <div className='w-1/4 font-bold text-3xl cursor-pointer flex items-center'>
          <a className="flex flex-row items-center" href="#starter">
            <img src="/assets/logo.jpeg" className="mainlogo h-10 w-10 rounded-full mr-3" alt="logo" />
            <span className="text-blue-800 font-sans">Karma</span>
          </a>
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-9 top-4 cursor-pointer md:hidden'>
          <i className={open ? 'fa fa-close text-black' : 'fa-solid fa-bars text-black'}></i>
        </div>

        <div className="w-3/4 flex flex-row items-center ml-44">
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 transition-all duration-500 ease-in ${open ? 'top-14 bg-white' : 'top-[-490px]'}`}>
        <li className='ml-10 text-xl md:my-0 my-7'>
        <a href="#" className={`transition delay-40 text-black font-bold font-poppins tracking-wider text-xl border-b-2 border-transparent hover:text-indigo-700 hover:border-indigo-700 duration-200`}>
          Home
        </a>
        </li>
        <li className='ml-10 text-xl md:my-0 my-7'>
        <a href="#features" className={`transition delay-40 text-black font-bold font-poppins tracking-wider text-xl text-black border-b-2 border-transparent hover:text-indigo-700 hover:border-indigo-700 duration-200`}>
          Features
        </a>
        </li>
        <li className='ml-10 text-xl md:my-0 my-7'>
        <a href="#contact" className={`transition delay-40 text-black font-bold font-poppins tracking-wider text-xl text-black border-b-2 border-transparent hover:text-indigo-700 hover:border-indigo-700 duration-200`}>
          Contact Us
        </a>
        </li>
      <div className="ml-3 absolute md:right-14 flex flex-row">
        { loginState ?
        <div className="w-fit h-fit flex flex-row items-center justify-end">
            <div onClick={()=>setDrop(!drop)} ref={dropRef} className="flex flex-row items-center justify-center mx-2 cursor-pointer">
                <button className="relative rounded-full w-fit h-fit object-cover mx-1">
                    { userData.img == "userImage" ? <img src="/assets/profile2.jpg" className="w-10 h-10 rounded-full" alt="userimg" /> : <img src={imagePath} className="w-10 h-10 rounded-full" alt="userimg" /> }
                    {drop && <Dropdown />}
                </button>
                <i className="fa fa-caret-down"></i>
            </div>
            <div className="font-title font-bold text-xl border-b-2 border-gray-100 cursor-default">{userData.username}</div>
        </div> 
        :
        <div className="w-fit h-fit md:ml-0 ml-6 bg-blue-700 rounded-lg p-2 px-3 hover:bg-blue-600">
          <a href="/SignUp" className={`transition delay-40 font-bold font-sans text-xl text-white border-b-2 border-transparent duration-200`}>
            Sign Up
          </a>
        </div>
        }
      </div>
      </ul>
      </div>
    </nav>
  </header >
)
}
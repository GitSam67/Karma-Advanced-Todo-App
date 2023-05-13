import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Dropdown() {

  const Navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include"
      });

      console.log(res);

      if (res.status === 200) {
        Navigate("/");
        window.location.reload(false);
      }
      else {
        alert("Logout action failed..!! Try again");
      }
    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <div className='drop z-50 absolute w-40 h-fit px-3 pb-3 bg-white rounded-lg text-left'>
        <div className='font-title text-lg px-2 rounded-lg font-sans font-bold my-2 py-2 hover:bg-blue-500 hover:text-white'><NavLink to="/">Home</NavLink></div>
        <div className='font-title text-lg px-2 rounded-lg font-sans font-bold my-2 py-2 hover:bg-blue-500 hover:text-white'><NavLink to="/MyProfile">My Profile</NavLink></div>
        <div className='font-title text-lg px-2 rounded-lg font-sans font-bold my-2 py-2 hover:bg-blue-500 hover:text-white'><NavLink to="/MyTodos">My Todos</NavLink></div><hr />
        <div onClick={logout} className='font-title text-xl px-2 rounded-lg font-sans font-bold my-2 py-2 hover:bg-blue-500 hover:text-white'>Logout<i className='fas fa-sign-out mx-2 text-md text-gray-500'></i></div>
      </div>
    </>
  )
}

export default Dropdown
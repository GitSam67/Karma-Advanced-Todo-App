import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'

export default function Home() {

  const [loginState, setLoginState] = useState(false);

  const displayUser = async () => {
    try {
      let token = localStorage.getItem('token');
      if (token) {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/userprofile/` + token, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const data = await res.json();
        if (res.status === 200) {
          setLoginState(true);
          console.log(loginState);
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    displayUser();
  }, []);

  return (
    <section id="home" className="md:bg-gradient-to-r bg-gradient-to-b from-white via-indigo-100 to-indigo-600 rounded-md">
      <div className="container mx-auto flex px-5 md:px-10 py-20 md:flex-row flex-col align-items-center">

        <div className="md:w-1/2 lg:flex-grow w-full md:mb-0 flex flex-col justify-content-left">
          <h1 className="title-font text-red-600 text-4xl md:text-5xl mt-10 mb-5 font-black font-mono">
            Organizing your tasks <br />
            <span className=""> was never easy before..!! </span>
            <br className="hidden lg:inline-block" />
          </h1>
          <p className="title-font font-sans text-fuchsia-900 text-2xl md:text-3xl tracking-wide mb-5 leading-relaxedc">
            Start managing your todos with our systematic & powerful task manager
          </p>
          {loginState ?
            <div className="title-font font-sans font-bold text-xl bg-pink-500 shadow-lg h-fit w-fit p-3 rounded-md cursor-pointer text-white my-5 p-2 flex flex-row items-center justify-center hover:bg-pink-600">
              <NavLink to="/MyTodos"> +Add Tasks </NavLink>
            </div>
            :
            <div className="title-font font-sans font-bold text-lg bg-green-600 shadow-lg h-12 w-28 rounded-md cursor-pointer text-white my-5 p-2 flex flex-row items-center justify-center hover:bg-green-500">
              <a href="/Login"> Sign In <i className="fa fa-arrow-right m-1"></i></a>
            </div>
          }
          <p className="mb-20 leading-relaxed">
          </p>
        </div>

        <div className="md:w-1/2 w-full flex items-center justify-center object-cover rounded-lg pb-3 object-cover">
          <img className="rounded-lg h-96 shadow-2xl" src="/assets/home1.jpg" alt="home" />
        </div>

      </div>
    </section>
  );
}

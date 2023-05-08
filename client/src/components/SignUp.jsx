import React, { useState } from "react";
import Modal from "./SignUpModal";
import {NavLink, useNavigate} from "react-router-dom";

export default function SignUp() {
    const Navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [passType, setPassType] = useState("password");
    const [cpassType, setCpassType] = useState("password");
    const [dateType, setDateType] = useState("text");
    const [openModal, setOpenModal] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const Register = async (e) => {
        e.preventDefault();

    try {

        if (password != cpassword) {
            alert("Passwords don't match..Please Try again..!!");
        }
        else {
            setSpinner(true);

            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, name, email, phone, dob, city, password, cpassword
                })
            });

            if (res.status === 422) {
                setSpinner(false);
                alert(`User with email id: '${email}' already exists..!! Try again with another email id`);
            }
            
            else if (res.status === 404 || !res) {
                setSpinner(false);
                alert("Registration Unsuccessfull..Please try again..!!"); 
            }

            else {

                setOpenModal(true);

                // Sending Registration Email to user ...
                const emailResponse = await fetch("/sendEmail", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name, email
                    })
                });
                    setUsername("");
                    setName("");
                    setEmail("");
                    setPhone("");
                    setDob("");
                    setCity("");
                    setPassword("");
                    setCpassword("");
            }
        }
    }
    catch(err) {
        console.log(err);
    }
};

    const showPass = (e) => {
        e.preventDefault();
        
        if(passType=="password"){
            setPassType("text");
       }
       else{
            setPassType("password");
       }
    }

    const showCpass = (e) => {
        e.preventDefault();
        
        if(cpassType=="password"){
            setCpassType("text");
       }
       else{
            setCpassType("password");
       }
    }

    const dateFormat = (e) => {
        e.preventDefault();

        if(dateType=="text")
            setDateType("date");
        else    
            setDateType("text");
    }

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;

    return (
    <>
        { openModal && <Modal closeModal={setOpenModal} closeSpinner={setSpinner} Navigate={Navigate}/> }

        <section id="signUp" className="bg-blue-100 pb-20">
            <div className='md:flex items-center justify-start py-4 md:px-10 px-7 w-full top-0 left-0 font-bold text-2xl cursor-pointer font-[Poppins]'>
                <NavLink className="flex flex-row items-center" to="/">
                    <img src="/assets/logo.jpeg" className="mainlogo md:h-10 md:w-10 h-7 h-7 rounded-full mx-2" alt="logo" />
                    <span className="text-blue-700 md:text-3xl text-2xl font-sans">Karma</span>
                </NavLink>
            </div>
            <div className="container bg-white rounded-lg px-5 pt-4 my-1 shadow-2xl md:w-full w-5/6 mx-auto flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="md:text-4xl text-3xl font-medium title-font text-indigo-600">
                        Sign Up
                    </h1>
                </div>
                <div className="rounded-lg flex flex-row w-full pb-10 pt-3">
                    <div className="md:w-1/2 w-full flex flex-col md:pb-8 md:pt-5 mt-8 md:mt-0 md:px-10 md:mx-10 mx-0 md:ml-20 justify-center">
                        <form onSubmit={Register} className="w-full" method="POST">
                            <div className="relative mb-5 w-5/6">
                                <i class="fas fa-md fa-user absolute mt-3 ml-3 text-indigo-600" />
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter a username"
                                    required
                                    className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                            </div>
                            <div className="relative mb-5">
                                <i class="fas fa-md fa-user absolute mt-3 ml-3 text-indigo-600" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Type your Name"
                                    required
                                    className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className="relative mb-5">
                                <i class="fas fa-md fa-envelope absolute mt-3 ml-3 text-indigo-600" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Type your Email"
                                    required
                                    className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="relative mb-5">
                                <i class="fas fa-md fa-phone absolute mt-3 ml-3 text-indigo-600" />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    pattern="[0-9]{10}"
                                    required
                                    className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                            </div>
                            <div className="relative mb-5">
                                <i class="fas fa-md fa-calendar absolute mt-3 ml-3 text-indigo-600" />
                                <input
                                    type={dateType}
                                    id="dob"
                                    name="dob"
                                    placeholder="Pick your date of birth"
                                    max={maxDate}
                                    required
                                    onFocus={dateFormat}
                                    className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => setDob(e.target.value)}
                                    value={dob}
                                />
                            </div>
                            <div className="relative mb-5">
                                <i class="fas fa-md fa-city absolute mt-3 ml-3 text-indigo-600" />
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Enter your City"
                                    required
                                    className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                />
                            </div>
                            <div className="relative mb-5">
                                <i class="fa-solid fa-key absolute mt-3 ml-3 text-indigo-600" />
                                <input
                                    type={passType}
                                    id="password"
                                    name="password"
                                    placeholder="Enter strong password"
                                    minLength={8}
                                    required
                                    className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                {passType=="password" ? 
                                    <i class="fa-solid fa-eye-slash absolute top-3 right-5 text-gray-500 cursor-pointer"
                                        onClick={showPass}/> :
                                    <i class="fa-solid fa-eye absolute top-3 right-5 text-gray-500 cursor-pointer"
                                        onClick={showPass}/> }
                            </div>
                            <div className="relative mb-5">
                                <i class="fa-solid fa-key absolute mt-3 ml-3 text-indigo-600" />
                                <input
                                    type={cpassType}
                                    id="cpassword"
                                    name="cpassword"
                                    placeholder="Confirm password"
                                    minLength={8}
                                    required
                                    className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => setCpassword(e.target.value)}
                                    value={cpassword}
                                />
                                {cpassType=="password" ? 
                                    <i class="fa-solid fa-eye-slash absolute top-3 right-5 text-gray-500 cursor-pointer"
                                        onClick={showCpass}/> :
                                    <i class="fa-solid fa-eye absolute top-3 right-5 text-gray-500 cursor-pointer"
                                        onClick={showCpass}/> }
                            </div>
                        { !spinner ? 
                            <button
                                type="submit"
                                className="md:w-40 md:h-12 w-40 h-10 text-white flex items-center justify-center bg-green-600 border-0 py-2 px-6 mt-5 focus:outline-none hover:bg-green-700 rounded md:text-xl text-lg">
                                <span className="font-semibold">Register</span>
                                <i class="fas fa-sm fa-paper-plane md:text-lg text-md mt-1 ml-2" />
                            </button>
                            : <div className="md:w-40 md:h-12 w-40 h-10 text-white flex items-center justify-center bg-green-500 border-0 py-2 px-6 mt-5 focus:outline-none rounded md:text-xl text-lg">
                                <div className="spinner rounded-full w-6 h-6 bg-transparent border-t-2 border-white font-bold"></div>
                            </div>
                        }
                            <p className="md:text-lg text-md my-5">Already have an account? <span className="underline text-indigo-500 cursor-pointer hover:text-indigo-700"> <a href="/Login"> Login </a></span></p>
                        </form>
                    </div>

                    <div className="md:w-1/2 w-full md:flex hidden items-center justify-center rounded-lg pb-3 object-cover">
                        <img class="rounded-lg" src="/assets/login2.jpg" alt="contact" />
                    </div>

                </div>
            </div>
        </section>
        
        </>
    );
}

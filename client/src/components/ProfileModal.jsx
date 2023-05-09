import { React, useState, useEffect } from 'react';

function ProfileModal({ closeModal, userData, userId }) {

    const [username, setUsername] = useState(userData.username);
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.phone);
    const [dob, setDob] = useState(userData.dob);
    const [city, setCity] = useState(userData.city);

    const close = (e) => {
        e.preventDefault();
        closeModal(false);
    }

    const reset = (e) => {
        e.preventDefault();
        setUsername("");
        setName("");
        setEmail("");
        setPhone("");
        setDob("");
        setCity("");
    }

    const editProfile = async () => {

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/userprofile`, {
            method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, name, email, phone, dob, city, userId
                })
        })

        closeModal(false);
        window.location.reload(false);
    }

    var d = new Date();
    console.log(d);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    if(month < 10) 
    month  = '0' + month.toString();
    if(day < 10) 
    day  = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    console.log(maxDate);


    return (
        <div className="Modal bg-gray-600 bg-opacity-70 z-30 w-full py-5 fixed flex justify-center">
            <div className="ModalContainer relative md:w-1/2 w-full md:mx-0 mx-5 rounded-md shadow-2xl p-5 pb-24 bg-white flex flex-col">
                <div className="flex flex-col items-center pl-10">
                    <div className='w-full relative font-semibold bold text-3xl'>
                    <button id="close" onClick={close} className='px-3 pb-1 absolute rounded-lg right-2 hover:bg-gray-200'>x</button>
                    </div>
                        <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2">Username</h1>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                autoComplete="off"
                                required
                                className="md:w-1/3 w-1/2 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e)=>setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                         <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2">Full Name</h1>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                autoComplete="off"
                                required
                                className="md:w-1/2 w-2/3 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e)=>setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        
                        <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2">Email</h1>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your e-mail"
                                autoComplete="off"
                                required
                                className="w-5/6 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e)=>setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2">Phone</h1>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your contact number"
                                autoComplete="off"
                                required
                                className="md:w-5/6 w-2/3 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e)=>setPhone(e.target.value)}
                                value={phone}
                            />
                        </div>

                        <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2">DOB</h1>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                autoComplete="off"
                                max={maxDate}
                                required
                                className="md:w-1/3 w-1/2 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e)=>setDob(e.target.value)}
                                value={dob}
                            />
                        </div>

                        <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2">City</h1>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Enter your city"
                                autoComplete="off"
                                required
                                className="md:w-5/6 w-2/3 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e)=>setCity(e.target.value)}
                                value={city}
                            />
                        </div>
                       
                        <div id="resetTodo" className="w-full relative mt-12">
                            <button onClick={reset} className="bg-gray-600 p-1 px-4 py-2 font-bold md:text-xl text-lg absolute left-2 rounded-md text-white hover:bg-gray-500">Clear</button>
                        </div>

                        <div id="editProfile" className="w-full relative">
                            <button onClick={editProfile} className="bg-green-500 p-1 px-2 py-2 font-bold md:text-xl text-lg absolute right-7 rounded-md text-white hover:bg-green-600">Edit Profile</button>
                        </div> 
                </div>
            </div>
        </div>

    )
}

export default ProfileModal;
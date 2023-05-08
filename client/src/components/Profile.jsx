import React, { useState, useEffect, useRef } from "react";
import Tooltip from '@mui/material/Tooltip';
import ProfileModal from "./ProfileModal";
import ImgModal from "./ImgModal";
import RemovePicModal from "./RemovePicModal";
import Dropdown from "./Dropdown";
import { NavLink, useNavigate } from "react-router-dom";

export default function Profile() {
    const Navigate = useNavigate();
    const dropRef = useRef();
    const [profileModal, setProfileModal] = useState(false);
    const [imgBtn, setImgBtn] = useState(false);
    const [drop, setDrop] = useState(false);
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState({});
    const [pending, setPending] = useState(0);
    const [ratio, setRatio] = useState(0);
    const [image, setImage] = useState("");
    const [removePicBtn, setRemovePicBtn] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [imageBlob, setImageBlob] = useState("");

    const displayProfile = async () => {
        try {
            const res = await fetch("/userprofile", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (res.status == 200) {
                const data = await res.json();

                console.log(data);
                setUserId(data._id);
                setUserData(data);
                setImagePath(import.meta.env.VITE_IMG_PATH+data.img);

                const response = await fetch("/count/" + data._id, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const count = await response.json();
                console.log(count);

                setPending(count);
                setRatio(Math.round(data.completedTasks / data.totalTasks * 100));

            }
            else {
                Navigate("/Login");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        displayProfile();
    }, []);

    useEffect(() => {

        const close = (e) => {
            if (!dropRef.current.contains(e.target))
                setDrop(false);
        }

        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);

    });

    const editProfile = (e) => {
        e.preventDefault();
        setProfileModal(true);
    }

    const removePic = (e) => {
        e.preventDefault();
        setRemovePicBtn(true);
    }

    const redirect = () => {
        Navigate("/");
    }

    const handleChange = (e) => {
        e.preventDefault();
        
        setImageBlob(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);

        setImgBtn(true);
        // }
    }

    return (
        <>
            {profileModal && <ProfileModal closeModal={setProfileModal} userData={userData} setUserData={setUserData} userId={userId} />}

            {imgBtn && <ImgModal closeModal={setImgBtn} image={image} setImage={setImage} imageBlob={imageBlob} userId={userId} />}

            {removePicBtn && <RemovePicModal closeModal={setRemovePicBtn} image={imagePath} userId={userId} />}

            <section id="profile" className="bg-blue-100 pb-20">
                <nav className="relative z-10 bg-white border-t-2 border-gray-700 rounded-md shadow-xl sticky top-0 left-0 md:flex flex-row items-center w-full py-3 md:px-6 pl-3">
                    <div className="w-full flex items-center">
                    <div className='md:w-1/3 w-1/2 font-bold text-3xl cursor-pointer flex items-center text-left'>
                        <NavLink className="flex flex-row items-center" to="/">
                            <img src="/assets/logo.jpeg" className="mainlogo h-10 w-10 rounded-full mr-3" alt="logo" />
                            <span className="text-blue-800 font-sans">Karma</span>
                        </NavLink>
                    </div>

                    <div className="md:w-1/3 flex flex-row text-xl font-bold justify-center items-center py-2 md:flex hidden">
                        {userData.name}'s Profile
                    </div>

                    <div className="md:w-1/3 w-1/2 flex flex-row justify-end">
                        <div className="w-fit h-fit flex flex-row items-center justify-end">
                            <div onClick={() => setDrop(!drop)} ref={dropRef} className="flex flex-row items-center justify-center mx-2 cursor-pointer">
                                <button className="relative rounded-full w-fit h-fit object-cover mx-1">
                                    {userData.img == "userImage" ? <img src="/assets/profile2.jpg" className="w-10 h-10 rounded-full" alt="userimg" /> : <img src={imagePath} className="w-10 h-10 rounded-full" alt="userimg" />}
                                    {drop && <Dropdown />}
                                </button>
                                <i className="fa fa-caret-down"></i>
                            </div>
                            <div className="font-title font-bold text-xl mr-5 border-b-2 border-gray-100 cursor-default">{userData.username}</div>
                        </div>
                    </div>
                    </div>
                </nav>
                <div className="container bg-white rounded-lg px-5 pt-5 my-5 shadow-2xl mx-auto flex flex-col items-center justify-center">
                    <div className="relative w-full py-10 flex md:flex-row flex-col items-center">
                        <Tooltip className="transition delay-40 ease-in duration-400 text-black" title="Edit Profile" arrow>
                            <button onClick={editProfile} className="absolute text-lg font-bold text-black top-0 right-14"><i class="fas fa-edit text-2xl" /></button>
                        </Tooltip>
                        <Tooltip className="transition delay-40 ease-in duration-400" title="Close Profile" arrow>
                            <button onClick={redirect} className="absolute text-lg font-bold text-black top-0 right-1"><i class="fas fa-close text-3xl" /></button>
                        </Tooltip>
                        <div className="md:w-2/3 w-full flex flex-row items-center justify-start md:pl-5 pb-10 border-b-2 border-blue-500 rounded-lg md:mb-0 mb-10">
                            <div className="w-fit flex flex-col items-center justify-center md:mx-5 md:px-2">
                                <Tooltip placement="top" className="transition delay-40 ease-in duration-400 bg-white text-black" title={userData.img == "userImage" ? "" : "Click to remove"} arrow>
                                    <div onClick={removePic} className="max-w-xs max-h-xs rounded-full mb-5 object-cover flex flex-row items-center">
                                        {userData.img == "userImage" ? <img src="/assets/profile3.jpg" className="md:w-64 md:h-64 w-52 h-52 border-2 border-gray-200 shadow-xl rounded-full" alt="userimg" /> : <img src={imagePath} className="md:w-64 md:h-64 w-52 h-52 border-2 border-gray-200 shadow-xl rounded-full" alt="userimg" />}
                                    </div>
                                </Tooltip>
                                <Tooltip className="transition delay-40 ease-in duration-400 bg-white text-black" title="Choose image" arrow>
                                <div className="flex flex-row mx-auto">
                                    <label htmlFor="file" className="w-fit h-fit sm:text-lg text-md font-mono font-bold p-2 text-white rounded-md bg-gray-500 hover:bg-gray-600 cursor-pointer">
                                        Edit Pic
                                        <input type="file" id="file" name="image" onChange={handleChange} accept="image/*" hidden />
                                    </label>
                                </div>
                                </Tooltip>
                            </div>
                            <div className="text-center">
                                <h1 className="text-2xl md:text-3xl mb-5 underline text-left font-medium title-font text-blue-700 md:ml-2 ml-7">
                                    {userData.username}
                                </h1>
                                <h1 className="text-3xl md:text-4xl font-medium title-font">
                                    {userData.name}
                                </h1>
                            </div>
                        </div>
                        <div className="md:w-1/3 w-full flex flex-col items-center justify-center">
                            <div id="pie" className="rounded-full flex items-center justify-center bg-indigo-400 shadow-lg text-center md:text-6xl text-5xl text-black font-bold">
                                <div id="content" className="w-fit h-fit rounded-full">
                                    <p> {ratio ? ratio : 0}% </p>
                                    <p className="text-4xl mt-2"> Efficiency </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center md:mt-0 mt-10">
                        <div className="title-font font-semibold md:text-3xl text-2xl text-center py-2 md:mb-10 mb-5 border-b-2 rounded-lg border-blue-500">
                            <h1 className="text-black font-mono">Formal Details</h1>
                        </div>
                        <div className="rounded-xl border-l-4  border-r-4  border-blue-500 py-10 mb-10 grid md:grid-cols-3 grid-cols-1 gap-10 place-items-center w-full">
                            <div className="w-full text-left md:pl-20 pl-10 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ✤ </span> Total Tasks added: <span className="text-black text-2xl mx-1">{userData.totalTasks}</span></p>
                            </div>
                            <div className="w-full text-left md:pl-16 pl-10 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ✤ </span> All Finished tasks: <span className="text-black text-2xl mx-1">{userData.completedTasks}</span></p>
                            </div>
                            <div className="w-full text-left md:pl-16 pl-10 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ✤ </span> All Missed tasks: <span className="text-black text-2xl mx-1">{userData.missedTasks}</span></p>
                            </div>
                            <div className="w-full text-left md:pl-20 pl-10 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ✤ </span> Pending tasks: <span className="text-black text-2xl mx-1">{pending}</span></p>
                            </div>
                            <div className="w-full text-left md:pl-16 pl-10 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ✤ </span> Performance ratio: <span className="text-black text-2xl mx-1">{ratio ? ratio : 0}%</span></p>
                            </div>
                        </div>

                        <div className="title-font font-semibold md:text-3xl text-2xl text-center py-2 md:mb-10 mb-5 border-b-2 rounded-lg border-blue-500">
                            <h1 className="text-black font-mono">Personal Details</h1>
                        </div>
                        <div className="rounded-lg border-l-4 border-r-4 border-blue-500 py-10 grid md:grid-cols-2 grid-cols-1 gap-10 place-items-center w-full mb-20">
                            <div className="w-full text-left md:pl-24 px-2 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ◈ </span> Email: <span className="text-black md:text-2xl text-xl mx-1">{userData.email}</span></p>
                            </div>
                            <div className="w-full text-left md:pl-16 px-2 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ◈ </span> Phone: <span className="text-black text-2xl mx-1">+91-{userData.phone}</span></p>
                            </div>
                            <div className="w-full text-left md:pl-24 px-2 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ◈ </span> DOB: <span className="text-black text-2xl mx-1">{userData.dob}</span></p>
                            </div>
                            <div className="w-full text-left md:pl-16 px-2 my-2">
                                <p className="title-font font-semibold tracking-wide text-blue-700 md:text-2xl text-xl"><span className="mx-1"> ◈ </span> City: <span className="text-black text-2xl mx-1">{userData.city}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-center text-blue-500 text-xl font-bold mb-5 md:hidden">
                        ------------X------------X------------
                    </div>
                </div>
            </section>

        </>
    );
}

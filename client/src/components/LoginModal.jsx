import {React, useRef, useEffect } from 'react';

function LoginModal({closeModal, closeSpinner, Navigate}) {

    const divRef = useRef();

    useEffect(()=>{
        closeSpinner(false);
    },[]);

    useEffect(() => {

        const close = (e) => {
            if (!divRef.current.contains(e.target)) {
                closeModal(false);
                Navigate("/");
            }
        }

        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);

    });

    const func = (e) => {
        e.preventDefault();
        closeModal(false);
        Navigate("/");
    }

  return (
    <div className="Modal bg-gray-600 bg-opacity-70 z-10 w-screen h-screen fixed flex justify-center pt-5">
        <div ref={divRef} className="ModalContainer relative md:w-1/3 md:h-32 h-28 pt-5 rounded-md shadow-2xl p-5 bg-white flex flex-col">
            <div className="title-font font-bold flex justify-center items-center">
               <p className="md:text-2xl text-xl">User Logged in successfully..!!</p> 
            </div>
            <div className="bg-blue-600 p-1 px-2 w-14 h-fit font-bold md:text-lg text-md absolute bottom-3 right-5 rounded-md flex text-white justify-center items-center">
                <button className="ok" onClick={func}>OK</button>
            </div>
        </div>
    </div>

  )
}

export default LoginModal;
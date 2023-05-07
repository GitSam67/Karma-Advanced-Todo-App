import React, { useEffect } from 'react';

function SignUpModal({closeModal, closeSpinner, Navigate}) {

    useEffect(()=>{
        closeSpinner(false);
    },[])

    const func = (e) => {
        e.preventDefault();
        closeModal(false);
        Navigate("/Login");
    }

  return (
    <div className="Modal bg-gray-600 bg-opacity-70 z-10 w-screen h-screen fixed flex justify-center pt-5">
        <div className="ModalContainer relative md:w-1/3 md:h-40 h-36 pt-5 rounded-md shadow-2xl p-5 bg-white flex flex-col">
            <div className="flex flex-col justify-center items-center">
               <p className="title-font font-bold md:text-2xl text-xl">User Registration successfull..!!</p> 
               <p className="md:text-lg text-md mt-3">Now Login with your credentials</p> 
            </div>
            <div className="bg-blue-600 p-1 px-8 w-12 h-fit font-bold md:text-lg text-md absolute bottom-3 right-5 rounded-md flex text-white justify-center items-center">
                <button className="ok" onClick={func}>OK</button>
            </div>
        </div>
    </div>

  )
}

export default SignUpModal;
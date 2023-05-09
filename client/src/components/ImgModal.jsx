import React from 'react';

function ImgModal({ closeModal, image, imageBlob, userId}) {
    
    const close = (e) => {
        e.preventDefault();
        closeModal(false);
    }
    
    const upload = async (e) => {
        e.preventDefault();
        console.log(image);
        
        const formData = new FormData();
        formData.append("image", image, image.name);
        formData.append("userId", userId);

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/imgUpload`, {
            method: "PUT",
            body: formData
        });
        console.log(res);

        if(res.status===200) {
            closeModal(false);
            window.location.reload(false);
        }
    }

  return (
    <>
    <div className="Modal bg-gray-600 bg-opacity-70 z-30 w-screen h-full fixed flex justify-center items-center">
            <div className="ModalContainer relative md:w-1/2 w-5/6 md:px-0 px-4 rounded-md shadow-2xl py-5 pb-28 bg-white flex flex-col">
                <div className="flex flex-col items-center">
                    <div className='w-fit absolute font-semibold text-3xl cursor-pointer px-3 pt-1 pb-2 rounded-lg right-5 top-1 hover:bg-gray-200'>
                    <button onClick={close} className=''>x</button>
                    </div>

                    <div className='w-full mt-2 text-center title-font font-sans px-5'>
                        <p className='font-semibold mb-5 md:text-3xl text-2xl border-b-2 border-blue-200 rounded-lg text-blue-500'>Selected Image</p> 
                    </div>

                    <div className='max-w-sm max-h-60 object-cover mt-2'>
                        <img className='md:w-96 md:h-60 w-80 h-52 rounded-lg mx-auto' src={imageBlob} alt="image" /> 
                    </div>

                    <div id="subTodo" className="bg-green-500 p-1 px-2 py-2 w-fit h-fit font-bold md:text-xl text-lg absolute bottom-7 right-auto rounded-md flex text-white justify-center items-center hover:bg-green-600">
                        <button onClick={upload} className="">Upload image</button>
                    </div> 
                </div>
            </div>
        </div>

    </>
  )
}

export default ImgModal
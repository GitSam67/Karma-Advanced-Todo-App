import React from 'react'

function SubmitModal({ closeModal, todoData, todos, setTodos, todoId, setTodoId, userId}) {
    
    const close = (e) => {
        e.preventDefault();
        closeModal(false);
    }
    
    const submitTask = async (e) => {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/submitTask`, {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todoId, userId
            })
        });
        console.log(res);

        setTodos(
            todos.filter((todo)=>{
                return todo._id != todoId;                 
            }));
            
            setTodoId(null);
            closeModal(false);
    }

  return (
    <>
    <div className="Modal bg-gray-600 bg-opacity-70 z-20 w-screen h-full fixed flex justify-center items-center">
            <div className="ModalContainer relative md:w-1/2 w-full rounded-md shadow-2xl py-5 pb-28 md:mx-0 mx-2 bg-white flex flex-col">
                <div className="flex flex-col items-center">
                    <div className='w-fit absolute font-semibold text-3xl cursor-pointer px-3 pt-1 pb-2 rounded-lg right-5 top-1 hover:bg-gray-200'>
                    <button onClick={close} className=''>x</button>
                    </div>

                    <div className='w-full mt-2 text-center title-font font-sans md:px-5 px-2'>
                        <p className='font-semibold mb-5 md:text-3xl text-xl underline'>Task Submission</p> 
                        <p className='md:text-2xl text-lg mb-1 font-mono font-bold'>Task:<span className='text-green-600'>{todoData[0].title}</span> with Priority_Id:<span className='text-green-600'>#{todoData[0].pId}</span> </p>
                        <p className='font-semibold md:text-2xl text-lg'>will be marked as completed & your progress will be reflected into your profile.</p>
                    </div>

                    <div id="subTodo" className="bg-green-500 p-1 px-2 py-2 w-fit h-fit font-bold md:text-xl text-md absolute bottom-7 right-auto rounded-md flex text-white justify-center items-center hover:bg-green-600">
                        <button onClick={submitTask} className="">Mark as Completed</button>
                    </div> 
                </div>
            </div>
        </div>

    </>
  )
}

export default SubmitModal
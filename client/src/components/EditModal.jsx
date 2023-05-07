import { React, useEffect } from 'react';

function EditModal({ closeModal, todoData, todos, setTodos, todoId, setTodoId, pId, setPId, title, setTitle, desc, setDesc, date, setDate, time, setTime }) {

    useEffect(()=>{
        setPId(todoData[0].pId);
        setTitle(todoData[0].title);
        setDesc(todoData[0].desc);
        setDate(todoData[0].date);
        setTime(todoData[0].time);
    }, [])

    const close = (e) => {
        e.preventDefault();
        closeModal(false);
    }

    const reset = (e) => {
        e.preventDefault();
        setPId("");
        setTitle("");
        setDesc("");
        setDate("");
        setTime("");
    }

    const editTask = async (e) => {
        e.preventDefault();

        const res = await fetch("/todos", {
            method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pId, title, desc, date, time, todoId
                })
        });
            const data = await res.json();

        console.log(data);
            setTodos(
                todos.map((todo)=>{
                    if(todo._id == todoId) {
                       return { pId, title, desc, date, time }
                    }
                    return todo;                       
                }));
                
        setTodoId(null);
        window.location.reload(false);
        closeModal(false);
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
    var minDate = year + '-' + month + '-' + day;
    console.log(minDate);


    return (
        <div className="Modal bg-gray-600 bg-opacity-70 z-20 w-screen h-full fixed flex justify-center items-center">
            <div className="ModalContainer relative md:w-1/2 w-5/6 rounded-md shadow-2xl p-5 pb-28 bg-white flex flex-col">
                <div className="flex flex-col items-center md:pl-10 px-2">
                    <div className='w-full relative font-semibold bold text-3xl'>
                    <button id="close" onClick={close} className='px-3 pb-1 absolute rounded-lg right-2 hover:bg-gray-200'>x</button>
                    </div>
                        <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2">Priority Id</h1>
                            <input
                                type="number"
                                id="priorityid"
                                name="priorityid"
                                placeholder="Enter Task Priority Id"
                                autoComplete="off"
                                required
                                className="w-1/3 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e) => setPId(e.target.value)}
                                value={pId}
                            />
                        </div>
                         <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2" htmlFor="title">Title</h1>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter your task title"
                                autoComplete="off"
                                required
                                className="w-1/2 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                        
                        <div className='w-full py-2 my-1 flex flex-col'>
                            <h1 className="md:text-xl text-lg font-bold text-left my-2" htmlFor="desc">Description</h1>
                            <input
                                type="text"
                                id="desc"
                                name="desc"
                                placeholder="Describe your task"
                                autoComplete="off"
                                required
                                className="w-5/6 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                            />
                        </div>

                        <div className='w-full py-2 my-1 flex flex-row'>
                        <div className='w-1/2 flex flex-col'>
                        <h1 className="md:text-xl text-lg font-bold text-left my-2" htmlFor="date">Due Date</h1>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            min={minDate}
                            className="w-5/6 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}

                        />
                        </div>
                        <div className='w-1/2 flex flex-col'>
                        <h1 className="md:text-xl text-lg font-bold text-left my-2" htmlFor="time">Due Time</h1>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            required
                            className="w-5/6 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                        />
                        </div>
                    </div>
                       
                        <div id="resetTodo" className="bg-gray-600 p-1 px-4 py-2 w-fit h-fit font-bold md:text-xl text-lg absolute bottom-7 left-10 rounded-md flex text-white justify-center items-center hover:bg-gray-500">
                            <button onClick={reset} className="">Clear</button>
                        </div>

                        <div id="editTodo" className="bg-green-500 p-1 px-4 py-2 w-fit h-fit font-bold md:text-xl text-lg absolute bottom-7 right-10 rounded-md flex text-white justify-center items-center">
                            <button onClick={editTask} className="">Edit Task</button>
                        </div> 
                </div>
            </div>
        </div>

    )
}

export default EditModal;
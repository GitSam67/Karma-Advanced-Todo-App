import { React, useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

function PostModal({ closeModal, setTodos, pId, setPId, title, setTitle, desc, setDesc, date, setDate, time, setTime, userId }) {

    useEffect(() => {
        setPId("");
        setTitle("");
        setDesc("");
        setDate("");
        setTime("");
    },[])

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

    const postTask = async (e) => {
        e.preventDefault();

        if (date < minDate) {
            alert("Please select valid date format..!!");
        }
        else {

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/todos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pId, title, desc, date, time, userId
                })
            });

            if(res.status === 200) {

                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/todos/`+ userId, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const data = await response.json();
                setTodos(data);
           
                closeModal(false);
            }
        }
    }


    var d = new Date();
    console.log(d);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var minDate = year + '-' + month + '-' + day;
    console.log(minDate);

    return (
        <div className="Modal bg-gray-600 bg-opacity-70 z-20 w-screen h-full fixed flex justify-center items-center">
            <div className="ModalContainer relative md:w-1/2 w-5/6 rounded-md shadow-2xl p-5 pb-28 bg-white flex flex-col">
                <div className="flex flex-col items-center md:pl-10 px-5">
                    <div className='w-full relative font-semibold bold text-3xl'>
                        <button id="close" onClick={close} className='px-3 pb-1 absolute rounded-lg md:right-2 right-0 top-0 hover:bg-gray-200'>x</button>
                    </div>
                    <div className='w-full py-2 my-1 flex flex-col'>
                        <h1 className="md:text-xl text-lg font-bold text-left my-2">Task Prority Id</h1>
                        <Tooltip id="tooltip" className="transition delay-40 ease-in duration-400 text-black" title="1 -> Highest task priority, 2 -> lower than 1, & so on, we will filter tasks Rankwise.." arrow>
                            <input
                                type="number"
                                id="priorityid"
                                name="priorityid"
                                placeholder="Enter the task priority id"
                                autoFocus
                                required
                                className="md:w-64 w-2/3 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 hover:mb-5 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e) => setPId(e.target.value)}
                                value={pId}
                            />
                        </Tooltip>
                    </div>
                    <div className='w-full py-2 my-1 flex flex-col'>
                        <h1 className="md:text-xl text-lg font-bold text-left my-2" htmlFor="title">Title</h1>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter your task title"
                            required
                            className="md:w-1/2 w-2/3 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                            className="w-5/6 border-2 items-center border-gray-500 rounded-lg focus:border-black text-base outline-none py-1 md:px-3 px-2 leading-8 transition-colors duration-200 ease-in-out"
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

                    <div id="addTodo" className="bg-pink-500 p-1 px-2 py-2 w-fit h-fit font-bold md:text-xl text-lg absolute bottom-7 right-10 rounded-md flex text-white justify-center items-center">
                        <button onClick={postTask} className="">Add Task</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostModal;
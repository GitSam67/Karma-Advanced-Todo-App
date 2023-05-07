import { React, useEffect, useRef } from 'react';

function NotifyModal({ closeModal, todos }) {

    let subRef = useRef();
    let year, month, daydate, t, count=0;
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    useEffect(() => {

        const close = (e) => {
            if (!subRef.current.contains(e.target)) {
                closeModal(false);
            }
        }

        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);

    });

    const close = (e) => {
        e.preventDefault();
        closeModal(false);
    }

    return (
        <div className="Modal bg-gray-600 bg-opacity-70 z-30 w-full h-full py-5 fixed flex justify-center pt-5 px-2">
            <div ref={subRef} className="ModalContainer relative h-fit pb-20 md:w-2/3 rounded-md shadow-2xl p-5 bg-white flex flex-col">
                <div className="flex flex-col items-center justify-center">
                    <div className='w-full relative font-semibold bold text-3xl'>
                        <button id="close" onClick={close} className='px-3 pb-1 absolute rounded-lg right-2 hover:bg-gray-200'>x</button>
                    </div>
                    <div className='title-font font-bold font-mono text-blue-600 md:text-3xl text-xl rounded-lg border-b-2 border-blue-400 py-2 text-center'>
                        Upcoming shortly...
                    </div>
                    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-5 mt-10 px-3 grid-cols-1 place-items-center">
                        {todos.map((todo) => {
                            if (Math.round((new Date(todo.date) - new Date()) / (1000 * 60 * 60 * 24)) < 7) {
                                count++;
                                let d = new Date(todo.date);
                                year = d.getFullYear();
                                daydate = d.getDate();
                                let m = d.getMonth();
                                month = months[m];
                                t = todo.time;
                                if (t < '12' && parseInt(t) != 0) {
                                    t = t + ' AM';
                                    console.log(t);
                                }
                                else if (parseInt(t) == 0) {
                                    var t2 = t.slice(3);
                                    t = '12:' + t2 + ' AM';
                                    console.log(t);
                                }
                                else {
                                    if (parseInt(t) == 12) {
                                        t = t.toString() + ' PM';
                                        console.log(t);
                                    }
                                    else {
                                        var t1 = t.slice(3);
                                        t = (parseInt(t) - 12);
                                        if (t < 10) {
                                            t = '0' + t.toString() + ':' + t1 + ' PM';
                                        } else {
                                            t = t.toString() + ':' + t1 + ' PM';
                                        }
                                        console.log(t);
                                    }
                                }
                                return (
                                    <div className="relative md:w-96 w-80 h-fit rounded-lg pb-5 pt-2 mb-5 text-left px-10 text-white bg-indigo-600 shadow-2xl" key={todo._id}>
                                        <div className="absolute w-fit h-fit rounded-lg p-1 px-3 md:text-2xl text-xl title-font border-b-2 border-r-2 border-white top-0 left-1 cursor-pointer font-bold">#{todo.pId}</div>
                                        <div className="w-full mb-5 px-10 text-center">
                                            <p className="md:text-2xl text-xl font-bold"><span className="border-b-2 border-gray-300 rounded-lg">* {todo.title} *</span></p>
                                        </div>
                                        <p className="w-fit mb-3 md:text-xl text-lg font-sans">{todo.desc}</p>
                                        <div className="w-full border-t-2 border-white flex flex-row items-center mt-5">
                                            <p className="w-fit my-2 md:text-xl text-lg font-bold mr-5"><span className="md:text-xl text-lg font-sans text-red-300"> Due by: </span> {month} {daydate}, {year} <br /><span>{t}</span></p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }
                    </div>
                    {!count && <p className='w-full title-font font-bold md:text-3xl text-2xl text-center text-green-500 tracking-wide'> No Upcoming tasks by this week.<p className='my-2'>So Chill...!! 😃</p> </p>}
                </div>
            </div>
        </div>

    )
}

export default NotifyModal
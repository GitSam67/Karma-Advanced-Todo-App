import { React, useState, useEffect, useRef } from "react";
import Tooltip from '@mui/material/Tooltip';
import Dropdown from "./Dropdown";
import { NavLink, useNavigate } from "react-router-dom";
import PostModal from "./PostModal";
import EditModal from "./EditModal";
import DelModal from "./DeleteModal"
import SubmitModal from "./SubmitModal";
import NotifyModal from "./NotifyModal";

export default function Todos() {

    const Navigate = useNavigate();
    const [postBtn, setPostBtn] = useState(false);
    const [editBtn, setEditBtn] = useState(false);
    const [delBtn, setDelBtn] = useState(false);
    const [submitBtn, setSubmitBtn] = useState(false);
    const [todoId, setTodoId] = useState(null);
    const [priorityId, setPriorityId] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState([]);
    const [drop, setDrop] = useState(false);
    const [subBtn, setSubBtn] = useState(false);
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState("");
    const [notifyBtn, setNotifyBtn] = useState(false);
    const [imagePath, setImagePath] = useState("");
    let count = 0;

    const displayTask = async () => {
        try {
            let token = localStorage.getItem('token');
            if (token) {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/userprofile/` + token, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                if (res.status === 200) {
                    const userdata = await res.json();

                    console.log(userdata);
                    setUserData(userdata);
                    setUserId(userdata._id);
                    setImagePath(import.meta.env.VITE_IMG_PATH + userdata.img);

                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/todos/` + userdata._id, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    });
                    const data = await response.json();
                    console.log(data);
                    setTodos(data);
                }
                else {
                    Navigate("/Login");
                }
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
        displayTask();
    }, []);

    const deleteDueTask = async (dueTaskId) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/deleteDueTodo`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dueTaskId, userId
            })
        });
    }

    useEffect(() => {
        const missedTask = todos.filter((todo) => {
            return new Date(todo.date) <= new Date() && (new Date(todo.date).toDateString() < new Date().toDateString() ? true : todo.time <= new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" }));
        })
        console.log(missedTask);
        if (missedTask) {
            missedTask.map((task) => {
                deleteDueTask(task._id);
            })
        }
    });

    let dropRef = useRef();
    let subRef = useRef();
    let year, month, daydate, t;
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {

        const close = (e) => {
            if (!dropRef.current.contains(e.target)) {
                setDrop(false);
            }
            if (!subRef.current.contains(e.target)) {
                setSubBtn(true);
            }
        }

        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);

    });

    const notify = (e) => {
        e.preventDefault();
        setNotifyBtn(true);
    }

    const postTodo = (e) => {
        e.preventDefault();
        setPostBtn(true);
    }

    const editTodo = (id) => {
        const result = todos.filter((todo) => {
            return todo._id == id;
        })
        setEdit(result);
        setTodoId(id);
        setEditBtn(true);
    }

    const deleteTodo = (id) => {
        const result = todos.filter((todo) => {
            return todo._id == id;
        })
        setEdit(result);
        setTodoId(id);
        setDelBtn(true);
    }

    const submitTodo = (id) => {
        const result = todos.filter((todo) => {
            return todo._id == id;
        })
        setEdit(result);
        setTodoId(id);
        setSubmitBtn(true);
    }

    todos.sort((a, b) => {
        if (a.pId == b.pId) {
            if (a.date == b.date) {
                return a.time.localeCompare(b.time);
            }
            else {
                return new Date(a.date) - new Date(b.date);
            }
        }
        else {
            return a.pId - b.pId;
        }
    })
    console.log([todos]);

    return (
        <>

            {postBtn && <PostModal closeModal={setPostBtn} todos={todos} setTodos={setTodos} pId={priorityId} setPId={setPriorityId} title={title} desc={desc} date={date} setTitle={setTitle} setDesc={setDesc} setDate={setDate} time={time} setTime={setTime} userId={userData._id} />}

            {editBtn && <EditModal closeModal={setEditBtn} todoData={edit} todos={todos} todoId={todoId} pId={priorityId} setPId={setPriorityId} setTodos={setTodos} setTodoId={setTodoId} title={title} desc={desc} date={date} time={time} setTitle={setTitle} setDesc={setDesc} setDate={setDate} setTime={setTime} />}

            {delBtn && <DelModal closeModal={setDelBtn} todoData={edit} todoId={todoId} setTodoId={setTodoId} todos={todos} setTodos={setTodos} userId={userData._id} />}

            {submitBtn && <SubmitModal closeModal={setSubmitBtn} todoData={edit} todoId={todoId} setTodoId={setTodoId} todos={todos} setTodos={setTodos} userId={userData._id} />}

            {notifyBtn && <NotifyModal closeModal={setNotifyBtn} todos={todos} setTodos={setTodos} />}


            <div id="todos" className="relative w-full pb-10 bg-indigo-100">
                <nav className="relative z-10 bg-white border-t-2 border-gray-700 rounded-md shadow-xl sticky top-0 left-0 md:flex flex-row items-center w-full py-3 md:px-6 pl-3">
                    <div className="w-full flex items-center">
                        <div className='md:w-1/3 w-1/2 font-bold text-3xl cursor-pointer flex items-center text-left'>
                            <NavLink className="flex flex-row items-center" to="/">
                                <img src="/assets/logo.jpeg" className="mainlogo h-10 w-10 rounded-full mr-3" alt="logo" />
                                <span className="text-blue-800 font-sans">Karma</span>
                            </NavLink>
                        </div>

                        <div className="md:w-1/3 flex flex-row text-xl font-bold justify-center items-center py-2 md:flex hidden">
                            {userData.name}'s Todo-List
                        </div>

                        <div className="md:w-1/3 w-1/2 flex flex-row justify-end">
                            <div className="w-fit h-fit flex flex-row items-center justify-end">
                                <div onClick={() => setDrop(!drop)} ref={dropRef} className="flex flex-row items-center justify-center mx-2 cursor-pointer">
                                    <button className="relative rounded-full w-fit h-fit object-cover mx-1">
                                        {userData.img == "userImage" ? <img src="/assets/profile2.jpg" className="w-10 h-10 rounded-full" alt="userimg" /> : <img src={imagePath} className="w-10 h-10 rounded-full" alt="userimg" />}
                                        {drop && <Dropdown />}
                                    </button>
                                    <div className="font-title font-bold text-xl mx-1 border-b-2 border-gray-100 cursor-default">{userData.username}</div>
                                    <i className="fa fa-caret-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div id="add" className="z-10 fixed md:bottom-10 md:right-8 bottom-8 right-5 rounded-full shadow-xl bg-white">
                    <Tooltip className="transition delay-40 ease-in duration-400 text-black" title="Add Task" arrow>
                        <button onClick={postTodo} className="text-4xl text-indigo-800 font-bold p-3 pt-0 m-0"> + </button>
                    </Tooltip>
                </div>
                <div id="notify" onClick={notify} className="z-10 fixed md:bottom-10 md:left-5 bottom-8 left-4 rounded-full shadow-xl bg-white">
                    <Tooltip className="transition delay-40 ease-in duration-400 text-black" title="Upcoming..." arrow>
                        <button className="text-3xl text-indigo-800 font-black px-3 py-2 m-0"><i className="fas fa-list-check"></i></button>
                    </Tooltip>

                    {todos.map((todo) => {
                        if (Math.round((new Date(todo.date) - new Date()) / (1000 * 60 * 60 * 24)) < 7) {
                            count++;
                        }
                    })}
                    {count > 0
                        ? <h2 className="absolute fixed bottom-10 left-10 text-sm text-white font-bold bg-red-500 px-1 rounded-full">{count}</h2>
                        : <h2 className="absolute fixed bottom-10 left-10 text-sm text-white font-bold bg-green-500 px-1 rounded-full">{count}</h2>}
                </div>

                <div ref={subRef} className="grid md:grid-cols-3 grid-cols-1 gap-5 m-10 px-3 grid-cols-1 place-items-center">
                    {todos.map((todo) => {
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
                            <div onClick={() => setSubBtn(!subBtn)} className="relative md:w-96 w-80 h-fit rounded-lg pb-5 pt-2 mb-5 text-left px-10 text-white bg-indigo-600 shadow-2xl" key={todo._id}>
                                <div className="absolute w-fit h-fit rounded-lg p-1 px-3 md:text-2xl text-xl title-font border-b-2 border-r-2 border-white top-0 left-1 cursor-pointer font-bold">#{todo.pId}</div>
                                {!subBtn &&
                                    <Tooltip className="transition delay-40 ease-in duration-400 text-black" title="Mark as done" arrow>
                                        <div id="show" onClick={() => submitTodo(todo._id)} className="absolute w-7 h-7 p-1 px-3 rounded-full border-2 border-white text-lg top-2 right-2 bg-gray-100 cursor-pointer font-bold text-center"><span className="absolute right-0 top-0 invisible">✔</span></div>
                                    </Tooltip>
                                }
                                <div className="w-full mb-5 md:px-10 px-5 text-center">
                                    <p className="md:text-2xl text-xl font-bold"><span className="border-b-2 border-gray-300 rounded-lg">* {todo.title} *</span></p>
                                </div>
                                <p className="w-fit mb-3 md:text-xl text-lg font-sans">{todo.desc}</p>
                                <div className="w-full border-t-2 border-white flex flex-row items-center mt-5">
                                    <p className="w-fit my-2 md:text-xl text-lg font-bold mr-5"><span className="md:text-xl text-lg font-sans text-red-300"> Due by: </span> {month} {daydate}, {year} <br /><span>{t}</span></p>
                                    <Tooltip className="transition delay-40 ease-in duration-400 text-black" title="Edit Task" arrow>
                                        <button onClick={() => editTodo(todo._id)} className="absolute md:text-lg text-md font-bold text-white bottom-7 right-20"><i class="fas fa-edit" /></button>
                                    </Tooltip>
                                    <Tooltip className="transition delay-40 ease-in duration-400" title="Delete Task" arrow>
                                        <button onClick={() => deleteTodo(todo._id)} className="absolute md:text-lg text-md font-bold text-white bottom-7 right-10"><i class="fa fa-trash" /></button>
                                    </Tooltip>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>

            </div>
        </>
    )
}
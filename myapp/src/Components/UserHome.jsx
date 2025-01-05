import React, { useEffect, useState } from 'react';
import HomeChatList from './HomeChatList';
import { Link, useNavigate } from 'react-router-dom';
import api from '../API/RenderAPI';

function UserHome() {
    const senderId = localStorage.getItem('userId');
    const [mainUser, setUser] = useState([]); // Initialize as an empty array
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    const logoutHandler = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    useEffect(() => {
        if (!senderId) {
            alert('Login first');
            navigate('/login');
            return; // Exit early if no senderId
        }

        const fetchData = async () => {
            try {
                const res = await api.get(`/username/${senderId}`);
                console.log('API Response:', res.data);
                if (Array.isArray(res.data)) {
                    setUser(res.data);
                } else if (res.data.users) {
                    setUser(res.data.users);
                } else {
                    setUser([]); // Fallback to an empty array
                }
            } catch (err) {
                console.error('Failed to fetch sender:', err);
                // Optionally show an error message to the user
            }
        };

        fetchData();
    }, [senderId, navigate]);

    useEffect(() => {
        if (!senderId) {
            alert('Login first');
            navigate('/login');
        }
    }, [senderId, navigate]);

    const inputHandler = (e) => {
        const currentValue = e.target.value;
        setInput(currentValue);

        if (currentValue) {
            const filterItem = mainUser.filter((item) =>
                item.name.toLowerCase().includes(currentValue.toLowerCase())
            );
            setFilter(filterItem);
        } else {
            setFilter([]);
        }
    };

    return (
        <div>
            {menuVisible ? (
                <div className="bg-slate-600 h-screen w-full flex items-center justify-center relative">
                    <svg
                        className="swap-on fill-current absolute top-5 left-5 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 512 512"
                        onClick={() => setMenuVisible(false)}
                    >
                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                    <ul className="text-white text-center space-y-6 text-3xl font-sans font-black">
                        <li className="hover:border hover:border-green-500 rounded-lg py-2 px-4">
                            <Link to="/profile"> Profile </Link>
                        </li>
                        <li className="hover:border hover:border-green-500 rounded-lg py-2 px-4">New Group</li>
                        <li className="hover:border hover:border-green-500 rounded-lg py-2 px-4">Settings</li>
                        <li
                            className="hover:border hover:border-green-500 rounded-lg py-2 px-4 cursor-pointer"
                            onClick={logoutHandler}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mt-5 px-5">
                        <h1 className="text-3xl font-bold font-sans">Chats</h1>
                        <div
                            className="btn btn-circle swap swap-rotate cursor-pointer"
                            onClick={() => setMenuVisible(true)}
                            aria-label="Open menu"
                        >
                            <svg
                                className="swap-off fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512"
                            >
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-control px-5 mt-5">
                        <input
                            type="text"
                            placeholder="Search"
                            value={input}
                            onChange={inputHandler}
                            className="input input-bordered w-[23rem] mt-4 border-green-500 md:w-auto"
                        />
                        {filter.length > 0 && (
                            <ul className="bg-slate-600 text-white shadow-md rounded-md mt-2 p-2 w-full max-h-40 overflow-y-auto">
                                {filter.map((item, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <HomeChatList />
                </>
            )}
        </div>
    );
}

export default UserHome;

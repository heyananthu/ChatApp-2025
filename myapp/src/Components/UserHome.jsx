import React, { useState } from 'react';
import HomeChatList from './HomeChatList';
import { motion } from "motion/react"
function UserHome() {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <div>
            {menuVisible ? (
                <div className="bg-slate-600 h-screen w-full flex items-center justify-center relative" >
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
                        <motion.li className="hover:border hover:border-green-500 py-2 px-4" animate={{
                            scale: 2,
                            transition: { duration: 2 }
                        }}>Profile</motion.li>
                        <li className="hover:border hover:border-green-500 py-2 px-4">New Group</li>
                        <li className="hover:border hover:border-green-500 py-2 px-4">Settings</li>
                        <li className="hover:border hover:border-green-500 py-2 px-4">Logout</li>
                    </ul>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mt-5 px-5">
                        <h1 className="text-3xl font-bold font-sans">Chats</h1>
                        <div
                            className="btn btn-circle swap swap-rotate cursor-pointer"
                            onClick={() => setMenuVisible(true)}
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
                            className="input input-bordered w-[23rem] mt-4 border-green-500 md:w-auto"
                        />
                    </div>
                    <HomeChatList />
                </>
            )}
        </div>
    );
}

export default UserHome;

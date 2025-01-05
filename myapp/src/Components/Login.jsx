import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chaticon from '../assets/chaticon.jpeg';
import api from '../API/RenderAPI';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = () => {
        if (!email || !password) {
            toast.warn('Please fill in all fields', {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                theme: 'colored',
                transition: Bounce,
            });
            return;
        }

        api.post('/userlogin', { email, password })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Login Successful!', {
                        position: 'bottom-center',
                        autoClose: 3000,
                        theme: 'colored',
                        transition: Bounce,
                    });
                    localStorage.setItem('userId', res.data.userid);
                    setTimeout(() => navigate('/home'), 3000);
                } else if (res.status === 404) {
                    toast.warn('Invalid credentials, please try again.', {
                        position: 'bottom-center',
                        autoClose: 5000,
                        theme: 'colored',
                        transition: Bounce,
                    });
                }
            })
            .catch((err) => {
                console.error('Login error:', err);
                toast.error('An error occurred. Please try again.', {
                    position: 'bottom-center',
                    autoClose: 5000,
                    theme: 'colored',
                    transition: Bounce,
                });
            });
    };

    return (
        <div>
            <div className="w-[18rem] mt-[11rem] ml-16 md:mt-[4rem] md:ml-[33rem]">
                <img src={chaticon} alt="Chat Icon" className="w-[10rem] ml-14" />
                <label className="input input-bordered flex items-center gap-2 mt-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="password"
                        className="grow"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button
                    className="btn btn-outline w-32 btn-success ml-20 mt-10"
                    onClick={loginHandler}
                >
                    Login
                </button>
                <p className="mt-14">
                    Don't have an account?{' '}
                    <span
                        className="text-green-400 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        Register
                    </span>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;

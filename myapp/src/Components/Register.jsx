import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import axios from 'axios'
import api from '../API/RenderAPI'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState(null)

    const handleAvatarClick = () => {
        document.getElementById('profilePicInput').click()
    }

    const regHandler = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('profilePic', profilePic)


        if (!name || !email || !password) {
            toast.warn('Please fill in all fields', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }
        if (!profilePic) {
            toast.warn('Please upload a profile picture', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        api.post("/userregistration", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            if (res.status === 200) {
                toast.success('Registration Success', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else if (res.status === 400) {
                alert("User Already Exist")
            } else {
                alert("Registration Failed")
            }
        }).catch((err) => {
            console.error(err)
            alert("Error in registration")
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfilePic(file)
        }
    }


    return (
        <div>
            <div className='w-[18rem] mt-[10rem] md:mt-[5rem] md:ml-[33rem] ml-16'>
                <div className="avatar ml-24 cursor-pointer" onClick={handleAvatarClick}>
                    <div className="ring-success ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                        {profilePic ? (
                            <img src={URL.createObjectURL(profilePic)} alt="Profile Preview" />
                        ) : (
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxvAAVEqz-nu3Q-h7vTdE1hgVBHiGdRdHEUaYA8Bb4_nb734HfeoaUC8igCydUqX3JuM&usqp=CAU" alt="Default Avatar" />
                        )}
                    </div>
                </div>
                {/* Hidden File Input */}
                <input
                    id="profilePicInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <label className="input input-bordered flex items-center gap-2 mt-12">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Username" value={name} onChange={(e) => { setName(e.target.value) }} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </label>

                <label className="input input-bordered flex items-center gap-2 mt-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </label>


                <button className="btn btn-outline btn-accent ml-24 mt-8" onClick={regHandler}>Register</button>
                <p className='mt-12'>Already have accound ? <span className='text-green-400 cursor-pointer' onClick={() => { navigate('/login') }} >Login</span></p>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    )
}
export default Register

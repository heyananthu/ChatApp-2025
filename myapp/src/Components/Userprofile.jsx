import React, { useEffect, useState } from 'react'
import api from '../API/RenderAPI'
function Userprofile() {
    const user = localStorage.getItem("userId")
    const [userprofile, setUserProfile] = useState('')

    useEffect(() => {
        api.get(`/getsender/${user}`)
            .then((res) => setUserProfile(res.data))
            .catch((err) => console.error('Failed to fetch sender:', err));
    }, [user]);
    console.log(userprofile)


    return (
        <div>
            <div class="flex items-center h-screen w-full justify-center">
                <div class="max-w-xs">
                    <div class="bg-slate-700 shadow-xl rounded-lg py-3">
                        <div class="photo-wrapper p-2">
                            <img class="w-32 h-32 rounded-full mx-auto" src={`${api.defaults.baseURL}/uploads/${userprofile.profilePic}`} alt="John Doe" />
                        </div>
                        <div class="p-2">
                            <h3 class="text-center text-xl text-white font-medium leading-8">{userprofile.name}</h3>
                            <div class="text-center text-gray-400 text-xs font-semibold">
                                {/* <p>Web Developer</p> */}
                            </div>
                            <table class="text-xs my-3">
                                <tbody><tr>
                                    <td class="px-2 py-2 text-white font-black">Email :</td>
                                    <td class="px-2 py-2 text-white">{userprofile.email}</td>
                                </tr>
                                    {/* <tr>
                                        <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                        <td class="px-2 py-2">+977 9955221114</td>
                                    </tr>
                                    <tr>
                                        <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                        <td class="px-2 py-2">john@exmaple.com</td>
                                    </tr> */}
                                </tbody></table>

                            <div class="text-center my-3">
                                {/* <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a> */}
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Userprofile

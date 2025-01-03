import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../API/RenderAPI'
function HomeChatList() {
  const navigate = useNavigate()
  const [userlist, setUserList] = useState([])

  const senderId = localStorage.getItem("userId")

  useEffect(() => {
    api.get(`http://localhost:5000/userlist/${senderId}`)
      .then((res) => {
        setUserList(res.data)
      })
  }, [])
  const userHandler = (id) => {
    localStorage.setItem("otheruserid", id)
    navigate('/chat')

  }
  return (
    <div className=' ml-5 mt-12'>
      {
        userlist.map((obj) =>
          <div className="flex items-center gap-3 mt-11 cursor-pointer" key={obj._id} onClick={() => { userHandler(obj._id) }}>
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={`${api.defaults.baseURL}/uploads/${obj.profilePic || 'defaultProfilePic.jpg'}`} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{obj.name}</div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default HomeChatList

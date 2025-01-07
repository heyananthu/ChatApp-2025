import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/RenderAPI';
import Defaultimg from '../assets/default.jpg';

function HomeChatList() {
  const navigate = useNavigate();
  const [userlist, setUserList] = useState([]);
  const senderId = localStorage.getItem("userId");

  useEffect(() => {
    api.get(`/userlist/${senderId}`)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user list:", err);
      });
  }, [senderId]);

  const userHandler = (id) => {
    localStorage.setItem("otheruserid", id);
    navigate('/chat');
  };

  return (
    <div className='ml-5 mt-12 pb-6'>
      {userlist.map((obj) => {
        const imageUrl = obj.profilePic
          ? `${api.defaults.baseURL}/uploads/${obj.profilePic}`
          : Defaultimg;

        // Debugging: Log the image URL
        console.log("Image URL:", imageUrl);

        return (
          <div
            className="flex items-center gap-3 mt-11 cursor-pointer"
            key={obj._id}
            onClick={() => userHandler(obj._id)}
          >
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={imageUrl}
                  alt={`${obj.name}'s profile`}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = Defaultimg; // Fallback to default image
                  }}
                />
              </div>
            </div>
            <div className='flex'>
              <div className="font-bold sm:text-3xl">{obj.name}</div>
              {/* <div className='text-green-500 text-2xl ml-[10rem] '>
                <p>.</p>
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HomeChatList;

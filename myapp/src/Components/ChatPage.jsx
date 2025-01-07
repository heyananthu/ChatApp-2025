import React, { useEffect, useState, useRef } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { IoSendSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import api from '../API/RenderAPI';
import Defaultimg from '../assets/default.jpg';

function ChatPage() {
    const navigate = useNavigate();
    const otheruserid = localStorage.getItem('otheruserid') || '';
    const senderId = localStorage.getItem('userId') || '';
    const [otherUser, setOtherUser] = useState({});
    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const messageEndRef = useRef(null);

    // Fetch Other User's Details
    useEffect(() => {
        api.get(`/getotheruser/${otheruserid}`)
            .then((res) => setOtherUser(res.data))
            .catch((err) => console.error('Failed to fetch other user:', err));
    }, [otheruserid]);

    // Fetch Sender (Current User) Details
    useEffect(() => {
        api.get(`/getsender/${senderId}`)
            .then((res) => setUser(res.data))
            .catch((err) => console.error('Failed to fetch sender:', err));
    }, [senderId]);

    // Fetch Chat Messages
    const fetchMessages = async () => {
        try {
            const response = await api.post(`/getmessage/${senderId}/${otheruserid}`);
            setChatMessages(response.data);
        } catch (err) {
            console.error('Failed to fetch messages:', err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [senderId, otheruserid]);

    // Auto-scroll to the Latest Message
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // Handle Message Send
    const messageSendHandler = async () => {
        if (message.trim() === '') {
            alert('Message cannot be empty.');
            return;
        }

        try {
            const response = await api.post('/messages', {
                senderid: senderId,
                receiverid: otheruserid,
                message,
            });

            if (response.status === 200) {
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    { senderid: senderId, receiverid: otheruserid, message, time: new Date() },
                ]);
                setMessage('');
            } else {
                alert('Failed to send message.');
            }
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="shadow-lg shadow-slate-700">
                <div className="mt-2 ml-2 flex gap-4 p-2">
                    <FaArrowCircleLeft
                        size={20}
                        className="mt-3 cursor-pointer"
                        onClick={() => navigate('/home')}
                    />
                    <img
                        className="w-12 h-12 rounded-full"
                        src={`${api.defaults.baseURL}/uploads/${otherUser.profilePic || ''}`}
                        alt={otherUser.name || 'Receiver'}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Defaultimg;
                        }}
                    />
                    <h1 className="text-2xl mt-2 font-bold">{otherUser.name}</h1>
                </div>
            </nav>

            {/* Chat Messages */}
            <div className="chat-container py-8 overflow-y-auto h-[calc(100vh-120px)]">
                {chatMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${msg.senderid === senderId ? 'chat-end' : 'chat-start'} p-1`}
                    >
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={`${api.defaults.baseURL}/uploads/${msg.senderid === senderId
                                        ? user.profilePic || ''
                                        : otherUser.profilePic || ''
                                        }`}
                                    alt={msg.senderid === senderId ? 'Sender' : 'Receiver'}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = Defaultimg;
                                    }}
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            <time className="text-xs opacity-50">
                                {msg.time ? new Date(msg.time).toLocaleTimeString() : 'Just now'}
                            </time>
                        </div>
                        <div className="chat-bubble">{msg.message}</div>
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>

            {/* Input Box */}
            <div className="message-input fixed bottom-0 p-4 flex gap-2 shadow-lg w-full">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full p-3 rounded-xl border border-gray-300"
                />
                <IoSendSharp
                    size={35}
                    className="cursor-pointer text-green-500 mt-2"
                    onClick={messageSendHandler}
                />
            </div>
        </div>
    );
}

export default ChatPage;

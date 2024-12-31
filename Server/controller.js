const mongoose = require('mongoose')
const userSchema = require('./Schema/UserSchema')
const messageSchema = require('./Schema/ChatSchema')
const path = require('path');
const fs = require('fs');

// User Registration
const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const profilePic = req.file ? req.file.filename : null;

        const newUser = new userSchema({
            name,
            email,
            password,
            profilePic
        });

        await newUser.save();
        res.status(200).json({ message: "User Registered Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const findUser = await userSchema.findOne({ email, password })
        if (findUser) {
            res.status(200).json({ msg: "Login Success", userid: findUser._id })
        } else {
            res.status(404).json({ msg: "User not exist" })
        }
    } catch (err) {
        res.status(500).json({ msg: "Error in login" })
        console.log(err)
    }

}

const userList = async (req, res) => {
    try {
        const { senderId } = req.params;
        // console.log("Sender ID:", senderId);
        const viewUser = await userSchema.find({ _id: { $ne: senderId } });
        if (viewUser.length > 0) {
            res.status(200).json(viewUser);
        } else {
            res.status(404).json({ message: "No users found." });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


const otherUser = async (req, res) => {
    const { otheruserid } = req.params
    const findUser = await userSchema.findOne({ _id: otheruserid })

    if (findUser) {
        res.json(findUser)
    }

}
const getSender = async (req, res) => {
    const {  senderId } = req.params
    const findUser = await userSchema.findOne({ _id: senderId })
    if (findUser) {
        res.json(findUser)
    }

}

const messages = async (req, res) => {
    const { senderid, receiverid, message } = req.body;
    // console.log("controller message data :", senderid, receiverid, message)
    try {
        const messageData = { senderid, receiverid, message }
        const newMessages = await messageSchema.insertMany(messageData)
        if (newMessages) {
            res.status(200).json({ msg: "success" })
        } else {
            res.statsu(404)
        }
    } catch (err) {
        console.log(err)
    }
}

const getMessage = async (req, res) => {
    const { senderId, otheruserid } = req.params;
    try {
        const messages = await messageSchema.find({
            $or: [
                { senderid: senderId, receiverid: otheruserid },
                { senderid: otheruserid, receiverid: senderId }
            ]
        }).sort({ time: 1 });

        if (messages) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({ msg: "No messages found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error fetching messages" });
    }
};


module.exports = { addUser, userLogin, userList, otherUser, messages, getMessage ,getSender }
const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    senderid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    receiverid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now

    },
}, { timestamps: true, })

module.exports = mongoose.model("chat", chatSchema)
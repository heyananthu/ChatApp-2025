const mongoose = require("mongoose")
// mongoose.connect("mongodb://127.0.0.1/ChatApp")

mongoose.connect("mongodb+srv://heyananthu:heyananthu@cluster0.ncnpu.mongodb.net/Chat-App?retryWrites=true&w=majority&appName=Cluster0")


var db = mongoose.connection
db.on("error", console.error.bind("error"))
db.once("open", function () {
    console.log("connection successfull");

})
module.exports = db
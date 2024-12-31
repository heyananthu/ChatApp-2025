const express = require('express');
const router = express.Router();
const userController = require('./controller');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' folder exists
const uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });  // Create the folder if it doesn't exist
}

// File storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Use the defined upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Unique file name
    }
});

// File upload configuration
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpeg, .jpg, and .png files are allowed'));
        }
    }
});

// Routes
router.post('/userregistration', upload.single('profilePic'), userController.addUser);
router.post('/userlogin', userController.userLogin);
router.get('/userlist/:senderId', userController.userList)
router.get('/getotheruser/:otheruserid', userController.otherUser)
router.get('/getsender/:senderId', userController.getSender)

router.post('/messages', userController.messages)
router.post('/getMessage/:senderId/:otheruserid', userController.getMessage)



module.exports = router;

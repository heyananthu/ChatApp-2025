const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const route = require("./router");
const db = require("./dbconnection");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({
    origin: ['https://chatapp-2025-1-frondend.onrender.com', 'http://localhost:3000'],  // Allow your frontend URLs
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", route);

// Server setup
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

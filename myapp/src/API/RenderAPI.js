import axios from "axios";

// Check if the app is running in production or development
// const isProduction = window.location.hostname !== "localhost";

// Set baseURL dynamically based on environment
// const API = axios.create({
//   baseURL: isProduction
//     ? "https://chatapp-2025.onrender.com" // Production URL
//     : "http://localhost:5000", // Development URL
// });

const API = axios.create({ "https://chatapp-2025.onrender.com" });

export default API;

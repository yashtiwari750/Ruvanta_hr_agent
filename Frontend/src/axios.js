import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ruvanta-hr-agent.onrender.com', // Your backend base URL
  withCredentials: true, // Send cookies
});

export default API;

import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.PROD
        ? 'https://shores-electronics-backend.onrender.com'
        : 'http://localhost:5000',
});

API.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
        try {
            const { token } = JSON.parse(userInfo);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error parsing userInfo from localStorage:", error);
        }
    }

    return config;
});

export default API;
import axios from "axios";
import Cookies from 'js-cookie';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});



export const loginUser = (data: FormData) => api.post('/admin/login', data);
export const createStudent = (data : FormData) => api.post('/student/new', data);

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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            Cookies.remove('token');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export const loginAdmin = (data: {email : string, password : string}) => api.post('/admin/login', data);
export const getAllStudents = () => api.get('/student/all');
export const getStudent = (registrationNumber: string) => api.get(`/student/get/${registrationNumber}`);
export const createStudent = (data : FormData) => api.post('/student/new', data);

import axios, { AxiosInstance } from "axios";


const axiosDefault : AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    validateStatus: (status) => status >= 200 && status < 300,
});
export default axiosDefault;


/* Axios Interceptors Start */
axiosDefault.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (config.headers && token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => { Promise.reject(error); }
);

axiosDefault.interceptors.response.use(
    (response) => {
        return response;
    },
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('accessToken');
            window.location.href = "/login";
            return;
        }
        throw Error;
    }
)
/* Axios Interceptors End */
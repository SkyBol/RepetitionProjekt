import loginData from '../types/LoginData';
import axiosDefault from "./AxiosDefault";

export function getAccessToken() { return localStorage.getItem('accessToken'); }

export function isAuthorized() { return !!localStorage.getItem('accessToken'); }

export async function logout() { localStorage.removeItem('accessToken'); }

export async function register(data : loginData) {
    if (!data.password) { throw new Error('Password invalid'); }
    if (!data.username) { throw new Error('Name invalid'); }

    await axiosDefault.post('/register', { name : data.username, password : data.password })
        .then((res) => localStorage.setItem('accessToken', res.headers.token))
        .catch((err) => { throw new Error(err.response.data); })
}

export async function login(data : loginData) {
    if (!data.password) { throw new Error('Password invalid'); }
    if (!data.username) { throw new Error('Name invalid'); }

    await axiosDefault.post('/login', { name : data.username, password : data.password })
        .then((res) => {
            localStorage.setItem('accessToken', res.headers.token); 
            localStorage.setItem('username', data.username ? data.username : "");
        })
        .catch((err) => { throw err; })
}


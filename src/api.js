import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL_API
})

instance.interceptors.response.use((response) => {
    return response;
}), (error) => {
    let originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        localStorage.clear();
        return window.location.reload();
    }
}

export default instance;
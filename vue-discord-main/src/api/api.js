import axios from 'axios';
import router from '../router';

const Api = axios.create({
    baseURL: import.meta.env.VITE_DEFAULT_API_URL + 'api',
});

Api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response?.status === 401) router.push('login');
    return Promise.reject(error);
})

export default Api;
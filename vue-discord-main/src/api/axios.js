import axios from "axios";
import router from "../router";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_DEFAULT_API_URL + "api",
  withCredentials: true,
});

$axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) router.push("login");
    return Promise.reject(error);
  },
);

export default $axios;

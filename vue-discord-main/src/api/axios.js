import axios from "axios";
import router from "../router";
import { createDiscreteApi } from "naive-ui";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_DEFAULT_API_URL + "api",
  withCredentials: true,
});

const { message } = createDiscreteApi(["message"]);

$axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    message.error(error.request.response);

    if (error.response.status === 401) router.push("login");
    return Promise.reject(error);
  },
);

export default $axios;

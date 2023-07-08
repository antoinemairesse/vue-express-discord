import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io(import.meta.env.VITE_DEFAULT_API_URL);

export default socket;

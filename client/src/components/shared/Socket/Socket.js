import io from "socket.io-client";
let socket = io(process.env.NODE_ENV === 'development'?"http://localhost:5000/":"");
export default socket;

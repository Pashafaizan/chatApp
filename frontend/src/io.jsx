import io from "socket.io-client";
const conn_port = 'localhost:4047';

let socket;
export default socket = io(conn_port);
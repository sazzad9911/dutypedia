import { io } from "socket.io-client";
const URL = "http://185.211.6.223";
const socket = io(URL);
const getSocket = (id) => {
  socket.emit("join", id);
  return socket;
};
const getOnlineUsers = () => {
  socket.on("getUsers", (users) => {
    //console.log(users)
    return users;
  });
};

export { socket, getSocket, getOnlineUsers };

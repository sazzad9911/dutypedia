import { io } from "socket.io-client";
const URL = "https://duty.com.bd";
const socket = io(URL,{
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 989538344345623,
});
const getSocket = (id) => {
  //console.log(id)
  socket.emit("join", id);
  return socket;
};
const getOnlineUsers = async() => {
  socket.on("getUsers", (users) => {
    //console.log(users)
    return users;
  });
};

export { socket, getSocket, getOnlineUsers };

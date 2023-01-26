import { io } from "socket.io-client";
const URL = "https://dutybazar.com";
const socket = io(URL,{
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 989538344345623,
});
const getSocket = (id) => {
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
